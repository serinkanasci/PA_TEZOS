import "../index.css";
import {
  connectWallet,
  getActiveAccount,
  disconnectWallet,
  getBalances
} from "../utils/wallet";
import { useEffect, useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import config from "../config";


export default function Navbar() {
  const [wallet, setWallet] = useState(null);
  const [balances, setBalances] = useState(0);

  const rpcURL = "https://jakartanet.ecadinfra.com";

  const handleConnectWallet = async () => {
    const { wallet } = await connectWallet();
    setWallet(wallet);
  };
  const handleDisconnectWallet = async () => {
    const { wallet } = await disconnectWallet();
    setWallet(wallet);
  };

  useEffect(() => {
    const func = async () => {
      const account = await getActiveAccount();
      if (account) {
        setWallet(account.address);

        const tezos = new TezosToolkit(rpcURL);
        tezos.setWalletProvider(wallet);
        tezos.contract.at(config.contractAddress).then((myContract) => {
          return myContract
            .storage()
            .then((myStorage) => {
              const balance = myStorage["balances"].get(account.address);

              setBalances(balance.c[0]/1000000);
            })
            .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
        })
      }
    };
    func();
  }, []);

  return (
    <nav className="bg-gray-800 h-14 flex items-center px-10 justify-between">
      <div className="flex-1 space-x-4">
      </div>
      <div>
        💳{balances}
      </div>
      <div>
        <button
          onClick={wallet ? handleDisconnectWallet : handleConnectWallet}
          className="bg-red-500 px-6 py-2 rounded-sm text-xs font-semibold text-white cursor-pointer"
        >
          💳{" "}
          {wallet
            ? wallet.slice(0, 4) +
              "..." +
              wallet.slice(wallet.length - 4, wallet.length)
            : "Connect"}
        </button>
      </div>
    </nav>
  );
}
