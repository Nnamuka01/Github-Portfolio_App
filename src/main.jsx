import React from 'react'
import {createRoot} from 'react-dom/client'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import AppOutlet from './pages/AppOutlet.jsx'
import RepoDetails from './pages/Repodetails.jsx'
import ErrorBoundary from './pages/Errorboundary.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Home />}  errorElement={<ErrorPage />} />
    <Route path='repodetails' element={<AppOutlet />}>
      <Route path=':id' element={<RepoDetails />} />
    </Route>
    </>
  ))

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ErrorBoundary>
    <App />
    <RouterProvider router={router}/>
    </ErrorBoundary>
  </React.StrictMode>,
)
