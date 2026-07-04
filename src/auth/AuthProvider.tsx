import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { api, setStoredToken, setTokenGetter, getStoredToken } from '@/api/client'
import type { AuthLoginRequest, AuthTokenResponse, CurrentUser, UserRole } from '@/api/types'
import { hasAnyRole, hasRole } from '@/auth/roles'

interface AuthContextValue {
  token: string | null
  user: CurrentUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: AuthLoginRequest) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<CurrentUser | null>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getStoredToken())
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [isLoading, setIsLoading] = useState(() => Boolean(getStoredToken()))

  useEffect(() => {
    setTokenGetter(() => token)
  }, [token])

  const refreshUser = useCallback(async () => {
    if (!token) {
      setUser(null)
      return null
    }

    const currentUser = await api.get<CurrentUser>('/api/v1/me')
    setUser(currentUser)
    return currentUser
  }, [token])

  useEffect(() => {
    if (!token) {
      setUser(null)
      setIsLoading(false)
      return
    }

    let cancelled = false
    setIsLoading(true)

    refreshUser()
      .catch(() => {
        if (!cancelled) {
          setToken(null)
          setStoredToken(null)
          setUser(null)
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [token, refreshUser])

  const login = useCallback(async (credentials: AuthLoginRequest) => {
    const response = await api.post<AuthTokenResponse>('/api/v1/auth/login', credentials)
    setStoredToken(response.accessToken)
    setToken(response.accessToken)
    setUser(response.user ?? null)
  }, [])

  const logout = useCallback(() => {
    setStoredToken(null)
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isLoading,
      login,
      logout,
      refreshUser,
    }),
    [token, user, isLoading, login, logout, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function useHasRole(...roles: UserRole[]) {
  const { user } = useAuth()
  return hasAnyRole(user?.roles, roles)
}

export function useIsRole(role: UserRole) {
  const { user } = useAuth()
  return hasRole(user?.roles, role)
}
