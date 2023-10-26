"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Page() {
  const [equities, setEquities] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("stocks_equity").select().limit(10);
      setEquities(data);
    };
    getData();
  }, []);

  return <pre>{JSON.stringify(equities, null, 2)}</pre>;
}
