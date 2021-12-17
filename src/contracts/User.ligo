type balances is map(address, nat)
type banned_users is map(address, bool)

type storageType is record [
  mapping: balances;
  access_code: bool;
  mapping_banned: banned_users;
]

type action is
  CreateUser of nat
 | BannedUser of unit

type return is list (operation) * storageType

//  functions
//  create_user()
//  banned_users() #only_admin
//  banned_access_code() #only_admin #pour les immobiliers -> pas obligé de faire une map pour le access code plutôt sur le front.

function create_users(var store : storageType; var token_id: nat) : (list(operation) * storageType) is 
  block {
      case store.mapping[Tezos.sender] of
        | Some (_bool) -> block {
          skip
        }
        | None -> store.mapping[Tezos.sender] := token_id
        end
  }
  with ((nil: list(operation)) , store)


function banned_users(var store : storageType) : (list(operation) * storageType) is 
  block {
      case store.mapping[Tezos.sender] of
        | Some (_bool) -> remove Tezos.sender from map store.mapping
        | None -> failwith("[ERROR] Your address has no number saved.")
        end
  }
  with ((nil: list(operation)) , store)

function main (var p : action ; var s : storageType) :
  (list(operation) * storageType) is
  block { skip } with
  case p of
    CreateUser (n) -> create_users (s, n)
   | BannedUser (_n) -> banned_users (s)
   end