import { useState } from 'react';
import { AppWallet } from '@meshsdk/core';
import { BlockfrostProvider } from '@meshsdk/core';

export default function Home() {
  const [seedPhrases, setSeedPhrases] = useState(['']);
  const [paymentAddress, setPaymentAddress] = useState('');
  const [rewardAddress, setRewardAddress] = useState('');
  const blockchainProvider = new BlockfrostProvider('preprodMA1RD10G7YQMdl46Bsi3mOQv5vwuXQCE');
 
  async function clickHandler() {
    const mnemonic = AppWallet.brew();
    // console.log(mnemonic);

    setSeedPhrases(mnemonic);

    const wallet = new AppWallet({
      networkId: 0,
      fetcher: blockchainProvider,
      submitter: blockchainProvider,
      key: {
        type: 'mnemonic',
        words: 
          [
            mnemonic[0], 
            mnemonic[1], 
            mnemonic[2], 
            mnemonic[3],
            mnemonic[4],
            mnemonic[5],
            mnemonic[6], 
            mnemonic[7], 
            mnemonic[8], 
            mnemonic[9],
            mnemonic[10],
            mnemonic[11],
            mnemonic[12], 
            mnemonic[13], 
            mnemonic[14], 
            mnemonic[15],
            mnemonic[16],
            mnemonic[17],
            mnemonic[18], 
            mnemonic[19], 
            mnemonic[20], 
            mnemonic[21],
            mnemonic[22],
            mnemonic[23],
          ],
      },
    });
  
    const getPaymentAddress = wallet.getPaymentAddress();
    const getRewardAddress = wallet.getRewardAddress();
    // console.log(getPaymentAddress);
    // console.log(getRewardAddress);

    setPaymentAddress(getPaymentAddress);
    setRewardAddress(getRewardAddress);
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center border border-slate-500 rounded-2xl shadow-xl p-4 m-2">
        <div className="flex justify-center items-center m-2">
          <div>
            <h1 className="text-center font-bold">Seed Phares :</h1>
            <div className="border border-slate-500 w-40 h-145 text-center">
              {seedPhrases.map((phrase, index) => (
                <p key={index}>{phrase}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="m-2">
          <div className="flex justify-center items-center mb-4">
            <div>
              <h1 className="text-center font-bold">Payment Address :</h1>
              <div className="border border-slate-500 w-145 h-10 text-center">
                {paymentAddress}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mb-4">
            <div>
              <h1 className="text-center font-bold">Payment Address :</h1>
              <div className="border border-slate-500 w-145 h-10 text-center">
                {rewardAddress}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="button"
              className="bg-blue-500 text-white font-bold rounded-xl w-56 h-10 hover:bg-blue-700"
              onClick={clickHandler}
            >
              Generate Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
