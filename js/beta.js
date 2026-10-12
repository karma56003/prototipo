import {$,db,update,uid,clearErrors,showError,alertIn,safe,toast} from './core.js';
import {SUPABASE_URL,SUPABASE_ANON_KEY} from './config.js';
const form=$('#beta-form');
if(form){
 const params=new URLSearchParams(location.search);const pre=params.get('plan');if(pre&&$('#beta-plan'))$('#beta-plan').value=pre;
 form.addEventListener('submit',async e=>{
 e.preventDefault();clearErrors(form);$('#beta-result').hidden=true;
 const name=$('#beta-name'),business=$('#beta-business'),email=$('#beta-email'),phone=$('#beta-phone'),city=$('#beta-city'),type=$('#beta-type'),agreement=$('#beta-agree');
 let ok=true;const require=(el,condition,message)=>{if(!condition){showError(el,message);ok=false}};
 require(name,name.value.trim().length>=3,'Ingresa tu nombre (mínimo 3 caracteres).');
 require(business,business.value.trim().length>=2,'Escribe el nombre del restaurante.');
 require(email,/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()),'Escribe un correo electrónico válido.');
 require(phone,/^\d{8}$/.test(phone.value.replace(/[\s-]/g,'')),'Ingresa 8 dígitos del teléfono boliviano.');
 require(city,city.value.trim().length>=2,'Escribe una ciudad.');
 require(type,!!type.value,'Selecciona el tipo de negocio.');
 if(!agreement.checked){alertIn('#beta-result','Debes aceptar el tratamiento de los datos para inscribirte.','error');return}
 if(!ok){alertIn('#beta-result','Revisa los campos marcados e inténtalo nuevamente.','error');return}
 const entry={id:uid(),name:name.value.trim(),business:business.value.trim(),email:email.value.trim().toLowerCase(),phone:phone.value.replace(/[\s-]/g,''),city:city.value.trim(),type:type.value,plan:$('#beta-plan').value,date:new Date().toISOString(),status:'nuevo',consentimiento:true};
 if(db().beta.some(b=>b.email===entry.email)){alertIn('#beta-result','Este correo ya figura en la lista de espera de esta demostración.','error');return}
 const button=$('#beta-submit');button.disabled=true;button.textContent='Registrando…';
 try{
 let remote=false;
 if(SUPABASE_URL&&SUPABASE_ANON_KEY){const endpoint=SUPABASE_URL.replace(/\/$/,'')+'/rest/v1/beta_registros';const result=await fetch(endpoint,{method:'POST',headers:{apikey:SUPABASE_ANON_KEY,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({nombre:entry.name,restaurante:entry.business,correo:entry.email,telefono:entry.phone,ciudad:entry.city,tipo_negocio:entry.type,plan_interes:entry.plan,consentimiento_beta:true})});if(!result.ok){const response=await result.text();throw Error('Supabase: '+(result.status===409?'Ese correo ya está registrado.':response.slice(0,180)))}remote=true}
 update(d=>d.beta.push(entry));form.reset();alertIn('#beta-result',remote?'¡Inscripción enviada! Tus datos se guardaron en la base de datos. Te contactaremos cuando se abra la beta.':'¡Registro de demostración guardado! Este formulario almacena datos solo en este navegador. Para recibir inscripciones reales, configura Supabase como indica el README.');
 }catch(err){alertIn('#beta-result','No pudimos guardar el registro. '+err.message,'error')}finally{button.disabled=false;button.textContent='Quiero probar la beta →'}
 });
}
