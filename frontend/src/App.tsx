import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "@/components/Layout"
import { Login } from "@/app/pages/Auth/Login"
import { Singup } from "./app/pages/Auth/Singup"
import { useAuthStore } from "@/stores/auth"
import { Dashboard } from "./app/pages/Dashboard"
import { Transactions } from "./app/pages/Transactions"
import { User } from "./app/pages/Auth/User"
import { Categories } from "./app/pages/Categories"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

function App() {

  return (
    <Layout>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/singup"
          element={
            <PublicRoute>
              <Singup />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
