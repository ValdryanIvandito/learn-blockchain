import { gql } from "@apollo/client";

export const CONTRIBUTOR_TOKEN_QUERY = gql`
  query QueryReferenceAddress($contractAddress: String!) {
    utxos(where: { address: { _eq: $contractAddress } }) {
      tokens {
        asset {
          assetName
        }
      }
      datum {
        value
      }
    }
  }
`;
