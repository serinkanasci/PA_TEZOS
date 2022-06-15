type nftId is nat;
type user_addr is address;
type admin_addr is address;
type agent_addr is address;


type usable_fund is tez;

type validation is 
  record [
    active: bool;
    mensualities_months: int;
    mensualities_price: tez;
    contribution: tez;
    agency: string;
    nftId: nat;
  ]

type input_user_infos is 
  record [
    id: int;
    public_key: address;
  ]

type input_user_infos_validation is 
  record [
    id: int;
    validation: validation;
  ]

type input_agent_infos is 
  record [
    public_key: address;
    agency: string;
  ]

type user_infos is
  record [
    public_key: address;
    validation:validation; // 0 -> 1
  ]

type nft is record [
    owner : address;
    address_uri : string;
]

type agent_infos is record [
    agency : string;
    is_ban : bool;
]

type user is map(int, user_infos);
type admin is map(address, bool);
type agent is map(address, agent_infos);
type nfts is map(nftId, nft);
type balances is map(address, tez);


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
  | PayValidation of int
  | Withdraw of tez
  | Deposit
  | BanAdmin of address
  | BanAgent of address
  

type storageType is
  record [
    mapping_user: user;
    mapping_admin: admin;
    mapping_agent: agent;
    main_admin: address;
    nfts: nfts;
    balances:balances;
    usable_fund: tez;
  ]

type return is list (operation) * storageType

function isAdmin (const s : address) : bool is
	block {skip} with (Tezos.get_sender() = s)

function ban_admin(var store : storageType; var public_key: address) : (list(operation) * storageType) is 
  block {
        if(isAdmin(store.main_admin)) then
			block{
				const public_key : address = public_key;
                case store.mapping_admin[public_key] of [
                    | None -> block{
                        skip
                    }
                    | Some(_a) -> block { 
                        store.mapping_admin[public_key] := True;
                        skip
                    }
                ];
			}
		else failwith("You are not admin");
  }
  with ((nil: list(operation)) , store)


function ban_agent(var store : storageType; var public_key: address) : (list(operation) * storageType) is 
  block {
        if(isAdmin(store.main_admin)) then
			block{
				const public_key : address = public_key;
        const record_agent : option(agent_infos) = store.mapping_agent[public_key];
        case record_agent of [
        | None -> block{
            skip
        }
        | Some(d) -> block { 
            const is_ban : bool = True;
            const agency : string = d.agency;
            const new_record_agent: agent_infos = record [ agency = agency; is_ban = is_ban;];
            store.mapping_agent[public_key] := new_record_agent;
        }
        ];
			}
		else failwith("You are not admin");
  }
  with ((nil: list(operation)) , store)

function create_user(var store : storageType; var parameter: input_user_infos) : (list(operation) * storageType) is 
  block {
      const id : int = parameter.id;
      case store.mapping_user[id] of [
        | Some (_bool) -> block {
          skip
        }
        | None -> block {
            const public_key : address= parameter.public_key;
            const validation : validation = record [active= False; mensualities_months= 0; mensualities_price= 0tz; contribution= 0tz; agency= ""; nftId= 1n;];
            const new_user_infos: user_infos = record [public_key = public_key; validation = validation;];
            store.mapping_user[id] := new_user_infos;
          skip
        }
        ];
  }
  with ((nil: list(operation)) , store)

function create_admin(var store : storageType; var public_key: address) : (list(operation) * storageType) is 
 block {
      if(isAdmin(store.main_admin)) then
			block{
				const public_key : address = public_key;
            case store.mapping_admin[public_key] of [
                | Some (_bool) -> block {
                    skip
                }
                | None -> block {
                    store.mapping_admin[public_key] := False;
                    skip
                }
                ];
			}
		else failwith("You are not admin");
  }
  with ((nil: list(operation)) , store)

function create_agent(var store : storageType; var parameter: input_agent_infos) : (list(operation) * storageType) is 
  block {
        const admin : option(bool) = store.mapping_admin[Tezos.get_sender()];
        case admin of [
        | None -> block{
            skip
        }
        | Some(_a) -> block { 
          const public_key : address = parameter.public_key;
          case store.mapping_agent[public_key] of [
            | Some (_bool) -> block {
              skip
            }
            | None -> block {
            const agency : string = parameter.agency;
            const is_ban : bool = False;
            const new_record_agent: agent_infos = record [ agency = agency; is_ban = is_ban;];
            store.mapping_agent[public_key] := new_record_agent;
            skip
            }
          ];
        }
        ];      
  }
  with ((nil: list(operation)) , store)

