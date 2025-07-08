import MyungsungAcrylicType from "@/lib/constant/MyungsungAcrylicType";

export default class Estimate {
  private name: keyof typeof MyungsungAcrylicType;
  private color: string | undefined;
  private size: string;
  private quantity: number;
  public price: number;
  private postProcessing: string;
  public postProcessingPrice: number;

  constructor(
    name: keyof typeof MyungsungAcrylicType,
    color: string | undefined,
    size: string,
    quantity: number,
    price: number,
    postProcessing: string,
    postProcessingPrice: number
  ) {
    this.name = name;
    this.color = color;
    this.size = size;
    this.quantity = quantity;
    this.price = price;
    this.postProcessing = postProcessing;
    this.postProcessingPrice = postProcessingPrice;
  }

  public get code() {
    return `${this.name}-${this.color}-${this.size}`;
  }

  public get formattedName() {
    return MyungsungAcrylicType[this.name];
  }

  public get formattedQuantity() {
    return `${this.quantity.toLocaleString()}개`;
  }

  public get formattedPrice() {
    return `${this.price.toLocaleString()}원`;
  }

  public get formattedPostProcessingPrice() {
    return `${this.postProcessingPrice.toLocaleString()}원`;
  }

  public get formattedTotalPrice() {
    return `${(this.price + this.postProcessingPrice).toLocaleString()}원`;
  }
}
