import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit, MichelsonMap } from '@taquito/taquito';

import user_json from './Main.json';

const Tezos = new TezosToolkit('https://jakartanet.ecadinfra.com');

const pk = ""
const signer = new InMemorySigner(pk);
Tezos.setProvider({signer: signer })
console.log(user_json)

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
      main_admin : "tz1Y2BwKRkh4ZMcGAY3rkdMacKfA1AgbdTyZ",
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
