type user_addr is address

type balances is map(address, int);

type user_infos is
  record [
    user: address;
    age: int;
    revenu_fiscal: nat;
    apport_personnel: nat;
    nb_occupant_futur_logement: int;
    pret_en_cours: int; // 0 non ; 1 oui
    prix_logement: nat;
  ]

type user_infos_status is
  record [
    user: address;
    user_risk_status: bool;
    prix_logement: nat;
    plafond_max: int;
  ]

type users_risk is map(user_addr, user_infos_status)

type financing_plan is
  record [
    user: address;
    taux_interet: nat;
    annees: int;
  ]

type financing_plan_infos is
  record [
    user: address;
    taux_interet: nat;
    taux_mensuelle: int;
    prix_logement: nat;
    annees: int
  ]

type user_plan is map(user_addr, financing_plan_infos)

type action is
   CreateUser of address
  | SetUserRisk of user_infos
  | SetFinancingPlan of financing_plan


type storageType is
  record [
    mapping: balances;
    users_risk: users_risk;
    user_plan: user_plan;
  ]

type return is list (operation) * storageType

function create_user(var store : storageType; var current_user: address) : (list(operation) * storageType) is 
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

function set_financing_plan(var store : storageType; const parameter : financing_plan) : (list(operation) * storageType) is 
  block {
      const taux_interet : nat = parameter.taux_interet;
      const annees : int = parameter.annees;
      case store.mapping[parameter.user] of
        | Some (_bool) -> block {
          const user : address = parameter.user;
          var user_risk_map : map (user_addr, user_infos_status) := store.users_risk;
          var user_infos_status : user_infos_status :=
            case user_risk_map[user] of
                Some(user_infos_status) -> user_infos_status
            | None -> (failwith("This address does not exist."): user_infos_status)
            end;
          const plafond_max : int = user_infos_status.plafond_max;
          const prix_logement : nat = user_infos_status.prix_logement;
          if user_infos_status.user_risk_status = True
          then block {
              const taux_mensuelle : int = taux_interet * prix_logement / plafond_max * annees; // calcul à revoir
              const new_user_plan: financing_plan_infos = record [ user = user; taux_interet = taux_interet; taux_mensuelle = taux_mensuelle; prix_logement = prix_logement; annees = annees;];
              store.user_plan[user] := new_user_plan;
            }
          else block {
              const taux_mensuelle : int = 0;
              const new_user_plan: financing_plan_infos = record [ user = user; taux_interet = taux_interet; taux_mensuelle = taux_mensuelle; prix_logement = prix_logement; annees = annees;];
              store.user_plan[user] := new_user_plan;
            }
        }
        | None -> failwith("[ERROR] Your address has no number saved.")
        end;
  }
  with ((nil: list(operation)) , store)

function set_user_risk(var store : storageType; const parameter : user_infos) : (list(operation) * storageType) is 
  block {
      const age : int = parameter.age;
      const revenu_fiscal : nat = parameter.revenu_fiscal;
      const apport_personnel : nat = parameter.apport_personnel;
      const nb_occupant_futur_logement : int = parameter.nb_occupant_futur_logement;
      const pret_en_cours : int = parameter.pret_en_cours;
      const prix_logement : nat = parameter.prix_logement;
      case store.mapping[parameter.user] of
        | Some (_bool) -> block {
          const user : address = parameter.user;
          const calcul : int = age + revenu_fiscal + apport_personnel + prix_logement + pret_en_cours / nb_occupant_futur_logement;  // calcul à revoir
          const user_infos_status : bool = (calcul > 5) ;
          if user_infos_status = True
          then block {
               const plafond_max : int = revenu_fiscal * nb_occupant_futur_logement; // calcul à revoir
               const new_user_infos: user_infos_status = record [ user = user; user_risk_status = user_infos_status; prix_logement = prix_logement; plafond_max = plafond_max];
               store.users_risk[user] := new_user_infos;
            }
          else block {
              const plafond_max : int = 0;
              const new_user_infos: user_infos_status = record [ user = user; user_risk_status = user_infos_status; prix_logement = prix_logement; plafond_max = plafond_max];
              store.users_risk[user] := new_user_infos;
            }
        }
        | None -> failwith("[ERROR] Your address has no number saved.")
        end;
  }
  with ((nil: list(operation)) , store)

function main (var p : action ; var s : storageType) :
  (list(operation) * storageType) is
  block { skip } with
  case p of
      CreateUser (n) -> create_user (s, n)
    | SetUserRisk (ur) -> set_user_risk (s, ur)
    | SetFinancingPlan (fp) -> set_financing_plan (s, fp)
   end