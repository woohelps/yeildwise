import { createSupabaseServerClient } from "@/utils/supabase/server";
import DividendTable from "@/ui/DividendTable";

const DividendTableServer = async () => {
  const supabase = createSupabaseServerClient();

  const today = new Date();

  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 7);
  const todayString: string = today.toLocaleDateString();
  const sevenDaysLaterString = sevenDaysLater.toLocaleDateString();
  const { data } = await supabase
    .from("stocks_dividend")
    .select(`*, stocks_equity!inner(*, stocks_volatility!inner(*))`)
    .gt("ex_dividend_date", todayString)
    // .gt("ex_dividend_date", "2023-10-23")
    .lte("ex_dividend_date", sevenDaysLaterString)
    .gt("stocks_equity.stocks_volatility.year_yld:", 0.06)
    .gt("stocks_equity.stocks_volatility.current_price", 0)
    .eq("stocks_equity.status", "active")
    .order("ex_dividend_date", { ascending: true });

  if (data == null) return;

  return (
    <DividendTable
      todayString={todayString}
      sevenDaysLaterString={sevenDaysLaterString}
      data={data}
    />
  );
};

export default DividendTableServer;
