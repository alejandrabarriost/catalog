import { OpenAI } from "../openAI";
import { supabase } from "../supabase";

export const searchProducts = async (query: string) => {
  const embedding = await OpenAI.embeddings.create({
    input: query,
    model: "text-embedding-ada-002",
  });

  return supabase.rpc("match_documents", {
    match_count: 10,
    match_threshold: 0.8,
    query_embedding: embedding.data[0].embedding as any,
  });
};
