Deno.serve(() => {
  const data = {
    url: Deno.env.get("YIELDWISE_SUPABASE_URL"),
    anon: Deno.env.get("YIELDWISE_SUPABASE_ANON_KEY"),
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});
