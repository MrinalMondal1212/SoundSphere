import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--color-surface, #1e1e2e)',
            color: 'var(--color-text, #fff)',
            border: '1px solid var(--color-border, #333)',
          },
          success: { iconTheme: { primary: '#ee10b0', secondary: '#fff' } },
        }}
      />
      <App />
    </Provider>
  </StrictMode>,
)
