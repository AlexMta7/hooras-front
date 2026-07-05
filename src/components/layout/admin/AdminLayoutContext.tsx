import { createContext, useContext } from 'react'

const AdminLayoutContext = createContext(false)

export function AdminLayoutProvider({ children }: { children: React.ReactNode }) {
  return <AdminLayoutContext.Provider value={true}>{children}</AdminLayoutContext.Provider>
}

export function useAdminLayout() {
  return useContext(AdminLayoutContext)
}
