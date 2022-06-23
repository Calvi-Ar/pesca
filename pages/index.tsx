import React from 'react';

import { GetStaticProps } from "next";
import { Product } from "../product/types";
import api from '../product/api';
import { Grid, Stack, Text } from '@chakra-ui/react';


interface Props {
  products: Product[];
}
const IndexRouter: React.FC<Props> = ({products}) => {
  return (

    <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
    {products.map((product) => (
      <Stack backgroundColor="red.200" key={product.id}>
        <Text w={10} h={10}>{product.title}</Text>
      </Stack>
      ))}
  </Grid>
    
  // <div>{JSON.stringify(products)}</div>   DESCOMENTAR ESTO Y COMENTAR LO DE ARRRIBA
  );
};

export const getStaticProps: GetStaticProps = async () => {

  const products = await api.list();

  return {

    props: {
      products,
    },
    revalidate: 10
  };
};

export default IndexRouter;
