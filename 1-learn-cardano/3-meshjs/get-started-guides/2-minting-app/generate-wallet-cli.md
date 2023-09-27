# Generate Wallet Address Using cardano-cli

## Initiate Blockchain Network

network="testnet-magic 1"
or
network="testnet-magic 2"
or
network="mainnet"

## Test Querying The Blockchain

cardano-cli query tip \
--$network

## Make Directory

mkdir -p mintingAddress
cd mintingAddress

## Create Payment Signing Key

cardano-cli address key-gen \
--verification-key-file payment.vkey \
--signing-key-file payment.skey

## Create Staking Signing Key

cardano-cli stake-address key-gen \
--verification-key-file stake.vkey \
--signing-key-file stake.skey

## Create Address

cardano-cli address build \
--payment-verification-key-file payment.vkey \
--stake-verification-key-file stake.vkey \
--out-file payment.addr \
--$network

paymentSkey=$(cat payment.skey)
stakeSkey=$(cat stake.skey)
paymentAddress=$(cat payment.addr)

echo $paymentSkey
echo $stakeSkey
echo $paymentAddress

# Check Balance

cardano-cli query utxo \
--address $paymentAddress \
--$network
