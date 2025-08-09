// hooks/use-role-access.ts
export function useRoleAccess(userRole: string | null) {
  const canAccessUserManagement = userRole === 'admin'
  const canAccessProperties = userRole === 'admin' || userRole === 'agent'
  const canAccessContacts = userRole === 'admin' || userRole === 'agent'
  
  return {
    canAccessUserManagement,
    canAccessProperties,
    canAccessContacts
  }
}