import Head from "next/head";
import { Box, Divider, Link as CLink, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { ContributorComponent } from "@/src/components/ContributorComponent";
import { QueryComponent } from "@/src/components/QueryComponent";
import { CardanoWallet } from '@meshsdk/react';

export default function Home() {
  return (
    <>
      <Head>
        <title>PPBL 2023 Front End Starter</title>
        <meta name="description" content="Plutus Project-Based Learning from Gimbalabs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Divider w="70%" mx="auto" pb="10" />
      <Box w={["100%", "70%"]} mx="auto" my="10">
        <Heading>PPBL 2023 Front End Starter</Heading>
        <Text py="5" fontSize="xl">
          If you are viewing this project at http://localhost:3000, congratulations! You know enough about SLT
          201.1 to get started.
        </Text>
        <Text py="5" fontSize="xl">
          If you would like build this starter on your own, <CLink href="https://gitlab.com/gimbalabs/ppbl-2023/ppbl-2023-front-end-starter/-/blob/main/docs/how-to-build.md" target="_blank">an outline is provided here</CLink>.
        </Text>
        <Text pt="5" fontSize="xl">
          Now that you have it running, you can use this starter to complete the rest of the lessons in Module 201.
        </Text>
      </Box>
      <Divider w="70%" mx="auto" />
      <Box w={{ base: "100%", md: "90%", lg: "70%" }} mx="auto" my="5" p="5" border="1px" borderRadius="md">
        <Heading size="md" pb="3">
          Lesson 201.2: Add a Connect Wallet button here
        </Heading>
        <CardanoWallet />
      </Box>
      <Box w={{ base: "100%", md: "90%", lg: "70%" }} mx="auto" my="5" p="5" border="1px" borderRadius="md">
        <Heading size="md" pb="3">
          Lesson 201.3: Customize this component
        </Heading>
        <ContributorComponent />
      </Box>
      <Box w={{ base: "100%", md: "90%", lg: "70%" }} mx="auto" my="5" p="5" border="1px" borderRadius="md">
        <Heading size="md" pb="3">
          Lesson 201.4: Customize this component
        </Heading>
        <QueryComponent />
      </Box>
      <Box w={{ base: "100%", md: "90%", lg: "70%" }} mx="auto" my="5" p="5" border="1px" borderRadius="md">
        <Heading size="md" pb="3">
          Keep Exploring
        </Heading>
        <UnorderedList>
          <ListItem py="1" ml="5">
            <CLink href="https://nextjs.org/docs/basic-features/pages" target="_blank">
              Learn about Pages in Next.js
            </CLink>
            . Add a new page to this project.
          </ListItem>
          <ListItem py="1" ml="5">
            <CLink href="https://chakra-ui.com/docs/styled-system/customize-theme" target="_blank">
              Customize the theme
            </CLink>{" "}
            in _app.tsx. For example, try to change the colors for theme.dark and theme.light.
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
          These are just a few suggestions. We will continue to build front-end components in Modules 202 through 204.
        </Text>
      </Box>
    </>
  );
}
