import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes.jsx'
import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AppRoutes />
      <ToastContainer />
    </Router>
  </StrictMode>,
)
