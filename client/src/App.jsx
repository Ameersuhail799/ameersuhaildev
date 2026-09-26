import React, { lazy, Suspense } from 'react'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import { LayoutOne } from './layout/LayoutOne'
import { Analytics } from '@vercel/analytics/react'
import { ToastContainer } from 'react-toastify'
import SmoothScroll from './components/utils/SmoothScroll'
import PreloaderWrapper from './components/utils/PreloaderWrapper'
import Cursor from './components/Cursor'
import { ThemeProvider } from './context/ThemeContext'

// Eager Main Entry
import Home from './pages/Home'

// Lazy Loaded Secondary & Admin Routes
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))

const AdminLayout = lazy(() => import('./layout/AdminLayout'))
const AdminAdd = lazy(() => import('./pages/AdminAdd'))
const AdminCategory = lazy(() => import('./pages/AdminCategory'))
const AdminSkills = lazy(() => import('./pages/AdminSkills'))
const AdminMessages = lazy(() => import('./pages/AdminMessages'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))

const RouteFallback = () => (
  <div className="min-h-screen bg-[#030304] flex items-center justify-center">
    <div className="size-8 rounded-full border-2 border-coffee border-t-transparent animate-spin" />
  </div>
)

export const App = () => {
  // ---------------Routing 
  const MyRoute = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<LayoutOne />}>
        <Route index element={<Home />}></Route>
        <Route path='/about' element={<Suspense fallback={<RouteFallback />}><About /></Suspense>}></Route>
        <Route path='/projects' element={<Suspense fallback={<RouteFallback />}><Projects /></Suspense>}></Route>
        <Route path='/contact' element={<Suspense fallback={<RouteFallback />}><Contact /></Suspense>}></Route>
      </Route>

      <Route path='/admin' element={<Suspense fallback={<RouteFallback />}><AdminLayout /></Suspense>}>
        <Route index element={<Suspense fallback={<RouteFallback />}><AdminAdd /></Suspense>}></Route>
        <Route path='category' element={<Suspense fallback={<RouteFallback />}><AdminCategory /></Suspense>}></Route>
        <Route path='skills' element={<Suspense fallback={<RouteFallback />}><AdminSkills /></Suspense>}></Route>
        <Route path='messages' element={<Suspense fallback={<RouteFallback />}><AdminMessages /></Suspense>}></Route>
      </Route>

      <Route path='/admin/login' element={<Suspense fallback={<RouteFallback />}><AdminLogin /></Suspense>}></Route>
    </Route>
  ))

  return (
    <ThemeProvider>
      <SmoothScroll>
        <PreloaderWrapper>
          <Cursor />
          <RouterProvider router={MyRoute} />
        </PreloaderWrapper>
        <Analytics />
        <ToastContainer />
      </SmoothScroll>
    </ThemeProvider>
  )
}

export default App
