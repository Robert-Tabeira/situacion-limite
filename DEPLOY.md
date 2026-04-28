# Situación Límite — Guía de Deploy

## 1. Supabase

1. Crear proyecto en https://supabase.com
2. Ir a **SQL Editor** → pegar el contenido de `supabase/schema.sql` → ejecutar
3. Ir a **Settings → API** → copiar:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_KEY`

## 2. Anthropic

1. Ir a https://console.anthropic.com → API Keys → copiar la key
   - → `ANTHROPIC_API_KEY`

## 3. Vercel

1. Subir el proyecto a GitHub:
   ```bash
   git init
   git add .
   git commit -m "initial"
   git remote add origin https://github.com/TU_USER/situacion-limite.git
   git push -u origin main
   ```

2. En https://vercel.com → New Project → importar el repo

3. En **Environment Variables** agregar:
   ```
   SUPABASE_URL                 = https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_URL     = https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ...
   SUPABASE_SERVICE_KEY         = eyJ...
   NEXT_PUBLIC_APP_URL          = https://tu-app.vercel.app
   ENABLE_AI_CARDS              = false
   ```

   Si luego quieres volver a usar cartas generadas por IA:
   ```
   ENABLE_AI_CARDS              = true
   ANTHROPIC_API_KEY            = sk-ant-...
   ```

4. Deploy → listo!

## Cómo jugar

1. El host entra, crea sala, elige meta de puntos (5/10/20)
2. Comparte el código de 5 letras a los demás
3. Todos se unen con su nombre
4. Host presiona "Iniciar partida"
5. El juego elige aleatoriamente quién es el **centro** cada ronda
6. El centro elige su respuesta en secreto
7. Los demás adivinan viendo las opciones de los otros en tiempo real
8. Al confirmar todos → se revela la respuesta y se dan puntos
9. El turno de centro rota por todos los jugadores en orden
10. Gana quien llega primero a la meta de puntos