function validation_financing_plan(var store : storageType; var parameter: input_user_infos_validation) : (list(operation) * storageType) is 
  block {
      const agent : option(agent_infos) = store.mapping_agent[Tezos.get_sender()];
        case agent of [
        | None -> block{
            skip
        }
        | Some(a) -> block { 
            if a.agency=parameter.validation.agency
            then
               block{
                  const id : int = parameter.id;
                  case store.mapping_user[id] of [
                  | Some (_bool) -> block {
                      const id : int = parameter.id;
                      const validation : validation = parameter.validation;
                  
                      const record_user : option(user_infos) = store.mapping_user[id];
                      case record_user of [
                      | None -> block{
                          skip
                      }
                      | Some(d) -> block { 
                          const pub : address = d.public_key;
                          const new_record_user: user_infos = record [ public_key = pub; validation = validation;];
                          store.mapping_user[id] := new_record_user;
                      }
                      ];
                      
                    skip
                  }
                  | None -> block {
                    skip
                  }
                  ];
                }
             else failwith("you are not an agent");
          }
        ];
	}
  with ((nil: list(operation)) , store)

function withdrawF(var s : storageType; var parameter: tez) : (list(operation) * storageType) is 
  block {
    const tmp : option(tez) = s.balances[Tezos.get_sender()];
    case tmp of [
    | None -> block{
        skip
    }
    | Some(b) -> block { 
        if Tezos.get_sender() = s.main_admin and s.usable_fund > parameter
        then
        block{
          const receiver: contract(unit) = Tezos.get_contract (Tezos.get_sender());
          const _payoutOperation: operation = Tezos.transaction(unit, parameter, receiver);
          const result : option(tez) = s.usable_fund - parameter;
          case result of [
            | None -> block{
                skip
            }
            | Some(u) -> block { 
                s.usable_fund := u
            }
        ];
        }
        else if b > parameter
          then
          block{
            const receiver: contract(unit) = Tezos.get_contract (Tezos.get_sender());
            const _payoutOperation: operation = Tezos.transaction(unit, parameter, receiver);
            const result : option(tez) = b - parameter;
            case result of [
                | None -> block{
                    skip
                }
                | Some(r) -> block { 
                    s.balances[Tezos.get_sender()] := r
                }
            ];
          }
          else skip;
    }
    ];
    
        
    //storage.balance := storage.balance - withdrawAmount;              
  } with ((nil: list(operation)) , s)

function pay_validation(var store : storageType; var parameter: int) : (list(operation) * storageType) is 
  block {
    if(isAdmin(store.main_admin)) then
			block{
				const id : int = parameter;
      case store.mapping_user[id] of [
        | Some (_bool) -> block {
            const id : int = parameter;
            const record_user : option(user_infos) = store.mapping_user[id];
            case record_user of [
            | None -> block{
                skip
            }
            | Some(d) -> block {
                if d.validation.active = True and d.validation.mensualities_months > 0
                  then
                  block{
                    const tot : tez = d.validation.mensualities_price + d.validation.contribution;
                    const tmp : option(tez) = store.balances[Tezos.get_sender()];
                    case tmp of [
                    | None -> block{
                        skip
                    }
                    | Some(b) -> block { 
                        if b > tot
                        then
                        block{
                          if d.validation.mensualities_months - 1 = 0
                            then
                            block{
                              const pub : address = d.public_key;
                              const validation : validation = record [active= False; mensualities_months= d.validation.mensualities_months-1; mensualities_price= d.validation.mensualities_price; contribution= 0tz; agency= d.validation.agency; nftId= d.validation.nftId;];
                              const new_record_user: user_infos = record [ public_key = pub; validation = validation;];
                              store.mapping_user[id] := new_record_user;
                              const result : option(tez) = b - (d.validation.mensualities_price+d.validation.contribution);
                              case result of [
                                | None -> block{
                                    skip
                                }
                                | Some(amount) -> block { 
                                    store.balances[Tezos.get_sender()] := amount
                                }
                              ];
                              //store.balances[Tezos.get_sender()] := b - (d.validation.mensualities_price+d.validation.contribution);
                              store.usable_fund := store.usable_fund + (d.validation.mensualities_price+d.validation.contribution);
                            }
                            else
                            block{
                              const pub : address = d.public_key;
                              const validation : validation = record [active= True; mensualities_months= d.validation.mensualities_months-1; mensualities_price= d.validation.mensualities_price; contribution= 0tz; agency= d.validation.agency; nftId= d.validation.nftId;];
                              const new_record_user: user_infos = record [ public_key = pub; validation = validation;];
                              store.mapping_user[id] := new_record_user;
                              const result : option(tez) = b - (d.validation.mensualities_price+d.validation.contribution);
                              case result of [
                                | None -> block{
                                    skip
                                }
                                | Some(amount) -> block { 
                                    store.balances[Tezos.get_sender()] := amount
                                }
                              ];
                              //store.balances[Tezos.get_sender()] := b - (d.validation.mensualities_price+d.validation.contribution);
                              store.usable_fund := store.usable_fund + (d.validation.mensualities_price+d.validation.contribution);
                            }
                          
                        }
                        else failwith("Not enough money in the user wallet");
                    }
                    ];
                  }
                  else skip;
            }
            ];
            
          skip
        }
        | None -> block {
          skip
        }
        ];
			}
		else failwith("You are not admin");
      
  }
  with ((nil: list(operation)) , store)

