import Link from "next/link";

interface Props {
  children: React.ReactElement;
  params: {
    city: string;
  };
}

const menuGroups = [
  {
    label: "Screeners",
  },
  {
    label: "Strategies",
  },
  {
    label: "Backtesting",
  },
  {
    label: "Transactions",
  },
  {
    label: "Monitoring",
  },
  {
    label: "Reports",
  },
  // {
  //   label: "二手管理",
  //   menus: [
  //     { link: "usercenter/secondhands", label: "所有二手" },
  //     { link: "usercenter/secondhands/create", label: "发布二手" },
  //   ],
  // },
  // {
  //   label: "租房管理",
  //   menus: [
  //     { link: "usercenter/rentals", label: "所有租房" },
  //     { link: "usercenter/rentals/create", label: "发布租房" },
  //   ],
  // },
];

const UsercenterLayout: React.FC<Props> = ({ children, params }) => {
  const path = "";

  return (
    <div className="container mx-auto flex">
      <div className="hidden w-52 shrink-0 rounded-lg bg-base-200 pt-6 pb-2 md:block">
        {menuGroups.map((group) => {
          return (
            <div key={group.label} className="mb-4">
              <h4 className="mb-1 pl-4 text-sm text-zinc-400">{group.label}</h4>
              {/* <ul className="menu">
                {group.menus.map((menu) => {
                  return (
                    <li key={menu.label}>
                      <Link
                        href={`/${menu.link}`}
                        className={`/${menu.link}` === path ? "active" : ""}
                      >
                        {menu.label}
                      </Link>
                    </li>
                  );
                })}
              </ul> */}
            </div>
          );
        })}
      </div>
      <div className="min-h-[65vh] flex-grow md:pl-6">{children}</div>
    </div>
  );
};

export default UsercenterLayout;
