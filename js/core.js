import {seed} from './data.js';
const K='mesavista_demo_v1',S='mesavista_session_v1',C='mesavista_cart_v1';
export const $=(q,root=document)=>root.querySelector(q), $$=(q,root=document)=>[...root.querySelectorAll(q)];
export function db(){let d;try{d=JSON.parse(localStorage.getItem(K)||'null')}catch{} if(!d){d=structuredClone(seed);save(d)}return d}
export function save(d){localStorage.setItem(K,JSON.stringify(d));window.dispatchEvent(new Event('mesavista:updated'));return d}
export function update(fn){const d=db();fn(d);return save(d)}
export const money=n=>`Bs ${Number(n||0).toFixed(2)}`;
export const safe=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
export const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
export const pickRestaurant=id=>db().restaurants.find(r=>r.id===id)||db().restaurants[0];
export const getRestaurantId=()=>new URLSearchParams(location.search).get('r')||localStorage.getItem('mesavista_restaurant')||'rest-1';
export const setRestaurantId=id=>localStorage.setItem('mesavista_restaurant',id);
export const productImg=p=>p.image||'assets/img/burger.svg';
export const itemImage=p=>`<img src="${safe(productImg(p))}" alt="${safe(p.name)}" loading="lazy">`;
export function session(){let v;try{v=JSON.parse(localStorage.getItem(S)||'null')}catch{}return v}
export function signin(user){localStorage.setItem(S,JSON.stringify({id:user.id,email:user.email,role:user.role,name:user.name,restaurantId:user.restaurantId||null}));}
export function signout(){localStorage.removeItem(S);location.href='login.html'}
export function requireRole(role){const s=session();if(!s||s.role!==role){const next=encodeURIComponent(location.pathname.split('/').pop()||'');location.replace('login.html?next='+next);return null}return s}
export function roleUrl(role){return role==='admin'?'admin.html':role==='restaurant'?'restaurante.html':'cliente.html'}
export function toast(message,type='success'){let t=$('#app-toast');if(!t){t=document.createElement('div');t.id='app-toast';t.className='toast hidden';t.setAttribute('role','status');document.body.append(t)}t.textContent=message;t.className='toast'+(type==='error'?' error':'');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.add('hidden'),4600)}
export function alertIn(selector,message,type='success'){const el=$(selector);if(el){el.className='alert '+(type==='error'?'error':type==='info'?'info':'');el.textContent=message;el.hidden=false;}return el}
export const showError=(input,msg)=>{const fld=input.closest('.field');if(fld){fld.classList.add('invalid');const e=$('.error',fld);if(e)e.textContent=msg}input.setAttribute('aria-invalid','true')};
export const clearErrors=form=>{$$('.field',form).forEach(f=>{f.classList.remove('invalid');const e=$('.error',f);if(e)e.textContent='';const i=$('input,select,textarea',f);if(i)i.removeAttribute('aria-invalid')})};
export function cart(){let a;try{a=JSON.parse(localStorage.getItem(C)||'[]')}catch{}return Array.isArray(a)?a:[]}
export const saveCart=a=>{localStorage.setItem(C,JSON.stringify(a));refreshHeader();return a};
export function addCart(p,quantity=1,restaurantId=getRestaurantId()){let a=cart();if(a.length&&a[0].restaurantId!==restaurantId){a=[];toast('El carrito anterior se vació al cambiar de restaurante.')};let row=a.find(x=>x.id===p.id);if(row)row.quantity+=quantity;else a.push({id:p.id,restaurantId,quantity});saveCart(a);toast('Producto agregado al carrito.');}
export const cartCount=()=>cart().reduce((t,x)=>t+x.quantity,0);
export function refreshHeader(){const b=$('#cart-count');if(b)b.textContent=cartCount();const s=session();const acc=$('#my-account');if(acc){acc.textContent=s?'Mi panel':'Ingresar';acc.href=s?roleUrl(s.role):'login.html'}}
export function initShell(){const toggle=$('#nav-toggle'),links=$('#nav-links');toggle?.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});$('#logout')?.addEventListener('click',signout);refreshHeader();const year=$('#year');if(year)year.textContent=new Date().getFullYear();}
export function tableEmpty(msg='No hay registros todavía.'){return `<div class="empty"><div class="emoji">☕</div><p>${safe(msg)}</p></div>`}
export function orderTotal(order){return order.items.reduce((n,x)=>n+(x.price*x.quantity),0)}
export const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
document.addEventListener('DOMContentLoaded',initShell);
