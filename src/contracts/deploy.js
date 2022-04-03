import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit, MichelsonMap } from '@taquito/taquito';

import user_json from './UserProfileRisk.json'

const Tezos = new TezosToolkit('https://rpc.hangzhounet.teztnets.xyz');

const pk = "edskRtRAqKjio8UhKGXRdQjF9aGwdwvh6Bx9hMDYph1ALuMCcnbRVuaB9KiEmyo3yXoSteckFBxdrLMuJ8vM3TQPTQpDJyFVHL";
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
let mappinguser = new MichelsonMap();
let mappinguserrisk = new MichelsonMap();


Tezos.contract
  .originate({
    code: user_json,
  
    storage: {
      mapping: mappinguser,
      users_risk: mappinguserrisk,

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


  // V1 : https://better-call.dev/hangzhou2net/KT1UmXNi1ga2RbuG4kTyqZLjnHZC6zKtLM5U/storage

  // V2 : https://better-call.dev/hangzhou2net/KT1MZfRT5ryY74qzcuSjbZKUFQC7GRWczKxu/storage

<<<<<<< HEAD
  // V3 : https://better-call.dev/hangzhou2net/KT1MZfRT5ryY74qzcuSjbZKUFQC7GRWczKxu/storage
=======
  // V3 : https://better-call.dev/hangzhou2net/KT1MZfRT5ryY74qzcuSjbZKUFQC7GRWczKxu/storage
>>>>>>> ae8a999f65f4e72b815daca33289dd2745035912
