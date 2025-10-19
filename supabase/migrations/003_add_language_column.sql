-- Add language column to news table

-- Add the language column with default value 'en'
ALTER TABLE public.news 
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en';

-- Create an index on the language column for better performance
CREATE INDEX IF NOT EXISTS idx_news_language ON public.news (language);

-- Update existing articles to explicitly set language to 'en'
UPDATE public.news 
SET language = 'en' 
WHERE language = 'en' OR language IS NULL;

-- Add comment to describe the column
COMMENT ON COLUMN public.news.language IS 'Language code for the article (en, fr, sw)';

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ Language column added to news table successfully!';
    RAISE NOTICE '🌐 Default language set to English (en)';
    RAISE NOTICE '🔍 Index created for better query performance';
END $$;