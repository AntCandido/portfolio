'use client'

import { use } from 'react'
import AdminGuard from '../../components/admin-guard'
import ArticleForm from '../article-form'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditArticlePage({ params }: PageProps) {
  const { id } = use(params)

  return (
    <AdminGuard>
      <ArticleForm id={id} />
    </AdminGuard>
  )
}
