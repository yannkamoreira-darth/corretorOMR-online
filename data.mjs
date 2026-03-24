import { getStore } from '@netlify/blobs'

const STORE_NAME = 'omr-app-data'
const STATE_KEY = 'app-state'

export default async (req) => {
  const store = getStore({ name: STORE_NAME, consistency: 'strong' })

  if (req.method === 'GET') {
    const state = await store.get(STATE_KEY, { type: 'json' })
    if (!state) {
      return Response.json({ classes: [], students: [], gabaritos: [], corrections: [] })
    }
    return Response.json(state)
  }

  if (req.method === 'PUT') {
    const body = await req.json()
    await store.setJSON(STATE_KEY, body)
    return Response.json({ ok: true })
  }

  return new Response('Method not allowed', { status: 405 })
}

export const config = {
  path: '/api/data',
}
