// # Kiểu dữ liệu dùng chung
export type Product = { id:string; sku:string; name:string; price:number; taxRate:number; barcode?:string };
export type CartLine = { id:string; productId:string; name:string; qty:number; price:number; taxRate:number };
export type PaymentMethod = 'CASH'|'CARD'|'OTHER';