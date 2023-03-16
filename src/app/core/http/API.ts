export const Routes: { [key: string]: any } = {
  allProducts: 'https://fakestoreapi.com/products',
  singleProduct: (productId: string) =>
    `https://fakestoreapi.com/products/${productId}`,
};
