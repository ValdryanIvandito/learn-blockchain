import { useState } from "react";
import { useWalletList } from "@meshsdk/react";

export default function Page() {
  const wallets = useWalletList();

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="border border-white rounded-3xl px-16 py-4">
        <h1 className="text-center text-2xl font-bold">Wallet List :</h1>
        <div className="flex justify-center items-center">
          {wallets.map((wallet, i) => {
            return (
              <div key={i}>
                <div className="flex items-center justify-center">
                  <div className="bg-gray-700 rounded-xl mx-2 my-4 p-3 hover:border hover:border-white">
                    <img src={wallet.icon} style={{ width: "48px" }} />
                    <b>{wallet.name}</b>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
