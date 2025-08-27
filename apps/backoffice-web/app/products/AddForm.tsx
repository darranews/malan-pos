'use client';
// # Form thêm sản phẩm nhanh (POST tới API_URL/products)
import React, { useState } from 'react';

type Props = { apiUrl: string };

export default function AddForm({ apiUrl }: Props) {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('6.50');
  const [taxRate, setTaxRate] = useState('10');
  const [barcode, setBarcode] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = { sku, name, price: Number(price), taxRate: Number(taxRate), barcode: barcode || undefined };
    const res = await fetch(`${apiUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const t = await res.text();
      alert('Create failed: ' + t);
      return;
    }
    // # Reload để thấy item mới
    window.location.reload();
  }

  return (
    <form onSubmit={onSubmit} style={{display:'grid', gap:8, border:'1px solid #eee', padding:12, borderRadius:12}}>
      <div style={{fontWeight:600}}>Add Product</div>
      <input placeholder="SKU" value={sku} onChange={e=>setSku(e.target.value)} required />
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
      <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} required />
      <input placeholder="TaxRate %" value={taxRate} onChange={e=>setTaxRate(e.target.value)} required />
      <input placeholder="Barcode (optional)" value={barcode} onChange={e=>setBarcode(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
}
