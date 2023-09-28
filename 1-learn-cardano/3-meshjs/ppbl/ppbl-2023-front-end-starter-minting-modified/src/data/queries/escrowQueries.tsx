import { gql } from "@apollo/client";

export const ESCROW_QUERY = gql`
  query CommitmentTransactionDetails($transactionHash: Hash32Hex!) {
    transactions(where: { hash: { _eq: $transactionHash } }) {
      inputs {
        address
        value
        tokens {
          asset {
            policyId
            assetName
          }
          quantity
        }
      }
      outputs {
        txHash
        index
        address
        value
        tokens {
          asset {
            policyId
            assetName
          }
          quantity
        }
        datum {
          bytes
        }
      }
      metadata {
        key
        value
      }
    }
  }
`;
