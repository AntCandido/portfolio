'use client'

import AdminGuard from '../../components/admin-guard'
import PortfolioForm from '../portfolio-form'

export default function NewPortfolioPage() {
  return (
    <AdminGuard>
      <PortfolioForm />
    </AdminGuard>
  )
}
