import AccountOverviewComponent from "./AccountOverviewComponent";
import ClearedEquitiesListComponent from "./ClearedEquitiesListComponent";
import HoldingEquitiesListComponent from "./HoldingEquitiesListComponent";

export default function HeldEquities() {
  return (
    <div className="overflow-x-auto w-full p-8">
      <AccountOverviewComponent />
      <HoldingEquitiesListComponent />
      <ClearedEquitiesListComponent />
    </div>
  );
}
