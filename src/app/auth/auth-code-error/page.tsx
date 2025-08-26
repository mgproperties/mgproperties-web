import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Link Expired</CardTitle>
          <CardDescription>
            This password reset link has expired or is invalid.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/auth/forgot-password">
            <Button className="w-full">Request New Reset Link</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}