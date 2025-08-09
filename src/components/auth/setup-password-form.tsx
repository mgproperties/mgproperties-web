'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react'
import { User } from '@supabase/supabase-js'


export function SetupPasswordForm() {
  const [user, setUser] = useState<User | null>(null)
  const [tokenLoading, setTokenLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const supabase = createClient()


    useEffect(() => {
      const handleAuthCallback = async () => {
        try {
          // Parse hash fragment
          const hashParams = new URLSearchParams(window.location.hash.substring(1))
          const accessToken = hashParams.get('access_token')
          const refreshToken = hashParams.get('refresh_token')
          const type = hashParams.get('type')
          
          console.log('Hash params:', { accessToken: !!accessToken, refreshToken: !!refreshToken, type })
          
          if (accessToken && refreshToken && type === 'invite') {
            // Set the session manually from the hash parameters
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            })
            
            console.log('Set session result:', { data: !!data.session, error })
            
            if (error) {
              setError('Failed to establish session: ' + error.message)
              return
            }
            
            if (data.session?.user) {
              setUser(data.session.user)
              console.log('User set:', data.session.user.email)
            } else {
              setError('No user found in session')
            }
          } else {
            setError('Invalid invitation link parameters')
          }
        } catch (err) {
          console.error('Unexpected error:', err)
          setError('Something went wrong processing your invitation')
        } finally {
          setTokenLoading(false)
        }
      }
      
      handleAuthCallback()
    }, [])

  // Password validation
  const passwordValidation = {
    minLength: password.length >= 12,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  }

  const isPasswordValid = Object.values(passwordValidation).every(Boolean)
  const passwordsMatch = password === confirmPassword && password.length > 0

  const handleSetupPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if(!user){
      setError('User not found')
      return
    }
    
    if (!isPasswordValid) {
      setError('Please ensure your password meets all requirements')
      return
    }
    
    if (!passwordsMatch) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      })

      if (updateError) {
        setError(updateError.message)
        return
      }

      await supabase.from('profiles').upsert({
        id: user.id,
        name: user.user_metadata?.name || user.email,
        role: user.user_metadata?.role || 'agent',
        email: user.email
      })

      // Redirect to admin dashboard
      router.push('/admin?message=welcome')
      
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (tokenLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertDescription>Invalid or expired invitation link</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Set Up Your Password
          </CardTitle>
          <CardDescription className="text-center">
            Welcome! Please set up your password for <strong>{user?.email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSetupPassword} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            {/* Password Requirements */}
            {password && (
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  {passwordValidation.minLength ? 
                    <CheckCircle className="h-4 w-4 text-green-500" /> : 
                    <XCircle className="h-4 w-4 text-red-500" />
                  }
                  <span className={passwordValidation.minLength ? 'text-green-600' : 'text-red-600'}>
                    At least 12 characters
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {passwordValidation.hasUppercase ? 
                    <CheckCircle className="h-4 w-4 text-green-500" /> : 
                    <XCircle className="h-4 w-4 text-red-500" />
                  }
                  <span className={passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-600'}>
                    One uppercase letter
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {passwordValidation.hasLowercase ? 
                    <CheckCircle className="h-4 w-4 text-green-500" /> : 
                    <XCircle className="h-4 w-4 text-red-500" />
                  }
                  <span className={passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-600'}>
                    One lowercase letter
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {passwordValidation.hasNumber ? 
                    <CheckCircle className="h-4 w-4 text-green-500" /> : 
                    <XCircle className="h-4 w-4 text-red-500" />
                  }
                  <span className={passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}>
                    One number
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {passwordValidation.hasSpecialChar ? 
                    <CheckCircle className="h-4 w-4 text-green-500" /> : 
                    <XCircle className="h-4 w-4 text-red-500" />
                  }
                  <span className={passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-red-600'}>
                    One special character
                  </span>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-sm text-red-600">Passwords do not match</p>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !isPasswordValid || !passwordsMatch}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting up...
                </>
              ) : (
                'Set Password & Continue'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}