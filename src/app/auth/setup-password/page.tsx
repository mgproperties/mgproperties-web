import { SetupPasswordForm } from '@/components/auth/setup-password-form'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

interface Props {
  searchParams: {
    token?: string
    type?: string
    email?: string
  }
}

export default async function SetupPasswordPage() {
  
  return <SetupPasswordForm />
}