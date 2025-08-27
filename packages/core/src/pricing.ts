// # Tính thuế GST 10%, cash rounding 5¢ khi trả CASH
export function calcTotals(lines: {qty:number, price:number, taxRate:number}[], payMethod: 'CASH'|'CARD') {
const round2 = (n:number) => Math.round(n * 100) / 100;
const subtotal = lines.reduce((s,l)=> s + l.qty*l.price, 0);
const tax = lines.reduce((s,l)=> s + l.qty*l.price*(l.taxRate/100), 0);
let total = round2(subtotal + tax);
let cashRounding = 0;
if (payMethod === 'CASH') {
const rounded = Math.round(total / 0.05) * 0.05; // làm tròn 0.05
cashRounding = round2(rounded - total);
total = round2(rounded);
}
return { subtotal: round2(subtotal), tax: round2(tax), total, cashRounding };
}