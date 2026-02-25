import { useAuthStore } from "@/stores/auth"


import { Link, useLocation } from "react-router-dom"

export function Header() {
  const { user, isAuthenticated } = useAuthStore()

  const location = useLocation()
  const isDashboardPage = location.pathname === "/"
  const isTransactionPage = location.pathname === "/transactions"
  const isCategoryPage = location.pathname === "/categories"

  return (
    <>
      {isAuthenticated && (
        <div className="w-full px-4 md:px-16 py-4 bg-white">
          <div className="flex items-center md:justify-between w-full">
            <div className="mr-2 md:min-w-48 md:mr-0">
              <Link to="/">
                <img src="/logo.svg" alt="Logo" className="h-6 w-[100px]" />

              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className={`${isDashboardPage
                ? "text-brand-base font-medium "
                : "text-gray-600 hover:text-gray-400 "}`}
              >Dashboard</Link>

              <Link to="/transactions" className={`${isTransactionPage
                ? "text-brand-base font-medium "
                : "text-gray-600 hover:text-gray-400 "}`}
              >Transações</Link>

              <Link to="/categories" className={`${isCategoryPage
                ? "text-brand-base font-medium  "
                : "text-gray-600 hover:text-gray-400 "}`}
              >Categorias</Link>
            </div>

            <div className="flex-1 flex justify-end md:flex-grow-0 md:inline-flex">
              <div className=" bg-gray-200 p-2 rounded-full w-9 h-9 flex items-center justify-center">
                <Link to="/user">
                  <span className="font-medium text-gray-800">{user?.name?.slice(0, 2)?.toUpperCase()}</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}