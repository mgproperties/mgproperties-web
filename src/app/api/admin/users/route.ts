// app/api/admin/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/auth/api-auth'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'

// GET - Fetch all users (Admin only)
export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (req, user) => {
    try {
      const supabase = await createClient()
      const adminSupabase = createAdminClient()
      
      // Get all users from Supabase Auth
      const { data: authData, error: authError } = await adminSupabase.auth.admin.listUsers()
      
      if (authError) {
        console.error('Auth error:', authError)
        return NextResponse.json(
          { error: 'Failed to fetch users from auth' },
          { status: 500 }
        )
      }

      // Get all user profiles
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('*')

      if (profileError) {
        console.error('Profile error:', profileError)
        return NextResponse.json(
          { error: 'Failed to fetch user profiles' },
          { status: 500 }
        )
      }

      // Combine auth users with their profiles
      const usersWithProfiles = authData.users.map(user => {
        const profile = profiles?.find(p => p.id === user.id)
        return {
            id: user.id,
            email: user.email || '',
            name: profile?.name || user.email || 'Unknown',
            role: profile?.role || 'agent',
            status: user.last_sign_in_at ? 'active' : 'invited',
            invited_at: user.created_at,
            last_sign_in_at: user.last_sign_in_at,
            created_at: user.created_at,
            email_confirmed_at: user.email_confirmed_at
        }
        })

      return NextResponse.json({ 
        users: usersWithProfiles,
        total: usersWithProfiles.length 
      })

    } catch (error) {
      console.error('Unexpected error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  })
}

// POST - Invite new user (Admin only)
export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (req, user) => {
    try {
      const body = await request.json()
      const { name, email, role } = body

      // Validation
      if (!name || !email || !role) {
        return NextResponse.json(
          { error: 'Missing required fields: name, email, role' },
          { status: 400 }
        )
      }

      if (!['admin', 'agent'].includes(role)) {
        return NextResponse.json(
          { error: 'Role must be either admin or agent' },
          { status: 400 }
        )
      }

      const adminSupabase = createAdminClient()

      // Check if user already exists
      const { data: existingUser } = await adminSupabase.auth.admin.listUsers()
      const userExists = existingUser.users.find(u => u.email === email)
      
      if (userExists) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 400 }
        )
      }

      const { data: inviteData, error: inviteError } = await adminSupabase.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/setup-password`
        })

      if (inviteError) {
        console.error('Invitation error:', inviteError)
        return NextResponse.json(
          { error: inviteError.message || 'Failed to send invitation' },
          { status: 400 }
        )
      }

      if (inviteData?.user) {
            const supabase = await createClient()

            const { error: profileError } = await supabase.from('profiles').insert({
                id: inviteData.user.id,
                name: name,
                role: role,
                email: email
            })

            if (profileError) {
              console.error('Profile creation error:', profileError)
              await adminSupabase.auth.admin.deleteUser(inviteData.user.id)

              return NextResponse.json(
                { error: 'Failed to create user profile' },
                { status: 500 }
              )
            }
        }

        
      return NextResponse.json({
        success: true,
        message: `Invitation sent to ${email}`,
        user: {
          id: inviteData.user.id,
          email,
          name,
          role,
          status: 'invited',
          invited_at: new Date().toISOString()
        }
      })

    } catch (error) {
      console.error('Unexpected error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  })
}