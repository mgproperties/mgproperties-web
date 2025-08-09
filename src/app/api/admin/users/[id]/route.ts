// app/api/admin/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/auth/api-auth'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'

// PUT - Update user (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{  id: string }> }
) {
  return withAdminAuth(request, async (req, user) => {
    try {
      const { id: userId } = await params
      const body = await request.json()
      const { name, email, role } = body
      console.log("This is the new role: ", role);

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

      const supabase = await createClient()
      const adminSupabase = createAdminClient();

      // Update user email in auth if it changed
      const { data: currentUser, error: getUserError } = await adminSupabase.auth.admin.getUserById(userId)
      
      if (getUserError || !currentUser.user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      // Update auth user if email changed
      if (currentUser.user.email !== email) {
        const { error: updateAuthError } = await adminSupabase.auth.admin.updateUserById(userId, {
          email,
          user_metadata: { name }
        })

        if (updateAuthError) {
          console.error('Auth update error:', updateAuthError)
          return NextResponse.json(
            { error: updateAuthError.message || 'Failed to update user email' },
            { status: 400 }
          )
        }
      }

      console.log("Updating to: ", email, name, role);
      // Update profile
      const { error: profileError } = await adminSupabase
        .from('profiles')
        .update({
          email,
          name,
          role,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (profileError) {
        console.error('Profile update error:', profileError)
        return NextResponse.json(
          { error: 'Failed to update user profile' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        user: {
          id: userId,
          email,
          name,
          role
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

// DELETE - Delete user (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }>}
) {
  return withAdminAuth(request, async (req, user) => {
    try {
      const { id: userId } = await params

      // Prevent admin from deleting themselves
      if (userId === user.id) {
        return NextResponse.json(
          { error: 'Cannot delete your own account' },
          { status: 400 }
        )
      }

      const supabase = await createClient()
      const adminSupabase = createAdminClient()

      // Delete from profiles first (due to foreign key constraint)
      const { error: profileError } = await adminSupabase
        .from('profiles')
        .delete()
        .eq('id', userId)

      if (profileError) {
        console.error('Profile deletion error:', profileError)
        return NextResponse.json(
          { error: 'Failed to delete user profile' },
          { status: 500 }
        )
      }

      // Delete from auth
      const { error: authError } = await adminSupabase.auth.admin.deleteUser(userId)

      if (authError) {
        console.error('Auth deletion error:', authError)
        return NextResponse.json(
          { error: authError.message || 'Failed to delete user' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'User deleted successfully'
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