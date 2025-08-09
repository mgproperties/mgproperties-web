// app/auth/login/page.tsx
import { LoginForm } from '@/components/auth/login-form'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  // Check if user is already authenticated
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If already logged in, redirect to admin
  if (user) {
    redirect('/admin')
  }

  return <LoginForm />
}