# MesaVista · Proyecto SaaS gastronómico (demostración académica)

**12 páginas HTML independientes + CSS + JavaScript + 3 archivos GLB 3D.**

## Qué incluye

- `index.html`: landing page con problema, propuesta de valor, público objetivo, beneficios, prototipo, planes y formulario beta.
- `beta.html`: formulario separado, con validaciones y mensajes de éxito/error.
- `login.html` / `registro.html`: acceso y creación de cuentas de cliente **de demostración**.
- `menu.html` / `plato.html` / `carrito.html`: experiencia pública de menú, detalle con vista 3D y AR según compatibilidad, carrito y pedido prellenado para WhatsApp.
- `cliente.html`: panel de cliente e historial de intentos de pedido.
- `restaurante.html`: panel de restaurante, CRUD básico de platos, disponibilidad, estados de pedidos y WhatsApp.
- `admin.html`: panel de administrador del SaaS, restaurantes, estado, planes y registros beta locales.
- `planes.html` / `ayuda.html`: propuestas de precio, términos orientativos y privacidad.
- `assets/models/`: **3 modelos 3D GLB originales de demostración** (hamburguesa, pizza y cupcake).
- `supabase/beta-registro.sql`: tabla y políticas para almacenar nuevas inscripciones beta de manera opcional.

## Ejecutar

Abrir la carpeta desde VS Code y ejecutar con **Live Server**; o desde la raíz ejecutar:

```sh
python -m http.server 8000
```

Abrir http://localhost:8000/index.html. El visor 3D carga `model-viewer` desde `unpkg.com`; necesita conexión a internet. Para la realidad aumentada puede necesitar HTTPS y un dispositivo compatible. Para desarrollo/producción, no abrir por `file://` porque puede impedir la carga de módulos y modelos.

## Cuentas demostrativas

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Administrador general | `admin@mesavista.demo` | `Demo1234!` |
| Restaurante | `restaurante@mesavista.demo` | `Demo1234!` |
| Cliente | `cliente@mesavista.demo` | `Demo1234!` |

También se puede crear una cuenta local de cliente desde `registro.html`.

## Configurar WhatsApp del restaurante

1. Entrar como restaurante a `restaurante.html`.
2. Abrir la pestaña **Configuración**.
3. Registrar número real de WhatsApp en Bolivia (8 dígitos, o 591 + 8 dígitos).
4. Guardar. Desde `menu.html` se pueden agregar productos y preparar un pedido.
5. En `carrito.html`, pulsar **Preparar pedido en WhatsApp**. El usuario debe enviar el mensaje en WhatsApp y el restaurante confirmar la solicitud. Un clic no confirma la venta.

## Conectar la inscripción beta a Supabase (opcional)

1. Crear un proyecto de Supabase.
2. En SQL Editor, ejecutar el archivo `supabase/beta-registro.sql`.
3. En `js/config.js`, pegar `SUPABASE_URL` y `SUPABASE_ANON_KEY` (usar preferentemente la clave pública `sb_publishable_...`; **nunca** `service_role` ni `sb_secret_...`). El nombre de la variable se conserva por compatibilidad con el prototipo. El formulario envía la clave en el encabezado `apikey`, de acuerdo con el formato moderno de Supabase.
4. Abrir `beta.html` y probar con datos de prueba. Las inscripciones se insertarán en `public.beta_registros`.
5. Para revisar las inscripciones, usar Supabase Dashboard > Table Editor con una cuenta autorizada. El `admin.html` local **no** muestra automáticamente los registros remotos, por razones de permisos.

Antes de abrir el formulario al público: añadir verificación antispam/CAPTCHA, rate limiting, consentimiento y política de privacidad definitiva, canal de eliminación de datos y medidas operativas de seguridad. Mantener RLS activado y revisar las políticas.

## Publicar en GitHub + Vercel

1. Subir **todo el contenido de la carpeta** a un repositorio, manteniendo la jerarquía de rutas.
2. En Vercel, importar el repositorio como sitio estático (sin framework ni build command).
3. La raíz servirá `index.html`.
4. Si configuras Supabase, volver a publicar el proyecto tras completar `js/config.js`.

## Importante: alcance de seguridad

**Este proyecto es un MVP de interfaz, no un SaaS multiusuario listo para producción.** Todos los usuarios, contraseñas DEMO, pedidos, restaurantes, configuraciones, estadísticas e inicios de sesión se guardan en `localStorage` del navegador. Los datos NO se sincronizan entre equipos y las restricciones de roles del frontend NO son una barrera de seguridad real. No debes introducir contraseñas reales ni datos privados. Para implementar un producto real, conecta autenticación segura (p. ej. Supabase Auth), base de datos PostgreSQL con RLS por restaurante, backend validado, almacenamiento, pagos, protección de datos y gestión confiable de pedidos.

Los planes Bs 99, 199 y 349 son precios académicos propuestos, no cobros activados. La visualización de porciones en AR es ilustrativa, no una medida precisa.

## Cambiar el nombre

**MesaVista** es provisional porque la solicitud dejó el nombre de la aplicación en blanco. Puedes sustituirlo en archivos HTML, textos e imágenes identificativos.
