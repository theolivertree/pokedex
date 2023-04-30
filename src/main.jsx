import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MainSearch from './pages/MainSearch'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MainSearch />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)

queryClient.invalidateQueries({queryKey: ["PokeInfoFetch", "PokeInfo2Fetch", "evolutionChain"]})