import { ReactNode } from 'react'
import { getCurrentAdminSession } from '@/lib/auth'
import AdminNav from './components/admin-nav'
import { headers } from 'next/headers'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getCurrentAdminSession()
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 flex flex-col lg:flex-row">
      {session && <AdminNav user={session} />}
      <main className="flex-1 w-full min-h-screen bg-[#07080c] overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
