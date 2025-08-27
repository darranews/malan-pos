// # Hàng đợi đồng bộ offline → online (pseudo)
export async function flushQueue(apply: (m:any)=>Promise<void>, pending: any[]) {
for (const m of pending) {
try { await apply(m); } catch (e) { console.error('sync fail', e); }
}
}