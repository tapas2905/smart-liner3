export interface ProductListInterface {
  sku_id: string | null;
  sku: string | null;
  year_start: string | null;
  year_end: string | null;
  make: string | null;
  model: string;
  inventory_quantity: number;
  main_wb: string | null;
  cost_avg: number | null;
}
