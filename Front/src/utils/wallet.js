import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import config from "../config";

const preferredNetwork = "ithacanet";
const options = {
  name: "NFT",
  iconUrl: "https://tezostaquito.io/img/favicon.png",
  preferredNetwork: preferredNetwork,
};
const rpcURL = "https://ithacanet.ecadinfra.com";
const wallet = new BeaconWallet(options);

const getActiveAccount = async () => {
  return await wallet.client.getActiveAccount();
};

const connectWallet = async () => {
  let account = await wallet.client.getActiveAccount();

  if (!account) {
    await wallet.requestPermissions({
      network: { type: preferredNetwork },
    });
    account = await wallet.client.getActiveAccount();
  }
  return { success: true, wallet: account.address };
};

const disconnectWallet = async () => {
  await wallet.disconnect();
  return { success: true, wallet: null };
};

const checkIfWalletConnected = async (wallet) => {
  try {
    const activeAccount = await wallet.client.getActiveAccount();
    if (!activeAccount) {
      await wallet.client.requestPermissions({
        type: { network: preferredNetwork },
      });
    }
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const changeName = async (name) => {
  // const wallet = new BeaconWallet(options);
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const contract = await tezos.wallet.at(config.contractAddress);
    const operation = await contract.methods.default(name).send();
    const result = await operation.confirmation();
    console.log(result);
  }
};

export const getBalance = async (name) => {
  // const wallet = new BeaconWallet(options);
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {

    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    //const contract = await tezos.wallet.at(config.contractAddress);
    tezos.contract.at(config.contractAddress).then((myContract) => {
      return myContract
        .storage()
        .then((myStorage) => {
          //We want to see the value of the key "1"
          console.log(myContract.storage())
          console.log("avant")
          const value = myStorage["balances"].get("tz1LykgAH5r5imY4JJciBuusStBNnWGirkt2");
          console.log(value.c[0])
         // console.log(`Values associated with this key : amount : ${value[Object.keys(value)[0]]}, quantity :
         // ${value[Object.keys(value)[1]]}`);
        })
        .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));

    

    //const result = await operation.confirmation();
    //console.log(result);
    })
  }
};


export {
  connectWallet,
  disconnectWallet,
  getActiveAccount,
  checkIfWalletConnected,
};
