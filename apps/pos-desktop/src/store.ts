// # Cấu hình Redux Toolkit cho POS + persist localStorage (demo)
import { configureStore, createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type Product = { id:string; sku:string; name:string; price:number; taxRate:number; barcode?:string };
export type CartLine = { id:string; name:string; qty:number; price:number; taxRate:number };

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:4000';

// --- Products slice
export const fetchProducts = createAsyncThunk<Product[]>('products/fetch', async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
});

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [] as Product[], loading: false },
  reducers: {},
  extraReducers: b => {
    b.addCase(fetchProducts.pending, s => { s.loading = true; });
    b.addCase(fetchProducts.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; });
    b.addCase(fetchProducts.rejected, s => { s.loading = false; });
  }
});

// --- Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: { lines: [] as CartLine[] },
  reducers: {
    add(state, action: PayloadAction<CartLine>) {
      const found = state.lines.find(l => l.id === action.payload.id);
      if (found) found.qty += action.payload.qty;
      else state.lines.push(action.payload);
    },
    inc(state, action: PayloadAction<string>) {
      const found = state.lines.find(l => l.id === action.payload);
      if (found) found.qty++;
    },
    dec(state, action: PayloadAction<string>) {
      const found = state.lines.find(l => l.id === action.payload);
      if (found) { found.qty--; if (found.qty <= 0) state.lines = state.lines.filter(l => l.id !== action.payload); }
    },
    clear(state){ state.lines = []; }
  }
});

export const { add, inc, dec, clear } = cartSlice.actions;

// --- Store + persist
function load() {
  try { const raw = localStorage.getItem('malan-pos'); return raw ? JSON.parse(raw) : undefined; } catch { return undefined; }
}
function save(state: any) {
  try { localStorage.setItem('malan-pos', JSON.stringify({ cart: state.cart })); } catch {}
}

export const store = configureStore({
  reducer: { products: productsSlice.reducer, cart: cartSlice.reducer },
  preloadedState: load(),
  middleware: gDM => gDM({ serializableCheck:false })
});
store.subscribe(() => save(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
