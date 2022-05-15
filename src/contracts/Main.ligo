type nftId is nat;
type user_addr is address
type admin_addr is address
type agent_addr is address

type input_user_infos is 
  record [
    id: int;
    public_key: address;
  ]

type input_user_infos_validation is 
  record [
    id: int;
    validation: bool;
  ]

type input_agent_infos is 
  record [
    id: int;
    public_key: address;
    agency: string;
  ]

type user_infos is
  record [
    public_key: address;
    validation:bool; // 0 -> 1
  ]

type agent_infos is
  record [
    public_key: address;
    agency:string; 
  ]

type nft is record [
    owner : address;
    address_uri : string;
]


type user is map(int, user_infos);
type admin is map(address, bool);
type agent is map(int, agent_infos);
type nfts is map(nftId, nft);


type actionMint is record [
  nftToMintId : nftId;
  nftToMint : nft;
]

type actionTransfer is record [
  nftToTransfer : nftId;
  destination : address;
]


type action is
   CreateUser of input_user_infos
  | CreateAdmin of address
  | CreateAgent of input_agent_infos
  | ValidationFinancingPlan of input_user_infos_validation
  | Mint of actionMint
  | Transfer of actionTransfer

type storageType is
  record [
    mapping_user: user;
    mapping_admin: admin;
    mapping_agent: agent;
    main_admin: address;
    nfts: nfts;
  ]

type return is list (operation) * storageType

function isAdmin (const s : address) : bool is
	block {skip} with (sender = s)

function isAgent (const s : address) : bool is
	block {skip} with (sender = s)

function create_user(var store : storageType; var parameter: input_user_infos) : (list(operation) * storageType) is 
  block {
      const id : int = parameter.id;
      case store.mapping_user[id] of
        | Some (_bool) -> block {
          skip
        }
        | None -> block {
            const public_key : address= parameter.public_key;
            const validation : bool = False;
            const new_user_infos: user_infos = record [public_key = public_key; validation = validation;];
            store.mapping_user[id] := new_user_infos;
          skip
        }
        end
  }
  with ((nil: list(operation)) , store)

function create_admin(var store : storageType; var public_key: address) : (list(operation) * storageType) is 
 block {
      if(isAdmin(store.main_admin)) then
			block{
				const public_key : address = public_key;
            case store.mapping_admin[public_key] of
                | Some (_bool) -> block {
                    skip
                }
                | None -> block {
                    store.mapping_admin[public_key] := False;
                    skip
                }
                end
			}
		else failwith("You are not admin");
  }
  with ((nil: list(operation)) , store)

function create_agent(var store : storageType; var parameter: input_agent_infos) : (list(operation) * storageType) is 
  block {
      const id : int = parameter.id;
      case store.mapping_agent[id] of
        | Some (_bool) -> block {
          skip
        }
        | None -> block {
            const agency : string = parameter.agency;
            const public_key : address = parameter.public_key;
            const new_agent_infos: agent_infos = record [ public_key = public_key; agency = agency;];
            store.mapping_agent[id] := new_agent_infos;
          skip
        }
        end
  }
  with ((nil: list(operation)) , store)

function validation_financing_plan(var store : storageType; var parameter: input_user_infos_validation) : (list(operation) * storageType) is 
  block {
      const id : int = parameter.id;
      case store.mapping_user[id] of
        | Some (_bool) -> block {
            const id : int = parameter.id;
            const validation : bool = parameter.validation;
        
            const record_user : option(user_infos) = store.mapping_user[id];
            case record_user of
            | None -> block{
                skip
            }
            | Some(d) -> block { 
                const pub : address = d.public_key;
                const new_record_user: user_infos = record [ public_key = pub; validation = validation;];
                store.mapping_user[id] := new_record_user;
            }
            end;
            
          skip
        }
        | None -> block {
          skip
        }
        end
  }
  with ((nil: list(operation)) , store)

function mint(var action : actionMint ; var s : storageType) : (list(operation) * storageType) is
  begin
    case s.nfts[action.nftToMintId] of 
    | None -> s.nfts[action.nftToMintId] := action.nftToMint
    | Some(_x) -> skip // fail "I've seen that token id before."
    end
  end with ((nil: list(operation)) , s)

function transfer(var action : actionTransfer ; var s : storageType) : (list(operation) * storageType) is
  begin
    const record_nft : option(nft) = s.nfts[action.nftToTransfer];
    case record_nft of
    | None -> block{
        skip
    }
    | Some(d) -> block { 
        if action.destination = sender
            then skip // fail "What's the purpose?"
        else
        if d.owner = sender 
            then 
            block{
                const record_user : option(nft) = s.nfts[action.nftToTransfer];
                case record_user of
                | None -> block{
                    skip
                }
                | Some(d) -> block { 
                    const addr : string = d.address_uri;
                    const new_record_user: nft = record [ owner = action.destination; address_uri = addr;];
                    s.nfts[action.nftToTransfer] := new_record_user;
                }
            end;
            }
        else skip // fail "Token is not yours."
    }
    end;
  end with ((nil: list(operation)) , s)

function main (var p : action ; var s : storageType) :
  (list(operation) * storageType) is
  block { skip } with
  case p of
      CreateUser (n) -> create_user (s, n)
    | CreateAdmin (ur) -> create_admin (s, ur)
    | CreateAgent (fp) -> create_agent (s, fp)
    | ValidationFinancingPlan (vfp) -> validation_financing_plan (s, vfp)
    | Mint (mt) -> mint (mt, s)
    | Transfer (tx) -> transfer (tx, s)
   end
