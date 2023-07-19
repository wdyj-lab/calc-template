export type AnymouseOrderType = {
  _id?: string;
  product: string;
  variant: string;
  quantity: number;
  bundleItems: []; // TODO: 추가구매상품 추후 구현 필요
};
