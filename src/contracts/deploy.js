import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit, MichelsonMap } from '@taquito/taquito';

import user_json from './User.json'

const Tezos = new TezosToolkit('https://rpc.hangzhounet.teztnets.xyz');

const pk = "edskRtRAqKjio8UhKGXRdQjF9aGwdwvh6Bx9hMDYph1ALuMCcnbRVuaB9KiEmyo3yXoSteckFBxdrLMuJ8vM3TQPTQpDJyFVHL";
const signer = new InMemorySigner(pk);
Tezos.setProvider({signer: signer })
console.log(user_json)

let mappingusers = new MichelsonMap();
let mappingbanned = new MichelsonMap();


Tezos.contract
  .originate({
    code: user_json,
  
    storage: {
      mapping: mappingusers,
      mapping_banned: mappingbanned,

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






