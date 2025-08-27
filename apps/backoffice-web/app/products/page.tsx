// # List sản phẩm từ API + nhúng AddForm
import AddForm from './AddForm';

export default async function ProductsPage(){
  const apiUrl = process.env.API_URL || 'http://localhost:4000';
  const res = await fetch(`${apiUrl}/products`, { cache: 'no-store' });
  const items = await res.json();

  return (
    <main style={{padding:24, display:'grid', gap:16}}>
      <h1 style={{fontSize:24, fontWeight:700}}>Products</h1>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
        <div>
          <div style={{fontWeight:600, marginBottom:8}}>List</div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12}}>
            {items.map((p:any)=> (
              <div key={p.id} style={{border:'1px solid #eee', borderRadius:12, padding:12}}>
                <div style={{fontWeight:600}}>{p.name}</div>
                <div>${Number(p.price).toFixed(2)} — GST {Number(p.taxRate).toFixed(0)}%</div>
                <div style={{fontSize:12, opacity:.7}}>SKU: {p.sku}</div>
                {p.barcode && <div style={{fontSize:12, opacity:.7}}>Barcode: {p.barcode}</div>}
              </div>
            ))}
          </div>
        </div>

        <AddForm apiUrl={apiUrl} />
      </div>
    </main>
  );
}
