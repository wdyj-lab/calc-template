export type AnymouseCartType = {
  _id?: string;
  product: string;
  variant: string;
  quantity: number;
  shippingMethod: string;
  bundleItems: []; // TODO: 추가구매상품 추후 구현 필요
};
