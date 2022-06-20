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

export const deposit = async (value) => {
  console.log("deposit");
  const response = await checkIfWalletConnected(wallet);
  console.log(value)
  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);

    const account = await wallet.client.getActiveAccount();
            console.log(account.address);

    await tezos.wallet
    .at(config.contractAddress)
    .then((contract) => {
        console.log("ok5");
        console.log(contract.methods);
        
        return contract.methods.deposit().send({"amount":value});
    })
    .then((op) => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        // window.location.href = process.env.REACT_APP_FRONT+"/login"
        return op.confirmation(3).then(() => op.hash);
    })
    .then((hash) => console.log(`Operation injected: https://ithaca.tzstats.com/${hash}`))
    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
            
  }
};


export const withdraw = async (value_to_recup) => {
  
  const response = await checkIfWalletConnected(wallet);
  console.log(value_to_recup)
  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);

    const account = await wallet.client.getActiveAccount();
            console.log(account.address);

    value_to_recup = value_to_recup * 1000000
    await tezos.wallet
    .at(config.contractAddress)
    .then((contract) => {
        console.log("ok5");
        console.log(contract.methods);
        
        return contract.methods.withdraw(value_to_recup).send();
    })
    .then((op) => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        // window.location.href = process.env.REACT_APP_FRONT+"/login"
        return op.confirmation(3).then(() => op.hash);
    })
    .then((hash) => console.log(`Operation injected: https://ithaca.tzstats.com/${hash}`))
    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
            
  }
};

export const createAdmin = async (pk) => {
  
  const response = await checkIfWalletConnected(wallet);
  console.log(pk)
  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);

    await tezos.wallet
    .at(config.contractAddress)
    .then((contract) => {
        return contract.methods.createAdmin(pk).send();
    })
    .then((op) => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        return op.confirmation(3).then(() => op.hash);
    })
    .then((hash) => console.log(`Operation injected: https://ithaca.tzstats.com/${hash}`))
    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
    
  }
};

export const banAdmin = async (pk) => {
  
  const response = await checkIfWalletConnected(wallet);
  console.log(pk)
  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);

    await tezos.wallet
    .at(config.contractAddress)
    .then((contract) => {
        return contract.methods.banAdmin(pk).send();
    })
    .then((op) => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        return op.confirmation(3).then(() => op.hash);
    })
    .then((hash) => console.log(`Operation injected: https://ithaca.tzstats.com/${hash}`))
    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
    
  }
};

export const banAgent = async (pk) => {
  
  const response = await checkIfWalletConnected(wallet);
  console.log(pk)
  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);

    await tezos.wallet
    .at(config.contractAddress)
    .then((contract) => {
        return contract.methods.banAgent(pk).send();
    })
    .then((op) => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        return op.confirmation(3).then(() => op.hash);
    })
    .then((hash) => console.log(`Operation injected: https://ithaca.tzstats.com/${hash}`))
    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
    
  }
};

export const mint = async (nft_id, address_uri) => {
  
  const response = await checkIfWalletConnected(wallet);
  console.log(address_uri)
  console.log(nft_id)
  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const account = await wallet.client.getActiveAccount();
    console.log(account.address);
    //const nftToMint = (address_uri, account.address)
    const test = [];
    test.push(address_uri);
    test.push(account.address);
    await tezos.wallet
    .at(config.contractAddress)
    .then((contract) => {
        return contract.methods.mint(address_uri, account.address, nft_id ).send();
    })
    .then((op) => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        return op.confirmation(3).then(() => op.hash);
    })
    .then((hash) => console.log(`Operation injected: https://ithaca.tzstats.com/${hash}`))
    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
    
  }
};
export {
  connectWallet,
  disconnectWallet,
  getActiveAccount,
  checkIfWalletConnected
};
