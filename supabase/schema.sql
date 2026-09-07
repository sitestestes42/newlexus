-- Lexus Elétricos — banco mínimo para autenticação + pedidos.
-- Execute no Supabase: SQL Editor -> New query -> cole este arquivo -> Run.
-- É idempotente e pode ser executado mesmo se as tabelas anteriores da Lexus já existirem.

DO $$ BEGIN
  CREATE TYPE public.order_status AS ENUM ('pending', 'paid', 'failed', 'cancelled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM ('user', 'admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.users (
  id serial PRIMARY KEY,
  "openId" varchar(64) NOT NULL UNIQUE,
  name text,
  email varchar(320),
  "loginMethod" varchar(64),
  role public.user_role NOT NULL DEFAULT 'user',
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "lastSignedIn" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.orders (
  id varchar(32) PRIMARY KEY,
  "userId" integer NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  "totalCents" integer NOT NULL CHECK ("totalCents" > 0),
  status public.order_status NOT NULL DEFAULT 'pending',
  "providerReference" varchar(128),
  "idempotencyKey" varchar(96) NOT NULL UNIQUE,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id serial PRIMARY KEY,
  "orderId" varchar(32) NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  "productId" varchar(64) NOT NULL,
  variant varchar(32) NOT NULL CHECK (variant IN ('Preto','Caramelo')),
  quantity integer NOT NULL CHECK (quantity BETWEEN 1 AND 10),
  "unitPriceCents" integer NOT NULL CHECK ("unitPriceCents" > 0),
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.order_shipping (
  "orderId" varchar(32) PRIMARY KEY REFERENCES public.orders(id) ON DELETE CASCADE,
  "fullName" varchar(100) NOT NULL,
  phone varchar(20) NOT NULL,
  cep varchar(9) NOT NULL,
  state varchar(2) NOT NULL,
  city varchar(80) NOT NULL,
  neighborhood varchar(80) NOT NULL,
  street varchar(120) NOT NULL,
  number varchar(16) NOT NULL,
  complement varchar(80),
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orders_user_id_idx ON public.orders ("userId");
CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON public.order_items ("orderId");

GRANT SELECT, INSERT, UPDATE, DELETE ON public.users TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.order_items TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.order_shipping TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.users_id_seq TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.order_items_id_seq TO service_role;

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_shipping ENABLE ROW LEVEL SECURITY;

-- Não são criadas policies para anon/authenticated: o navegador não acessa estas tabelas.
-- A leitura e escrita são feitas apenas pelas Functions com SUPABASE_SECRET_KEY.
