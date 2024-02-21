"use client"
import { useEffect, useState } from 'react'
export default function useServerFetchData(fetchFn) {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchFn().then(setData)
  }, [fetchFn])

  return data
}