type balances is map(address, int);
type banned_users is map(address, option(int));

type storageType is record [
  mapping: balances;
  mapping_banned: banned_users;
]

type action is
  CreateUser of address
 | BannedUser of address

type return is list (operation) * storageType

//  functions
//  create_user()
//  banned_users() #only_admin #pour les immobiliers -> pas obligé de faire une map pour le access code plutôt sur le front.

function create_users(var store : storageType; var current_user: address) : (list(operation) * storageType) is 
  block {
      token_nb := Map.size(store.mapping) + 1;
      case store.mapping[current_user] of
        | Some (_bool) -> block {
          skip
        }
        | None -> store.mapping[current_user] := token_nb
        end
  }
  with ((nil: list(operation)) , store)

function banned_users(var store : storageType; var banned_user: address) : (list(operation) * storageType) is 
  block {
      //token_id := get_token_id(store, banned_user);
      const token_id : option(int) = store.mapping[banned_user];
      case store.mapping[banned_user] of
        | Some (_bool) -> block {
          store.mapping_banned[banned_user] := token_id;
          remove banned_user from map store.mapping; 
        }
        | None -> failwith("[ERROR] Your address has no number saved.")
        end
  }
  with ((nil: list(operation)) , store)

function main (var p : action ; var s : storageType) :
  (list(operation) * storageType) is
  block { skip } with
  case p of
    CreateUser (n) -> create_users (s, n)
   | BannedUser (u) -> banned_users (s, u)
   end
