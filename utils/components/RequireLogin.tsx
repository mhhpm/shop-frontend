import { signIn, useSession } from 'next-auth/react'

export default function RequireLogin() {
  const { data: session, status } = useSession()

  if (typeof window !== undefined && status === 'loading') {
    return <div>Loading</div>
  }
  if (!session) {
    signIn()
  }

  return <></>
}
