import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import { Login } from './containers/auth/login'
import { Layout } from './containers/layout'
import { PageNotFound } from './containers/error/page-not-found'
import { RouteModel, routes } from './constants/routes'
import { ProtectedRoute } from './components/protected-route'
import { AuthProvider } from './contexts/auth-context'

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
      <AuthProvider>
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
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
