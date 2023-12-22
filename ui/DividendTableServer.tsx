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
    .from("stocks_view_dividend")
    .select("*")
    .gt("ex_dividend_date", todayString)
    .lte("ex_dividend_date", sevenDaysLaterString)
    .gt("year_yld:", 0.06)
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
