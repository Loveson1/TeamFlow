import { useState } from 'react'
import teamflow from "../assets/images/teamflow.png";
import flow from  "../assets/videos/flow.webm";
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/utils/supabase'
import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {loading, user} = useAuth()

  if(loading){ return <div>Loading...</div>}
  if(user){ return <Navigate to={"/project"} replace/>}

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error     
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex  flex-row gap-y-6 min-h-screen ', className)} {...props}>
  <div className='w-1/2 flex flex-col justify-center gap-6 px-20'>
        <CardHeader className='mb-4'>
          <CardTitle className="font-medium text-3xl tracking-normal mb-2">Welcome back!</CardTitle>
          <CardDescription>Enter your email below to sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to={"/password"}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}

             <Link to={"/signup"} className="underline underline-offset-4">
               Sign up
                
              </Link>

            </div>
          </form>
        </CardContent>
      </div>
<div className="w-1/2 ">
  {/* <img 
    src={teamflow} 
    alt="teamflow" 
    className="w-full h-full object-cover object-left" 
  /> */}
  
  <video src={flow}   className="w-full h-full object-cover object-left" muted loop autoPlay></video>
</div>



    </div>
  )
}
