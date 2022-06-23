import React from 'react';
import { GetStaticProps } from "next";
import { Button, Grid, Link, Stack, Text, Flex, Image } from '@chakra-ui/react';
import { Product } from "../product/types";
import api from '../product/api';



interface Props {
  products: Product[];
}


function parseCurrency(value: number): string {
  return value.toLocaleString('es-Ar', {
    style: 'currency',
    currency: 'ARS',
  })
}

const IndexRoute: React.FC<Props> = ({products}) => {

  const [cart, setCart] = React.useState<Product[]>([]);
  
  const text = React.useMemo(
    () => 
    cart
    .reduce(
      (message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`),
       ``
       )
       .concat(`\nTotal: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0 ))}`),
   [cart],
   );
   

  return (

  <Stack spacing={6}>
    <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
    {products.map((product) => (
      <Stack spacing={3} borderRadius={"md"} padding={4} backgroundColor="gray.200" key={product.id}>

        <Image borderRadius={"md"} maxH={128} objectFit="cover" src={product.image} alt="product"/>

        <Stack spacing={1}>
          <Text>{product.title}</Text>
          <Text fontWeight={500} fontSize={"sm"} color={"green.500"}>{parseCurrency(product.price)}</Text>
        </Stack>

        <Button variant={"outline"} size={"sm"} onClick={() => setCart(cart => cart.concat(product))} colorScheme="primary">Agregar</Button>
      </Stack>
      ))}
  </Grid>
  {Boolean(cart.length) && (
    <Flex alignItems={"center"} justifyContent={"center"} position={"sticky"} bottom={4}>
    <Button padding={4} width={"fit-content"} isExternal as={Link} href={`https://wa.me/5491141414141?text=${encodeURIComponent(text)}`}  colorScheme={"whatsapp"}>
      Completar pedido({cart.length} productos)
    </Button>
    </Flex>
  )}
  </Stack> 
    
  );
};

export const getStaticProps: GetStaticProps = async () => {

  const products = await api.list();

  return {
    revalidate: 10,
    props: {
      products,
    },
    
  };
};

export default IndexRoute;
