
# Catalog API
Esto es un proyecto de [Next.js](https://nextjs.org/) creado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Architectura
Este proyecto esta hecho con Next.js como framework de frontend y backend, y Supabase(con Vector Search) como base de datos principal, servicios como Resend para el envio de emails y OpenAI para generar embeddings y hacer busqueda semantica de productos.

## Endpoints
 - ```api/product``` endpoint encargado de guardar y hacer busquedas semanticas por medio de querys
 - ```api/reserve``` endpoint encargado de crear reservas y enviar emails de confirmacion

## Stack
- ### Frontend
  - React
  - Next.js
  - Shadcn/ui(components)
  - Tailwind
- ### Backend
  - Node.js
  - Supabase
  - OpenAI SDK
  - Vercel(deployments)

## Esquema Base De Datos
![image](https://github.com/alejandrabarriost/catalog/assets/93233927/349de9a0-267e-44be-a855-7fb755edf63c)



