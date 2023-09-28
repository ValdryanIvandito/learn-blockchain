import { createContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { Asset } from "@meshsdk/core";
import { useWallet } from "@meshsdk/react";

import { issuerPolicyID, contributorPolicyID, treasury } from "gpte-config";
import { GraphQLUTxO } from "@/src/types/cardanoGraphQL";
import { TREASURY_UTXO_QUERY } from "@/src/data/queries/treasuryQueries";
import { hexToString } from "@/src/utils";

interface CurrentPPBLContext {
    connectedContribToken: string | undefined
    connectedIssuerToken: string | undefined
    treasuryUTxO: GraphQLUTxO | undefined
    loading: boolean
    error: boolean
}

const initialContext: CurrentPPBLContext = {
    connectedContribToken: undefined,
    connectedIssuerToken: undefined,
    treasuryUTxO: undefined,
    loading: false,
    error: false
}

const PPBLContext = createContext<CurrentPPBLContext>(initialContext);

type Props = {
  children?: React.ReactNode;
};

const PPBLContextProvider: React.FC<Props> = ({ children }) => {
  const [currentContext, setCurrentContext] = useState<CurrentPPBLContext>(initialContext)
  const [currentTreasuryUTxO, setCurrentTreasuryUTxO] = useState<GraphQLUTxO | undefined>(undefined);

  const [connectedContributorToken, setConnectedContributorToken] = useState<Asset | undefined>(undefined);
  const [contribTokenName, setContribTokenName] = useState<string | undefined>(undefined);

  const [connectedIssuerToken, setConnectedIssuerToken] = useState<Asset | undefined>(undefined);
  const [issuerTokenName, setIssuerTokenName] = useState<string | undefined>(undefined);

  const { connected, wallet } = useWallet();

  const { data, loading, error } = useQuery(TREASURY_UTXO_QUERY, {
    variables: {
      contractAddress: treasury.address,
    },
  });

  useEffect(() => {
    const newContext: CurrentPPBLContext = {
        connectedContribToken: contribTokenName,
        connectedIssuerToken: issuerTokenName,
        treasuryUTxO: currentTreasuryUTxO,
        loading: loading,
        error: (error != undefined)
    }
    setCurrentContext(newContext)
  }, [contribTokenName, issuerTokenName, currentTreasuryUTxO, loading, error])

  useEffect(() => {
    if(data && data.utxos.length == 1) {
        setCurrentTreasuryUTxO(data.utxos[0])
    }
  }, [data])

  useEffect(() => {
    const fetchContributorToken = async () => {
      const _token = await wallet.getPolicyIdAssets(contributorPolicyID);
      if (_token.length > 0) {
        setConnectedContributorToken(_token[0]);
      }
    };

    const fetchIssuerToken = async () => {
      const _token = await wallet.getPolicyIdAssets(issuerPolicyID);
      if (_token.length > 0) {
        setConnectedIssuerToken(_token[0]);
      }
    };

    if (connected) {
      fetchContributorToken();
      fetchIssuerToken();
    }
  }, [connected]);

  useEffect(() => {
    const fetchContributorReferenceDatum = async () => {
      if (connectedContributorToken) {
        const _hexName = connectedContributorToken.unit.substring(62)
        const _tokenName = hexToString(_hexName)
        setContribTokenName(_tokenName)
      }
    };

    if (connectedContributorToken) {
      fetchContributorReferenceDatum();
    }
  }, [connectedContributorToken]);

  useEffect(() => {
    const fetchIssuerTokenName = async () => {
      if (connectedIssuerToken) {
        const _hexName = connectedIssuerToken.unit.substring(56)
        const _tokenName = hexToString(_hexName)
        setIssuerTokenName(_tokenName)
      }
    };

    if (connectedIssuerToken) {
      fetchIssuerTokenName();
    }
  }, [connectedIssuerToken]);


  return <PPBLContext.Provider value={currentContext}>{children}</PPBLContext.Provider>;
};

export { PPBLContext, PPBLContextProvider };
