type nftId is nat;

type nft is record [
    owner : address;
]

type nfts is map(nftId, nft);

type storageType is nfts;

type actionMint is record [
  nftToMintId : nftId;
  nftToMint : nft;
]

type actionTransfer is record [
  nftToTransfer : nftId;
  destination : address;
]

type actionBurn is record [
    nftToBurnId : nftId;
]

type action is
| Mint of actionMint
| Transfer of actionTransfer
| Burn of actionBurn

function mint(const action : actionMint ; const s : storageType) : (list(operation) * storageType) is
  begin
    case s[action.nftToMintId] of 
    | None -> s[action.nftToMintId] := action.nftToMint
    | Some(x) -> skip // fail "I've seen that token id before."
    end
  end with ((nil: list(operation)) , s)

function transfer(const action : actionTransfer ; const s : storageType) : (list(operation) * storageType) is
  begin
    const nft : nft = get_force(action.nftToTransfer, s);
    if action.destination = sender
    then skip // fail "What's the purpose?"
    else
      if nft.owner = sender 
      then 
        s[action.nftToTransfer] := record
          owner = action.destination;
        end
      else skip // fail "Token is not yours."
  end with ((nil: list(operation)) , s)

function burn(const action : actionBurn ; const s : storageType) : (list(operation) * storageType) is
  begin
    const nft : nft = get_force(action.nftToBurnId, s);
    if nft.owner = sender 
    then remove action.nftToBurnId from map s
    else skip // fail "Token is not yours."
  end with ((nil: list(operation)) , s)

function main(const action : action; const s : storageType) : (list(operation) * storageType) is 
  block {skip} with 
    case action [ of
    | Mint (mt) -> mint (mt, s)
    | Transfer (tx) -> transfer (tx, s)
    | Burn (bn) -> burn (bn, s)
  ]
