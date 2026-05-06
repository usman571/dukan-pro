import { create } from 'zustand';
import type { SaleItem } from '../api/types';

export type CartItem = SaleItem;

interface CartState {
  items: CartItem[];
  paymentMode: 'cash' | 'udhaar';
  customerId: number | null;
  customerName: string | null;
  addItem: (product: { id: number; name: string; sellPrice: number; buyPrice: number }) => void;
  removeItem: (productId: number) => void;
  incrementQty: (productId: number) => void;
  decrementQty: (productId: number) => void;
  setPaymentMode: (mode: 'cash' | 'udhaar') => void;
  setCustomer: (id: number | null, name: string | null) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  paymentMode: 'cash',
  customerId: null,
  customerName: null,

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.productId === product.id);
      if (existing) {
        return {
          items: state.items.map((i) => (i.productId === product.id ? { ...i, qty: i.qty + 1 } : i))
        };
      }
      return {
        items: [
          ...state.items,
          {
            productId: product.id,
            productName: product.name,
            qty: 1,
            sellPrice: product.sellPrice,
            buyPrice: product.buyPrice
          }
        ]
      };
    }),

  removeItem: (productId) =>
    set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),

  incrementQty: (productId) =>
    set((state) => ({
      items: state.items.map((i) => (i.productId === productId ? { ...i, qty: i.qty + 1 } : i))
    })),

  decrementQty: (productId) =>
    set((state) => {
      const item = state.items.find((i) => i.productId === productId);
      if (!item) return state;
      if (item.qty <= 1) {
        return { items: state.items.filter((i) => i.productId !== productId) };
      }
      return {
        items: state.items.map((i) => (i.productId === productId ? { ...i, qty: i.qty - 1 } : i))
      };
    }),

  setPaymentMode: (mode) => set({ paymentMode: mode }),
  setCustomer: (id, name) => set({ customerId: id, customerName: name }),
  clearCart: () => set({ items: [], paymentMode: 'cash', customerId: null, customerName: null })
}));
