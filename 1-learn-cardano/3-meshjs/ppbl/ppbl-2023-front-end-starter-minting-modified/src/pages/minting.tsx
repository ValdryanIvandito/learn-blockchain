import Head from "next/head";
import {
  Box,
  Divider,
  Link as CLink,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  FormHelperText,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useAddress, useWallet, CardanoWallet } from "@meshsdk/react";
import { resolvePaymentKeyHash, AssetMetadata, Mint, Transaction, ForgeScript, NativeScript } from "@meshsdk/core";
import { useFormik } from "formik";

export default function Minting() {
  // Get your address with the address hook and create a state for storing your pubkey
  const address = useAddress();
  const { wallet } = useWallet();
  const [pubkeyHash, setPubkeyHash] = useState<string>("");

  // Create useEffect and calculate your pubkey hash
  useEffect(() => {
    if (address) {
      setPubkeyHash(resolvePaymentKeyHash(address));
    }
  }, [address]);

  // Add the formik logic for minting
  const formik = useFormik({
    initialValues: {
      pubkeyHash: "",
      amount: 0,
      tokenName: "",
      membership: "",
    },
    onSubmit: async values => {
      if (address === undefined) {
        return;
      }

      // Asset metadata for the minting transaction
      const assetMetadata: AssetMetadata = {
        "name": values.tokenName,
        "membership": values.membership,
        "description": "Module 202 lesson 2 token minting"
      };

      // Minting parameters
      const asset: Mint = {
        assetName: values.tokenName,
        assetQuantity: values.amount.toString(),
        metadata: assetMetadata,
        label: '721',
        recipient: address
      };

      const tx = new Transaction({initiator: wallet});

      // This is the minting condition. This minting policies is special for the Pubkey Hash specified in the form
      const nativeScript: NativeScript = {
        type: "sig",
        keyHash: values.pubkeyHash
      }
      const forgingScript: ForgeScript = ForgeScript.fromNativeScript(nativeScript);

      // This prepares a transaction with the minting policy and the asset parameters
      tx.mintAsset(
        forgingScript,
        asset,
      );

      // It builds, signs and sends the transaction
      const unSignedTx = await tx.build();
      const signedTx = await wallet.signTx(unSignedTx);

      try {
        await wallet.submitTx(signedTx);
        alert(`${values.amount} ${values.tokenName} are minted! Congratulations!`);
      } catch (err) {
        alert(`Something went wrong!`);
      }

    }
  });

  return (
    <>
      <Head>
        <title>PPBL 2023 - Module 202</title>
        <meta
          name="description"
          content="Plutus Project-Based Learning from Gimbalabs"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Divider w="70%" mx="auto" pb="10" />
      <Box w={["100%", "70%"]} mx="auto" my="10">
        <Heading>PPBL 2023 - Module 202: Minting Cardano Tokens</Heading>
        <Text py="5" fontSize="xl">
          Welcome to the Module 202! In this page, you can create the code for
          minting with MeshJS.
        </Text>
        <Text py="5" fontSize="xl">
          If you would like build this starter on your own,{" "}
          <CLink
            href="https://gitlab.com/gimbalabs/ppbl-2023/ppbl-2023-front-end-starter/-/blob/main/docs/how-to-build.md"
            target="_blank"
          >
            an outline is provided here
          </CLink>
          .
        </Text>
        <Text pt="5" fontSize="xl">
          Now that you have it running, you can use this starter to complete the
          rest of the lessons in Module 202.
        </Text>
      </Box>  
      <Divider w="70%" mx="auto" />
      <Box
        w={{ base: "100%", md: "90%", lg: "70%" }}
        mx="auto"
        my="5"
        p="5"
        border="1px"
        borderRadius="md"
        h="60"
      >
        <Heading size="md" pb="3">
          Connect your wallet
        </Heading>
        <Flex>
          <CardanoWallet />
        </Flex>
      </Box>
      <Box
        w={{ base: "100%", md: "90%", lg: "70%" }}
        mx="auto"
        my="5"
        p="5"
        border="1px"
        borderRadius="md"
      >
        <Heading size="md" pb="3">
          Lesson 202.3: Minting a token using Mesh
        </Heading>
        <Box
          w={{ base: "100%", md: "90%", lg: "70%" }}
          mx="auto"
          my="5"
          p="5"
          border="1px"
          borderRadius="md"
        >
          <Heading size="md" pb="3">
            Lesson 202.2: Minting a token using Mesh
          </Heading>
          <Text pt="3">My address is {address}</Text>
          <Text pt="3">My pubkey hash is {pubkeyHash}</Text>

          <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <VStack gap={1} alignItems={"start"} mt={4}>
              <FormLabel>Pubkey hash</FormLabel>
              <Input type="text" name="pubkeyHash" value={formik.values.pubkeyHash} onChange={formik.handleChange} />
              <FormHelperText>This needs to be your pubkey hash!</FormHelperText>
              <FormLabel>Token name</FormLabel>
              <Input type="text" name="tokenName" value={formik.values.tokenName} onChange={formik.handleChange} />
              <FormLabel>Amount</FormLabel>
              <Input type="number" name="amount" value={formik.values.amount} onChange={formik.handleChange} />
              <FormLabel>Membership</FormLabel>
              <Input type="text" name="membership" value={formik.values.membership} onChange={formik.handleChange} />
              <Button type="submit">Mint!</Button>
            </VStack>
          </FormControl>
        </form>
        </Box>
      </Box>
      <Box
        w={{ base: "100%", md: "90%", lg: "70%" }}
        mx="auto"
        my="5"
        p="5"
        border="1px"
        borderRadius="md"
      >
        <Heading size="md" pb="3">
          Keep Exploring
        </Heading>
        <UnorderedList>
          <ListItem py="1" ml="5">
            <CLink
              href="https://nextjs.org/docs/basic-features/pages"
              target="_blank"
            >
              Learn about Pages in Next.js
            </CLink>
            . Add a new page to this project.
          </ListItem>
          <ListItem py="1" ml="5">
            <CLink
              href="https://chakra-ui.com/docs/styled-system/customize-theme"
              target="_blank"
            >
              Customize the theme
            </CLink>{" "}
            in _app.tsx. For example, try to change the colors for theme.dark
            and theme.light.
          </ListItem>
          <ListItem py="1" ml="5">
            Read the{" "}
            <CLink href="https://meshjs.dev/" target="_blank">
              Mesh documentation
            </CLink>
            . What do you want to build next?
          </ListItem>
        </UnorderedList>
        <Text pt="3">
          These are just a few suggestions. We will continue to build front-end
          components in Modules 203 through 204.
        </Text>
      </Box>
    </>
  );
}
