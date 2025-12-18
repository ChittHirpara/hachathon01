import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { KnowledgeProvider } from './context/KnowledgeContext.tsx' // <--- 1. Import this

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <KnowledgeProvider> {/* <--- 2. Wrap this around App */}
      <App />
    </KnowledgeProvider>
  </React.StrictMode>,
)