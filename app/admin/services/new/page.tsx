'use client'

import AdminGuard from '../../components/admin-guard'
import ServiceForm from '../service-form'

export default function NewServicePage() {
  return (
    <AdminGuard>
      <ServiceForm />
    </AdminGuard>
  )
}
