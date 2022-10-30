import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import { Layout } from './containers/layout'
import { PageNotFound } from './containers/error/page-not-found'
import { RouteModel, routes } from './constants/routes'

const render = (r: RouteModel, k: any) => {
  if (!r.routes || r.routes.length === 0) {
    return <Route key={k} path={r.path} element={r.element} />
  }

  return (
    <Route path={r.path}>
      {r.routes.map((r, k) => {
        return render(r, k)
      })}
    </Route>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map((r, k) => {
            return render(r, k)
          })}
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
