// store/useCounterStore.ts
import { create } from "zustand";
import { ProductDataType } from "@pages/website/product/table";
type ProductState = {
  productdata: ProductDataType[];
  setproductdata: (data: ProductDataType[]) => void;
};

export const useProductStore = create<ProductState>((set) => ({
  productdata: [],
  // 更新产品
  setproductdata: (data: ProductDataType[]) => {
    set({ productdata: [...data] });
  },
}));
