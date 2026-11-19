-- CreateTable
CREATE TABLE "admin_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Antônio Cândido',
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "siteName" TEXT NOT NULL DEFAULT 'IC Assessoria',
    "tagline" TEXT NOT NULL DEFAULT 'Vigilância e Análise de Dados em Saúde',
    "logoUrl" TEXT,
    "faviconUrl" TEXT,
    "primaryColor" TEXT NOT NULL DEFAULT '#f97316',
    "footerText" TEXT NOT NULL DEFAULT '© {year} IC Assessoria – Vigilância e Análise de Dados em Saúde. Todos os direitos reservados.',
    "seoTitle" TEXT NOT NULL DEFAULT 'IC Assessoria – Vigilância e Análise de Dados em Saúde | Antônio Cândido',
    "seoDescription" TEXT NOT NULL,
    "seoKeywords" TEXT NOT NULL DEFAULT 'IC Assessoria, Antônio Cândido, Vigilância em Saúde, Análise de Dados em Saúde, Gestão em Saúde',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_content" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "badgeText" TEXT NOT NULL DEFAULT 'Assessoria Especializada em Saúde',
    "heroTitle" TEXT NOT NULL DEFAULT 'Inteligência em saúde para decisões mais estratégicas.',
    "heroSubtitle" TEXT NOT NULL,
    "heroImageUrl" TEXT,
    "primaryCtaText" TEXT NOT NULL DEFAULT 'Fale com a Assessoria',
    "primaryCtaLink" TEXT NOT NULL DEFAULT '#contato',
    "secondaryCtaText" TEXT NOT NULL DEFAULT 'Conheça Nossos Serviços',
    "secondaryCtaLink" TEXT NOT NULL DEFAULT '#servicos',
    "statsData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "home_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about_content" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "title" TEXT NOT NULL DEFAULT 'Sobre a IC Assessoria',
    "subtitle" TEXT NOT NULL DEFAULT 'Nossa Proposta Institucional',
    "paragraph1" TEXT NOT NULL,
    "paragraph2" TEXT NOT NULL,
    "paragraph3" TEXT NOT NULL,
    "mission" TEXT,
    "vision" TEXT,
    "values" TEXT,
    "responsibleName" TEXT NOT NULL DEFAULT 'Antônio Cândido',
    "responsibleRole" TEXT NOT NULL DEFAULT 'Responsável pela iniciativa IC Assessoria',
    "responsibleBio" TEXT NOT NULL,
    "responsiblePhotoUrl" TEXT,
    "institutionalImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconName" TEXT NOT NULL DEFAULT 'FiActivity',
    "imageUrl" TEXT,
    "category" TEXT NOT NULL DEFAULT 'Assessoria Técnica',
    "deliverables" JSONB,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverImageUrl" TEXT,
    "author" TEXT NOT NULL DEFAULT 'Antônio Cândido',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Projeto',
    "imageUrl" TEXT,
    "projectDate" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolio_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "title" TEXT NOT NULL DEFAULT 'Vamos conversar sobre a gestão em saúde?',
    "subtitle" TEXT NOT NULL DEFAULT 'Entre em Contato',
    "description" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT 'contato@icassessoria.com.br',
    "instagram" TEXT NOT NULL DEFAULT '',
    "linkedin" TEXT NOT NULL DEFAULT 'https://www.linkedin.com',
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");
