import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Redux Provider wraps the entire app so all components can access the store */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
