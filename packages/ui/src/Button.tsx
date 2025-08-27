// # Nút chia sẻ giữa các app
import React from 'react';
export function Button({children, ...rest}: React.ButtonHTMLAttributes<HTMLButtonElement>){
return <button {...rest} style={{padding:'10px 16px', borderRadius:12, border:'1px solid #ddd'}}>{children}</button>;
}