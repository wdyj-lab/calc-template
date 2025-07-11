import MyungsungAcrylicType from "@/lib/constant/MyungsungAcrylicType";
import MyungsungSkashiType from "@/lib/constant/MyungsungSkashiType";
import { EstimateData } from "@/lib/firestore";

export default class Estimate {
  private name:
    | keyof typeof MyungsungAcrylicType
    | keyof typeof MyungsungSkashiType;
  private color: string | undefined;
  private size: string;
  private quantity: number;
  public price: number;
  private postProcessing: string;
  public postProcessingPrice: number;

  constructor(
    name: keyof typeof MyungsungAcrylicType | keyof typeof MyungsungSkashiType,
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
    if (this.name in MyungsungSkashiType) {
      return MyungsungSkashiType[
        this.name as keyof typeof MyungsungSkashiType
      ].toString();
    } else if (this.name in MyungsungAcrylicType) {
      return MyungsungAcrylicType[
        this.name as keyof typeof MyungsungAcrylicType
      ].toString();
    } else {
      return this.name.toString();
    }
  }

  public get formattedQuantity() {
    return `${this.quantity.toLocaleString()}개`;
  }

  public get formattedLetterQuantity() {
    return `${this.quantity.toLocaleString()}자`;
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

  public get toEstimateDate(): EstimateData {
    return {
      code: "",
      type: this.formattedName,
      color: this.color ?? "없음",
      size: this.size,
      quantity: this.quantity,
      price: this.price,
      postProcessing: this.postProcessing,
      postProcessingPrice: this.postProcessingPrice,
      totalPrice: this.price + this.postProcessingPrice,
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      completed: false,
    };
  }
}
