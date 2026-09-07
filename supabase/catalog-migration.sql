-- Execute UMA VEZ no projeto Supabase já existente da Lexus.
-- Libera variantes genéricas como "Padrão" para o novo catálogo.
DO $$ DECLARE r record;
BEGIN
  FOR r IN SELECT conname FROM pg_constraint
    WHERE conrelid='public.order_items'::regclass
      AND contype='c'
      AND pg_get_constraintdef(oid) ILIKE '%variant%'
  LOOP
    EXECUTE format('ALTER TABLE public.order_items DROP CONSTRAINT %I', r.conname);
  END LOOP;
END $$;
DO $$ BEGIN
  ALTER TABLE public.order_items ADD CONSTRAINT order_items_variant_length_check CHECK (char_length(variant) BETWEEN 1 AND 32);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE INDEX IF NOT EXISTS orders_provider_reference_idx ON public.orders ("providerReference");
