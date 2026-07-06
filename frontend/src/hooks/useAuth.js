import { useAuthContext } from "../context/AuthContext";

export function useAuth() {
  const { user, loading, login, logout, isAuthenticated } = useAuthContext();

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
  };
}

export default useAuth;