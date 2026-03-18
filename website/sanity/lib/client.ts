import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'nh4udqvm'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = projectId
  ? createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: true })
  : null

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sanityFetch<T = any>(query: string): Promise<T[]> {
  if (!client) return []
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (client as any).fetch(query)
    return Array.isArray(result) ? result : result ? [result] : []
  } catch {
    return []
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sanityFetchOne<T = any>(query: string, params: Record<string, string>): Promise<T | null> {
  if (!client) return null
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (client as any).fetch(query, params)
    return result || null
  } catch {
    return null
  }
}
