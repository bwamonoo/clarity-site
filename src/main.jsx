import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// CSS imports in ITCSS order
import './styles/settings/_variables.css'
import './styles/settings/_colors.css'
import './styles/tools/_animations.css'
import './styles/tools/_mixins.css'
import './styles/generic/_reset.css'
import './styles/generic/_base.css'
import './styles/elements/_typography.css'
import './styles/elements/_forms.css'
import './styles/objects/_layout.css'
import './styles/components/_buttons.css'
import './styles/components/_header.css'
import './styles/components/_footer.css'
import './styles/components/_cards.css'
import './styles/pages/_home.css'
import './styles/pages/_services.css'
import './styles/pages/_appointments.css'
import './styles/pages/_admin.css'
import './styles/utilities/_spacing.css'
import './styles/utilities/_display.css'
import './styles/utilities/_utilities.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)