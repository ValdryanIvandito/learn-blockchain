import { AppWallet, Transaction, ForgeScript, BlockfrostProvider, } from '@meshsdk/core';
import { metadata } from './metadata.js';
import { recipients } from './recipients.js';
const demoCLIKey = {
    paymentSkey: '582038581f729f822ffc165aea205abafbdc7e976113a50129b2dd8f3f40a9167bac',
    stakeSkey: '5820ded2733463748879aa296d90ce909575495f0b26eb18a0baf37cda7e84040141',
};
const networkId = 0;
const blockfrostKey = 'preprodMA1RD10G7YQMdl46Bsi3mOQv5vwuXQCE';
const blockchainProvider = new BlockfrostProvider(blockfrostKey);
const wallet = new AppWallet({
    networkId: networkId,
    fetcher: blockchainProvider,
    submitter: blockchainProvider,
    key: {
        type: 'cli',
        payment: demoCLIKey.paymentSkey,
        stake: demoCLIKey.stakeSkey,
    },
});
const walletAddress = wallet.getPaymentAddress();
const forgingScript = ForgeScript.withOneSignature(walletAddress);
const tx = new Transaction({ initiator: wallet });
for (let recipient in recipients) {
    const recipientAddress = recipient;
    const assetName = recipients[recipient];
    const assetMetadata = metadata[assetName];
    const asset = {
        assetName: assetName,
        assetQuantity: '1',
        metadata: assetMetadata,
        label: '721',
        recipient: recipientAddress
    };
    tx.mintAsset(forgingScript, asset);
}
const unsignedTx = await tx.build();
const signedTx = await wallet.signTx(unsignedTx, false);
const txHash = await wallet.submitTx(signedTx);
