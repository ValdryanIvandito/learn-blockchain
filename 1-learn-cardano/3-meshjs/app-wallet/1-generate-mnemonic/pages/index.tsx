import { useState } from 'react';
import { AppWallet } from '@meshsdk/core';

export default function Home() {
  const [seedPhrases, setSeedPhrases] = useState(['']);

  function clickHandler() {
    const mnemonic = AppWallet.brew();
    console.log(mnemonic);

    setSeedPhrases(mnemonic);
  }

  return (
    <div>
      <div className="flex justify-center items-center my-4">
        <div className="border border-slate-500 w-40 h-145 text-center">
          {seedPhrases.map((phrase, index) => (
            <p key={index}>{phrase}</p>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          type="button"
          className="bg-blue-500 text-white font-bold rounded-xl w-56 h-10 hover:bg-blue-700"
          onClick={clickHandler}
        >
          Generate SeedPhrases
        </button>
      </div>
    </div>
  );
}
