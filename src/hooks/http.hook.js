import { useState, useCallback } from 'react'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  // loadingScroll: false,
  const [error, setError] = useState(null)

  const request = useCallback(
    async (
      url,
      method = 'GET',
      body = null,
      headers = { 'Content-Type': 'appication/json' }
    ) => {
      setLoading(true)

      try {
        const res = await fetch(url, { method, body, headers })

        if (!res.ok) {
          throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        const data = await res.json()
        setLoading(false)
        return data // чистые данные
      } catch (e) {
        setLoading(false)
        setError(e.message) // charInfo - ошибка остаётся на всегда когда компонента нету и создаём функцию ниже!
        throw e
      }
    },
    []
  )

  const clearError = useCallback(() => setError(null), []) // когда персонажа не существует, возращем null что переключать дальще

  return { loading, request, error, clearError }
}
