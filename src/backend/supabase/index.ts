import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../supabaseTypes";

const supabaseUrl = "https://gwsdibjsezpxttkfrffb.supabase.co";
const supabaseKey =
  typeof window !== undefined
    ? process.env.NEXT_PUBLIC_SUPABASE_KEY
    : process.env.SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error("Please define the SUPABASE_KEY environment variable");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
