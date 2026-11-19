'use client'

import AdminGuard from '../../components/admin-guard'
import ArticleForm from '../article-form'

export default function NewArticlePage() {
  return (
    <AdminGuard>
      <ArticleForm />
    </AdminGuard>
  )
}
