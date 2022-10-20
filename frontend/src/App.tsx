import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import { Login } from './containers/login'
import { Layout } from './containers/layout'
import { PageNotFound } from './containers/page-not-found'
import { RouteModel, routes } from './constants/routes'
import { ProtectedRoute } from './components/protected-route'

const render = (r: RouteModel) => {
  if (!r.routes || r.routes.length === 0) {
    return <Route path={r.path} element={r.element} />
  }

  return (
    <Route path={r.path}>
      {r.routes.map((r, k) => {
        return render(r)
      })}
    </Route>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        )}>
          {routes.map((r, k) => {
            return render(r)
          })}
          <Route path='*' element={<PageNotFound />} />
        </Route>
        <Route path='login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
