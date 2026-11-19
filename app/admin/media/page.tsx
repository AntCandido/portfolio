'use client'

import { useEffect, useState, useRef } from 'react'
import AdminGuard from '../components/admin-guard'
import DeleteModal from '../components/delete-modal'
import {
  FiUploadCloud,
  FiImage,
  FiTrash2,
  FiCopy,
  FiCheck,
  FiExternalLink,
  FiInfo,
} from 'react-icons/fi'
import toast from 'react-hot-toast'

interface MediaItem {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  alt: string | null
  createdAt: string
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadMedia = async () => {
    try {
      const res = await fetch('/api/admin/media')
      if (res.ok) {
        const json = await res.json()
        setMediaList(json)
      }
    } catch (err) {
      console.error('Erro ao listar mídias:', err)
      toast.error('Erro ao buscar arquivos de mídia.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMedia()
  }, [])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Arquivo muito grande. O limite máximo é de 5MB.')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('alt', file.name)

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro no upload.')
      }

      toast.success('Imagem enviada com sucesso!')
      setMediaList((prev) => [data.data, ...prev])
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err: any) {
      toast.error(err.message || 'Erro ao realizar upload da imagem.')
    } finally {
      setUploading(false)
    }
  }

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url)
    setCopiedId(item.id)
    toast.success('URL copiada para a área de transferência!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/media?id=${deleteTarget.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        toast.success('Imagem excluída com sucesso!')
        setMediaList((prev) => prev.filter((m) => m.id !== deleteTarget.id))
        setDeleteTarget(null)
      } else {
        toast.error('Erro ao excluir mídia.')
      }
    } catch {
      toast.error('Erro ao excluir imagem.')
    } finally {
      setIsDeleting(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <AdminGuard>
      <div className="p-6 sm:p-8 lg:p-10 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Biblioteca de Mídia & Imagens
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Envie fotos, diagramas e logotipos armazenados no Supabase Storage para utilizar em qualquer área do site.
            </p>
          </div>

          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              {uploading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Enviando arquivo...</span>
                </>
              ) : (
                <>
                  <FiUploadCloud size={16} />
                  <span>Fazer Upload de Imagem</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Upload Drop Zone Card */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="p-8 rounded-3xl border-2 border-dashed border-white/10 hover:border-orange-500/40 bg-slate-900/40 hover:bg-slate-900/60 transition-all text-center cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 mx-auto mb-3 group-hover:scale-105 transition-transform">
            <FiUploadCloud size={24} />
          </div>
          <h3 className="text-sm font-semibold text-white">
            Clique aqui para selecionar uma imagem do seu computador
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Formatos aceitos: JPG, PNG, WEBP, SVG ou GIF. Tamanho máximo: 5MB por arquivo.
          </p>
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="py-16 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            <span>Carregando mídias...</span>
          </div>
        ) : mediaList.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-400">
            Nenhuma imagem enviada ainda. Faça o primeiro upload acima.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mediaList.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-orange-500/40 overflow-hidden flex flex-col transition-all"
              >
                {/* Image Thumbnail Container */}
                <div className="relative aspect-square w-full bg-black/40 overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.alt || item.originalName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleCopyUrl(item)}
                      title="Copiar URL"
                      className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                    >
                      {copiedId === item.id ? <FiCheck size={14} /> : <FiCopy size={14} />}
                    </button>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visualizar em tamanho original"
                      className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                    >
                      <FiExternalLink size={14} />
                    </a>
                    <button
                      onClick={() => setDeleteTarget(item)}
                      title="Excluir imagem"
                      className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white backdrop-blur-sm"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 space-y-1">
                  <p className="text-xs font-medium text-white truncate" title={item.originalName}>
                    {item.originalName}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{formatFileSize(item.size)}</span>
                    <button
                      onClick={() => handleCopyUrl(item)}
                      className="text-orange-400 hover:text-orange-300"
                    >
                      {copiedId === item.id ? 'Copiado!' : 'Copiar URL'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <DeleteModal
          isOpen={Boolean(deleteTarget)}
          title="Excluir Arquivo de Mídia"
          message={`Tem certeza que deseja excluir "${deleteTarget?.originalName}"? Esta ação removerá a imagem do armazenamento.`}
          isDeleting={isDeleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </AdminGuard>
  )
}
