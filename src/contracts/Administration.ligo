type storageType is record [
  admin: address;
]

type return is list (operation) * storageType

function only_admin (var store : storageType) : bool is
block {
    skip
} with (Tezos.sender = store.admin)

function change_admin (var store : storageType; var new_admin : address) : address is
    block {
        store.admin := new_admin
    } with store.admin

function get_admin (var store: storageType) : address is store.admin

function main (const store : storageType) : 
  block {

  }
