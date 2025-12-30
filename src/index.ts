
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth } from './lib/auth'

import "dotenv/config"

const app = new Hono()

app.use("/*", cors({
  origin: ["http://localhost:1420"],
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true,
}))


app.get('/', (c) => {
  return c.text('Hello Blackstone Server!')
})


app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.post("/api/verify-license", async (c) => {
    const { key } = await c.req.json();

    const { valid, error } = await auth.api.verifyApiKey({ body: {key} });
    return c.json({ valid, error });
});

const port = parseInt(process.env.PORT!) || 3000;
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