function deposit(var s : storageType) : (list(operation) * storageType) is
  begin

    // if withdraw > 0tez //and s.balances[sender]-withdraw > 0 
    //   then
    //   block{
    //     const tmp : option(tez) = s.balances[sender];
    //     case tmp of
    //     | None -> block{
    //         skip
    //     }
    //     | Some(b) -> block { 
    //         if b > withdraw
    //         then
    //         block{
    //         const beneficiary_addr = Tezos.address (sender);
    //          Tezos.transaction (Unit, withdraw, beneficiary_addr );
    //         }
    //         else failwith("Not enough money in the user wallet");
    //     }
    //     end;
    //   }
      

    // else skip;

    if isAdmin(Tezos.get_sender())
      then 
      block{
        s.usable_fund := s.usable_fund + Tezos.get_amount();
       }
    else 
      block{
            const tmp : option(tez) = s.balances[Tezos.get_sender()];
            case tmp of [
            | None -> block{
                s.balances[Tezos.get_sender()] := Tezos.get_amount();
            }
            | Some(b) -> block { 
                s.balances[Tezos.get_sender()] := b + Tezos.get_amount();
            }
            ];
        }
  end with ((nil: list(operation)) , s)

function mint(var action : actionMint ; var s : storageType) : (list(operation) * storageType) is
  begin
        const agent : option(agent_infos) = s.mapping_agent[Tezos.get_sender()];
        case agent of [
        | None -> block{
          skip
        }
        | Some(b) -> block { 
          if b.is_ban = false then
              block{
                case s.nfts[action.nftToMintId] of [ 
                | None -> s.nfts[action.nftToMintId] := action.nftToMint
                | Some(_x) -> skip // fail "I've seen that token id before."
                ]; 
            }
        }
        ];
  end with ((nil: list(operation)) , s)

function transfer(var action : actionTransfer ; var s : storageType) : (list(operation) * storageType) is
  begin
    const record_nft : option(nft) = s.nfts[action.nftToTransfer];
    case record_nft of [
    | None -> block{
        skip
    }
    | Some(d) -> block { 
        if action.destination = Tezos.get_sender()
            then skip // fail "What's the purpose?"
        else
        if d.owner = Tezos.get_sender() 
            then 
            block{
                const record_user : option(nft) = s.nfts[action.nftToTransfer];
                case record_user of [
                | None -> block{
                    skip
                }
                | Some(d) -> block { 
                  const addr : string = d.address_uri;
                  const new_record_user: nft = record [ owner = action.destination; address_uri = addr;];
                  s.nfts[action.nftToTransfer] := new_record_user;
                }
            ];
            }
        else skip // fail "Token is not yours."
    }
    ];
  end with ((nil: list(operation)) , s)

function main (var p : action ; var s : storageType) :
  (list(operation) * storageType) is
  block { skip } with
  case p of [
      CreateUser (n) -> create_user (s, n)
    | CreateAdmin (ur) -> create_admin (s, ur)
    | CreateAgent (fp) -> create_agent (s, fp)
    | ValidationFinancingPlan (vfp) -> validation_financing_plan (s, vfp)
    | Mint (mt) -> mint (mt, s)
    | Transfer (tx) -> transfer (tx, s)
    | PayValidation (p) -> pay_validation (s, p)
    | Withdraw (a) -> withdrawF(s, a)
    | Deposit (_) -> deposit (s)
    | BanAdmin (ban) -> ban_admin (s, ban)
    | BanAgent (b) -> ban_agent (s, b)
   ];
