// pages/_app.js
import React from 'react';
import { ChakraProvider, Divider, Box, Container, VStack, Image, Text, Heading, Stack } from '@chakra-ui/react';
import {AppProps} from "next/app";



import theme from "../theme";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme} >
      <Box padding={4} justifyItems={"center"} alignItems={"center"}>
        <Container  borderRadius={"sm"} backgroundColor={"white"} boxShadow={"md"} marginY={4} maxW={"container.xl"} padding={4}>
          <VStack marginBottom={6}>
            <Stack marginLeft={13} >
            <Image borderRadius={9999} src="https://i.ibb.co/YybqGKS/logo.png" alt="Logo"></Image>
            </Stack>
            <Heading>Pedidos</Heading>
            {/* <Text>Pedidos</Text> */}
          </VStack>
          <Divider marginY={6}/>
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App
