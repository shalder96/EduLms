
import React, { lazy, Suspense } from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Loading from './components/loader/Loading'
import ErrorBoundary from './components/ErrorBoundary'


const Home = lazy(() => import('./pages/Home'))
const Contact = lazy(() => import('./pages/Contact'))
const Courses = lazy(() => import('./pages/courses/Courses'))
const CourseDetail = lazy(() => import('./pages/courses/CourseDetail'))
const CourseContent = lazy(() => import('./pages/courses/CourseContent'))
const Dashboard = lazy(() => import('./pages/Dashboard'))


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='courses' element={<Courses />} />
        <Route path='courses/:id' element={<CourseDetail />} />
        <Route path='courses/:id/content' element={<CourseContent />} />
        <Route path='contact' element={<Contact />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Route>
      <Route path='*' element={<ErrorBoundary />} />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
)
