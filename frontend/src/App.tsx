import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import { Dashboard } from './containers/dashboard'
import { Products } from './containers/products'
import { Login } from './containers/login'
import { Layout } from './containers/layout'
import { Orders } from './containers/orders'
import { Invoices } from './containers/invoices'
import { CRM } from './containers/crm'
import { PageNotFound } from './containers/page-not-found'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path='dashboard' element={<Dashboard />} />
          <Route path='sales'>
            <Route path='products' element={<Products />} />
            <Route path='orders' element={<Orders />} />
            <Route path='invoices' element={<Invoices />} />
          </Route>
          <Route path='crm' element={<CRM />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
        <Route path='login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
