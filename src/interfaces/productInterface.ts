export interface ProductListInterface {
  skuId: string | null;
  sku: string | null;
  yearStart: string | null;
  yearEnd: string | null;
  make: string | null;
  model: string;
  inventoryQuantity: number;
  mainWb: string | null;
  costAvg: number | null;
  discountedPrice: number | null;
}
