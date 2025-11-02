import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes.jsx'
import { ToastContainer, toast } from 'react-toastify';
import { Provider } from "react-redux"
import store from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <AppRoutes />
        <ToastContainer />
      </Router>
    </Provider>

  </StrictMode>,
)
