import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Router/Router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
          <RouterProvider router={Router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
