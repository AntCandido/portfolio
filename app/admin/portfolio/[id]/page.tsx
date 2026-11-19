'use client'

import { use } from 'react'
import AdminGuard from '../../components/admin-guard'
import PortfolioForm from '../portfolio-form'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditPortfolioPage({ params }: PageProps) {
  const { id } = use(params)

  return (
    <AdminGuard>
      <PortfolioForm id={id} />
    </AdminGuard>
  )
}
