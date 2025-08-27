// apps/pos-desktop/src/slices/cartSlice.ts
// # Thêm/xoá item, tính tổng theo core/pricing
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotals } from '@core/pricing';


export type CartLine = { id:string; name:string; price:number; taxRate:number; qty:number };


const initialState = { lines: [] as CartLine[], payMethod: 'CASH' as 'CASH'|'CARD' };


const cartSlice = createSlice({
name: 'cart',
initialState,
reducers: {
addLine(s, a:PayloadAction<CartLine>) { s.lines.push(a.payload); },
removeLine(s, a:PayloadAction<string>) { s.lines = s.lines.filter(l => l.id!==a.payload); },
setPayMethod(s, a:PayloadAction<'CASH'|'CARD'>) { s.payMethod = a.payload; },
clear(s){ s.lines = []; }
}
});


export const { addLine, removeLine, setPayMethod, clear } = cartSlice.actions;
export const selectTotals = (s:{cart:typeof initialState}) => calcTotals(s.cart.lines, s.cart.payMethod);
export default cartSlice.reducer;