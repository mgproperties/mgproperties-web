import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { AdminDashboard } from '@/components/admin/admin-dashboard'

export default async function AdminPage() {
  const supabase = await createClient()
  
  // Server-side auth check
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (!user || error) {
    redirect('/auth/login')
  }

  // Optional: Get user profile with role
  // const { data: profile } = await supabase
  //   .from('profiles')
  //   .select('role')
  //   .eq('id', user.id)
  //   .single()

  return <AdminDashboard user={user} />
}