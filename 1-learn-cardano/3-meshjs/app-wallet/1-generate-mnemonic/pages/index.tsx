import { useState } from "react";
import { AppWallet } from "@meshsdk/core";

export default function Home() {
  const [seedPhrases, setSeedPhrases] = useState([""]);

  function clickHandler() {
    const mnemonic = AppWallet.brew();
    console.log(mnemonic);

    setSeedPhrases(mnemonic);
  }

  return (
    <div className="flex justify-center items-center my-1">
      <div className="border border-slate-500 rounded-2xl shadow-xl w-72">
        <div className="flex justify-center items-center my-2">
          <div>
            <h1 className="text-center font-bold">Seed Phares :</h1>
            <div className="border border-slate-500 w-40 h-145 text-center">
              {seedPhrases.map((phrase, index) => (
                <p key={index}>{phrase}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center my-2">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-xl w-56 h-10"
            onClick={clickHandler}
          >
            Generate SeedPhrases
          </button>
        </div>
      </div>
    </div>
  );
}
