import { gql, GraphQLClient } from "graphql-request";

const graphQLClient = new GraphQLClient(
  "https://d.graphql-api.iohk-preprod.dandelion.link/",
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

const query = gql`
  query GetUTxODatum($contribAsset: Hex!) {
    utxos(where: { tokens: { asset: { assetId: { _eq: $contribAsset } } } }) {
      datum {
        value
      }
    }
  }
`;

export async function getInlineDatumForContributorReference(assetId: string) {
  const variables = {
    contribAsset: assetId,
  };

  const results: any = await graphQLClient.request(query, variables);
  const _datum_value = results.utxos[0].datum.value

  return _datum_value;

}
