import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import StudentProvider from './StudentProvider.tsx'
import AuthProvider from './AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Auth comes first */}
        <StudentProvider>
          <App />
        </StudentProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
