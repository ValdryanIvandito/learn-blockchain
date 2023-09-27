import { useState } from "react";
import { BrowserWallet } from "@meshsdk/core";

export default function Home() {
  const [walletList, setWalletList] = useState([
    { name: "", icon: "", version: "" },
  ]);

  async function getWalletListHandler() {
    const getWalletList = BrowserWallet.getInstalledWallets();
    console.log(getWalletList);
    setWalletList(getWalletList);

    const wallet = await BrowserWallet.enable("eternl");
    const balance = await wallet.getBalance();
    console.log(balance);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border border-slate-500 rounded-2xl shadow-xl w-56 p-4">
        <h1 className="font-bold text-center my-2">Installed Wallet List:</h1>
        <div className="flex justify-center item-center">
          <div className="border border-slate-500 text-center w-40 min-h-10 mb-4">
            {walletList.map((wallet, index) => (
              <p key={index}>
                {wallet.name} {wallet.version}
              </p>
            ))}
          </div>
        </div>
        <div className="flex justify-center item-center my-2">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-xl w-40 h-10"
            onClick={getWalletListHandler}
          >
            Get Wallet List
          </button>
        </div>
      </div>
    </div>
  );
}
