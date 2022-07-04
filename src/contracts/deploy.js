import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit, MichelsonMap } from '@taquito/taquito';

import user_json from './Main.json';

const Tezos = new TezosToolkit('https://jakartanet.ecadinfra.com');

const pk = ""
const signer = new InMemorySigner(pk);
Tezos.setProvider({signer: signer })
console.log(user_json)



// Smart contract User
// let mappingusers = new MichelsonMap();
// let mappingbanned = new MichelsonMap();


// Tezos.contract
//   .originate({
//     code: user_json,
  
//     storage: {
//       mapping: mappingusers,
//       mapping_banned: mappingbanned,

//     },
//   })
//   .then((originationOp) => {
//     console.log(`Waiting for confirmation of origination for ${originationOp.contractAddress}...`);
//     return originationOp.contract();
//   })
//   .then((contract) => {
//     console.log("Origination completed.");
//   })
//   .catch((error) => console.log(error));

// Smart contract UserProfileRisk
// let mappinguser = new MichelsonMap();
// let mappinguserrisk = new MichelsonMap();


// Tezos.contract
//   .originate({
//     code: user_json,
  
//     storage: {
//       mapping: mappinguser,
//       users_risk: mappinguserrisk,

//     },
//   })
//   .then((originationOp) => {
//     console.log(`Waiting for confirmation of origination for ${originationOp.contractAddress}...`);
//     return originationOp.contract();
//   })
//   .then((contract) => {
//     console.log("Origination completed.");
//   })
//   .catch((error) => console.log(error));


  // V1 : https://better-call.dev/hangzhou2net/KT1UmXNi1ga2RbuG4kTyqZLjnHZC6zKtLM5U/storage

  // V2 : https://better-call.dev/hangzhou2net/KT1MZfRT5ryY74qzcuSjbZKUFQC7GRWczKxu/storage

  // V3 : https://better-call.dev/hangzhou2net/KT1MZfRT5ryY74qzcuSjbZKUFQC7GRWczKxu/storage

// Financing Plan Smart Contract: 

let mappinguser = new MichelsonMap();
let mappingadmin = new MichelsonMap();
let mappingagent = new MichelsonMap();
let mappingnft = new MichelsonMap();
let mappingbalances = new MichelsonMap();


Tezos.contract
  .originate({
    code: user_json,
  
    storage: {
      mapping_user: mappinguser,
      mapping_admin: mappingadmin,
      mapping_agent: mappingagent,
      main_admin : "tz1LykgAH5r5imY4JJciBuusStBNnWGirkt2",
      nfts: mappingnft,
      balances: mappingbalances,
      usable_fund: 0

    },
  })
  .then((originationOp) => {
    console.log(`Waiting for confirmation of origination for ${originationOp.contractAddress}...`);
    return originationOp.contract();
  })
  .then((contract) => {
    console.log("Origination completed.");
  })
  .catch((error) => console.log(error));

// V1 : https://better-call.dev/hangzhou2net/KT1CXA5i1RKhk8CrVbxbDpYfepAeYFx2RE4u/operations

// V2 : https://better-call.dev/hangzhou2net/KT1D48XhgUTi7ANEAWqo13jrn5Y1LCtSpivZ/interact?entrypoint=createUser

// V3 : https://better-call.dev/hangzhou2net/KT1D48XhgUTi7ANEAWqo13jrn5Y1LCtSpivZ/storage

// V4 : https://better-call.dev/hangzhou2net/KT1Fqf4uHJgUrr61ui8Nakp3xDct64uqxFsN/storage

// Tezos.contract
//   .originate({
//     code: user_json,
  
//     storage: {
//       address: "KT1Fqf4uHJgUrr61ui8Nakp3xDct64uqxFsN"
//     },
//   })
//   .then((originationOp) => {
//     console.log(`Waiting for confirmation of origination for ${originationOp.contractAddress}...`);
//     return originationOp.contract();
//   })
//   .then((contract) => {
//     console.log("Origination completed.");
//   })
//   .catch((error) => console.log(error));
