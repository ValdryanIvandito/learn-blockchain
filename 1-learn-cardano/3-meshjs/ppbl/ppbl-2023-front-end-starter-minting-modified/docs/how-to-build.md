# How to build the PPBL 2023 Front End Starter:

> Results of this guide: [PPBL 2023 Front End Starter on GitLab](https://gitlab.com/gimbalabs/ppbl-2023/ppbl-2023-front-end-starter)

## Note to Students:

If you are brand new to front-end development, take your time getting started. There will be a lot of new ideas in this module. Here, our goal is to give you a high-level view of how to build a front-end. We will not cover all necessary pre-requisites. Instead, we will share links to great existing documentation and look forward to live coding sessions.

## Prerequisites

- [Node.js](https://nodejs.dev/en/): This guide shows you how to install **Node Version Manager** aka `nvm`. Then, it shows how to use `nvm` to install `node` and `npm`.
- [Node Package Manager (npm)](https://nodejs.dev/en/learn/an-introduction-to-the-npm-package-manager/) comes installed with Node.js.
- An alternative package manager is [Yarn](https://yarnpkg.com/getting-started).

## Step by Step

### 1. Create a new Next Project
[Follow this Guide](https://nextjs.org/docs/getting-started). This template is made with TypeScript, so you can create it using your favoured package manager with:

```bash
# npm
npx create-next-app@latest --typescript
# yarn
yarn create next-app --typescript
```

**Template Settings:**

```bash
✔ What is your project named? … ppbl-2023-front-end-starter
✔ Would you like to use ESLint with this project? … Yes
✔ Would you like to use `src/` directory with this project? … Yes
✔ Would you like to use experimental `app/` directory with this project? … No
✔ What import alias would you like configured? … @
```
_from here on we show the `yarn` commands, but continue with npm/npx if you started with it_


### 2. [Add Mesh to your Next Project](https://meshjs.dev/guides/nextjs)

- Follow this Guide: [Start a Web3 app on Next.js from Mesh](https://meshjs.dev/guides/nextjs).
- We already set up Next.js above. Skip to the "Setup Mesh" step.
- If you are using `yarn`, be sure continue to use it in place of `npm`. Note that `yarn add` is the equivalent of `npm install`.

#### When you are done:
- **added new packages to your NextJS project**
- **edited next.config.js**
- **added a Provider to \_app.tsx**.
- Ok the `getAssets` part was pretty cool too...


### 3. Add ChakraUI
> [For full details, follow these docs](https://chakra-ui.com/getting-started/nextjs-guide)

**Quick Add**
```bash
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

Chakra provides a set of simple components for styling a React app. Please note that this is optional, and there are many other great styling libraries.

In this template, all styles provided by NextJS have been removed. This means:
- All files in `/src/styles` have been removed
- All style imports in `/src/pages/_app.tsx` and `/src/pages/index.tsx` have been removed

After completing steps 1-3, adding Chakra styles, and changing some text, `/src/pages/index.tsx` looks like this:
```typescript


```

### 4. Add Apollo for GraphQL

> [To learn about Apollo Client, follow these docs](https://www.apollographql.com/docs/react/get-started)

Apollo Client allows us to use GraphQL across our application. To learn more, see Module 201 of the PPBL 2023 Course (to be released on 2023-04-03).


#### 4a. Install Packages:
```bash
yarn add @apollo/client graphql
```

#### 4b. Use [`ApolloProvider`](https://www.apollographql.com/docs/react/api/react/hooks/)
1. In root director, create an `apollo-client.ts` file that looks like this:
```typescript
import { ApolloClient, InMemoryCache } from "@apollo/client";

// To work with other networks, change the uri to any Dandelion GraphQL instance:
const client = new ApolloClient({
    uri: "https://graphql-api.iohk-preprod.dandelion.link/",
    cache: new InMemoryCache(),
});

export default client;
```
2. Add `ApolloProvider` to `src/pages/_app.tsx`. After completings steps 1 through 4, `_app.tsx` looks like this:
```typescript
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </MeshProvider>
  );
}

export default MyApp;
```
---

### 6. Add Optional Packages

> You will find these packages in later branches of the template. They are optional:

```json
{
    ...
    "dependencies": {
        ...
        "@fontsource/work-sans": "^4.5.14",
        "axios": "^1.3.2",
        "formik": "^2.2.9",
        "framer-motion": "^9.0.1",
        "graphql-request": "^5.1.0",
        ...
    }
}
```

#### [Axios](https://axios-http.com/)
> "Axios is a simple promise based HTTP client for the browser and node.js. Axios provides a simple to use library in a small package with a very extensible interface."

#### [FontSource](https://fontsource.org/)
> "Open Source fonts in neatly bundled NPM packages."

#### [Formik](https://formik.org/)
> "Formik is the world's most popular open source form library for React and React Native."

#### [Framer Motion](https://www.framer.com/motion/)
> "A production-ready motion library for React."

#### [GraphQL Request](https://github.com/jasonkuhrt/graphql-request)
> "Minimal GraphQL client supporting Node and browsers for scripts or simple apps"