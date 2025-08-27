// # Màn hình bán hàng: lấy products từ API, add vào giỏ, tính GST
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, add, inc, dec, type RootState, type Product } from './store';
import { calcTotals } from '@core/pricing';
import { Button } from '@ui/Button';

export default function App(){
  const dispatch = useDispatch<any>();
  const products = useSelector((s:RootState)=> s.products.items);
  const lines = useSelector((s:RootState)=> s.cart.lines);

  useEffect(()=> { dispatch(fetchProducts()); }, [dispatch]);

  const totals = useMemo(()=> calcTotals(lines as any, 'CASH'), [lines]);

  const addToCart = (p: Product) => {
    dispatch(add({ id: p.id, name: p.name, qty: 1, price: Number(p.price), taxRate: Number(p.taxRate) }));
  };

  return (
    <main style={{padding:24, display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
      <section>
        <h2 style={{marginBottom:8}}>Products</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12}}>
          {products.map(p=> (
            <button key={p.id} onClick={()=>addToCart(p)} style={{padding:12, border:'1px solid #eee', borderRadius:10, textAlign:'left'}}>
              <div style={{fontWeight:600}}>{p.name}</div>
              <div>${Number(p.price).toFixed(2)}</div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{marginBottom:8}}>Cart</h2>
        <ul>
          {lines.map(l=> (
            <li key={l.id}>
              {l.name} — ${l.price.toFixed(2)} x {l.qty}
              <button onClick={()=>dispatch(dec(l.id))} style={{marginLeft:8}}>-</button>
              <button onClick={()=>dispatch(inc(l.id))} style={{marginLeft:4}}>+</button>
            </li>
          ))}
        </ul>
        <div style={{marginTop:12}}>GST: ${totals.tax.toFixed(2)}</div>
        <div>Total: ${totals.total.toFixed(2)}</div>
        <Button onClick={()=> alert('Print coming soon')}>Print</Button>
      </section>
    </main>
  );
}
