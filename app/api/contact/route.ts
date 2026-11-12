import axios from 'axios'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(1),
})

const WEBHOOK_URL = process.env.WEBHOOK_URL

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = bodySchema.parse(body)

    // If webhook is configured, dispatch notification to Discord
    if (WEBHOOK_URL) {
      const messageData = {
        embeds: [
          {
            title: 'Nova Mensagem de Contato – IC Assessoria',
            color: 0xf97316, // Orange
            fields: [
              {
                name: 'Nome',
                value: name,
                inline: true,
              },
              {
                name: 'E-mail',
                value: email,
                inline: true,
              },
              {
                name: 'Instituição / Assunto',
                value: subject || 'Não informado',
                inline: false,
              },
              {
                name: 'Mensagem',
                value: message,
              },
            ],
            footer: {
              text: 'IC Assessoria – Vigilância e Análise de Dados em Saúde',
            },
            timestamp: new Date().toISOString(),
          },
        ],
      }

      await axios.post(WEBHOOK_URL, messageData)
    }

    return NextResponse.json({
      message: 'Mensagem enviada com sucesso!',
    })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: 'Falha ao processar mensagem.' },
      { status: 500 },
    )
  }
}
