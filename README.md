# Lechonería Los Reyes® — Sitio Web

Sitio web oficial de **Lechonería Los Reyes** (Villavicencio, Meta).
One-page estático servido con Node.js (sin dependencias), listo para Railway.

## Estructura

```
├── index.html        # Página principal
├── css/styles.css    # Estilos (identidad azul real + amarillo neón)
├── js/main.js        # Interacciones (reveal, contadores, tilt, galería, parallax)
├── statics/          # Logo, video hero y fotos de los platos
├── server.js         # Servidor estático Node (soporta Range para el video)
├── package.json      # Script de inicio
└── railway.json      # Configuración de despliegue en Railway
```

## Correr en local

```bash
npm start
# → http://localhost:3000
```

(No hay dependencias: no hace falta `npm install`.)

## Desplegar en Railway

**Opción A — desde GitHub (recomendada):**
1. Sube esta carpeta a un repositorio de GitHub.
2. En [railway.app](https://railway.app): **New Project → Deploy from GitHub repo** y selecciona el repo.
3. Railway detecta Node automáticamente y ejecuta `node server.js`.
4. En **Settings → Networking → Generate Domain** para obtener la URL pública.

**Opción B — con la CLI:**
```bash
npm i -g @railway/cli
railway login
railway init
railway up
railway domain
```

El servidor lee `process.env.PORT` (Railway lo inyecta automáticamente).

## Contacto del negocio

- WhatsApp/pedidos: 310 750 4876 · 313 295 2356
- Dirección: Calle 44 Sur # 31-01, Barrio El Triunfo, Villavicencio
- Instagram: [@losreyesgourmet](https://www.instagram.com/losreyesgourmet/)
