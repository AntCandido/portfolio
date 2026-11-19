'use client'

import { use } from 'react'
import AdminGuard from '../../components/admin-guard'
import ServiceForm from '../service-form'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditServicePage({ params }: PageProps) {
  const { id } = use(params)

  return (
    <AdminGuard>
      <ServiceForm id={id} />
    </AdminGuard>
  )
}
