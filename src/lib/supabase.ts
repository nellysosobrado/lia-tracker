import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Databsae configuration for supabase, using environment variables to keep sensitive information out of the codebase. The exclamation mark is used to assert that the environment variables will be defined at runtime.