import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryProvider } from './providers/QueryProvider.tsx'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    {/* WHEN RUNNING 'npm run build' FOR cPANEL */}
    {/* <BrowserRouter basename="/todo-v3"> */}
      <QueryProvider>
        <App />
        <ToastContainer />
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>,
)
