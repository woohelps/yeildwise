import AuthButton from "@/components/AuthButton";
export const dynamic = "force-dynamic";
import Image from "next/image";

import StrategySection from "@/components/StrategySection";
import HeldEquities from "@/components/HeldEquities";
import DividendTableServer from "@/ui/DividendTableServer";

export default async function Index() {
  const slogans = [
    "Plan Your Trades, Trade Your Plan.",
    "Regularly Invest in Grids for High Dividend Stocks/ETFs.",
    "Make Time Your Friend in Investing.",
    "Diversify to Minimize Risk, Maximize Returns.",
    "Invest with a Long-Term Perspective.",
    "Invest in What You Understand.",
  ];

  return (
    <div className="w-full">
      {/* <nav className="w-4/5 flex flex-row border-b h-16">
        <div className="flex justify-center items-center text-sm">
          <AuthButton />
        </div>
      </nav> */}

      <div className="sticky top-0 z-40 transform">
        <div className="absolute inset-0 h-full w-full opacity-[80] bg-background transition-opacity"></div>
        <nav className="relative z-40 border-border border-b backdrop-blur-sm transition-opacity">
          <div className="relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20">
            <div className="flex items-center px-6 lg:px-0 flex-1 sm:items-stretch justify-between">
              <div className="flex items-center">
                <div className="flex items-center flex-shrink-0">
                  <a
                    className="block w-auto h-6 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:ring-offset-4 focus-visible:ring-offset-background-alternative focus-visible:rounded-sm"
                    href="/"
                  >
                    <Image
                      src="/images/yieldwise-logo.png"
                      width={128}
                      height={25}
                      alt="YieldWise"
                    />
                  </a>
                </div>
                <nav
                  aria-label="Main"
                  data-orientation="horizontal"
                  dir="ltr"
                  className="relative z-10 flex-1 items-center justify-center hidden pl-8 sm:space-x-4 lg:flex h-16"
                >
                  <div className="relative">
                    <ul
                      data-orientation="horizontal"
                      className="group flex flex-1 list-none items-center justify-center space-x-1"
                      dir="ltr"
                    >
                      <li className="text-sm font-medium">
                        <button
                          id="radix-:Rimcq6:-trigger-radix-:Rbimcq6:"
                          data-state="closed"
                          aria-expanded="false"
                          aria-controls="radix-:Rimcq6:-content-radix-:Rbimcq6:"
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 group w-max group bg-transparent data-[state=open]:!text-brand data-[radix-collection-item]:focus-visible:ring-2 data-[radix-collection-item]:focus-visible:ring-foreground-lighter data-[radix-collection-item]:focus-visible:text-foreground-strong p-2 h-auto"
                          data-radix-collection-item=""
                        >
                          Country
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                            aria-hidden="true"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </button>
                      </li>
                      <li className="text-sm font-medium">
                        <a
                          className="group/menu-item flex items-center text-sm select-none gap-3 rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-foreground-lighter group-hover:bg-transparent text-strong hover:text-brand focus-visible:text-brand"
                          data-radix-collection-item=""
                          href="/pricing"
                        >
                          <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-1">
                              <p className="leading-snug text-foreground">
                                Pricing
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="text-sm font-medium">
                        <a
                          className="group/menu-item flex items-center text-sm select-none gap-3 rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-foreground-lighter group-hover:bg-transparent text-strong hover:text-brand focus-visible:text-brand"
                          data-radix-collection-item=""
                          href="/docs"
                        >
                          <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-1">
                              <p className="leading-snug text-foreground">
                                Docs
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="text-sm font-medium">
                        <a
                          className="group/menu-item flex items-center text-sm select-none gap-3 rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-foreground-lighter group-hover:bg-transparent text-strong hover:text-brand focus-visible:text-brand"
                          data-radix-collection-item=""
                          href="/blog"
                        >
                          <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-1">
                              <p className="leading-snug text-foreground">
                                Blog
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="absolute left-0 top-full flex justify-center"></div>
                </nav>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/woohelps/yeildwise"
                  target="_blank"
                  className="relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border hover:bg-scale-500 shadow-none focus-visible:outline-scale-700 border-transparent text-xs px-2.5 py-1 hidden group lg:flex text-foreground-light hover:text-foreground-strong"
                >
                  <span className="truncate">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.5 2.22168C5.23312 2.22168 2.58496 4.87398 2.58496 8.14677C2.58496 10.7642 4.27962 12.9853 6.63026 13.7684C6.92601 13.8228 7.03366 13.6401 7.03366 13.4827C7.03366 13.3425 7.02893 12.9693 7.02597 12.4754C5.38041 12.8333 5.0332 11.681 5.0332 11.681C4.76465 10.996 4.37663 10.8139 4.37663 10.8139C3.83954 10.4471 4.41744 10.4542 4.41744 10.4542C5.01072 10.4956 5.32303 11.0647 5.32303 11.0647C5.85065 11.9697 6.70774 11.7082 7.04431 11.5568C7.09873 11.1741 7.25134 10.9132 7.42051 10.7654C6.10737 10.6157 4.72621 10.107 4.72621 7.83683C4.72621 7.19031 4.95689 6.66092 5.33486 6.24686C5.27394 6.09721 5.07105 5.49447 5.39283 4.67938C5.39283 4.67938 5.88969 4.51967 7.01947 5.28626C7.502 5.15466 7.99985 5.08763 8.5 5.08692C9.00278 5.08929 9.50851 5.15495 9.98113 5.28626C11.1103 4.51967 11.606 4.67879 11.606 4.67879C11.9289 5.49447 11.7255 6.09721 11.6651 6.24686C12.0437 6.66092 12.2732 7.19031 12.2732 7.83683C12.2732 10.1129 10.8897 10.6139 9.5724 10.7606C9.78475 10.9434 9.97344 11.3048 9.97344 11.8579C9.97344 12.6493 9.96634 13.2887 9.96634 13.4827C9.96634 13.6413 10.0728 13.8258 10.3733 13.7678C11.5512 13.3728 12.5751 12.6175 13.3003 11.6089C14.0256 10.6002 14.4155 9.38912 14.415 8.14677C14.415 4.87398 11.7663 2.22168 8.5 2.22168Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </span>
                </a>
                <AuthButton />
                <a
                  type="button"
                  className="relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-brand-600 dark:bg-brand/70 hover:bg-brand-600/80 dark:hover:bg-brand border-brand dark:border-brand focus-visible:outline-brand-600 shadow-sm text-xs px-2.5 py-1 hidden lg:block"
                  href="https://supabase.com/dashboard"
                >
                  <span className="truncate">Sign Up</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <main className="container mx-auto my-10">
        <section className="flex flex-col items-center justify-center py-2 mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold">
              Accumulate Small Wins for Big Gains
            </h1>
            <p className="mt-4 text-2xl">
              Compound interest is the eighth wonder of the world. <br />
              He who understands it, earns it;
            </p>
            <div className="mt-8">
              <a
                href="#"
                className="text-white bg-black hover:bg-black font-medium py-2 px-4 rounded mr-4"
              >
                Get Started
              </a>
            </div>
          </div>
        </section>

        <section className="text-center mt-10">
          <h3 className="h2">Join the community</h3>
          <p className="p">
            Be a part of the community, share your investment experience, tips,
            and ideas
          </p>
          <div className="my-8 flex justify-center gap-2">
            <a
              target="_blank"
              tabIndex={-1}
              type="button"
              className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-scale-1200 bg-scale-100 hover:bg-scale-300 border-scale-600 hover:border-scale-700 dark:border-scale-700 hover:dark:border-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 shadow-sm text-sm leading-4 px-3 py-2"
              href="https://github.com/woohelps/yeildwise/discussions/"
            >
              <span className="truncate">GitHub discussions</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sbui-icon"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
            <a
              target="_blank"
              tabIndex={-1}
              type="button"
              className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-scale-1200 bg-scale-100 hover:bg-scale-300 border-scale-600 hover:border-scale-700 dark:border-scale-700 hover:dark:border-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 shadow-sm text-sm leading-4 px-3 py-2"
              href="https://discord.gg/JV64RnHbCj"
            >
              <span className="truncate">Discord</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sbui-icon"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
          </div>
        </section>

        {/* High Dividend Stock/ETF Information */}
        <section className="bg-white p-6 rounded shadow">
          <DividendTableServer />
        </section>

        {/* Recommendations based on category */}
        <section className="bg-white p-6 mt-6 rounded shadow ">
          <div className="w-full text-center">
            <h2 className="text-3xl font-semibold mb-4">
              Live Stock Trading Display
            </h2>
            <h3 className="text-gray-500 pl-12">
              - Accumulate Small Wins for Big Gains
            </h3>
          </div>
          <div className="flex flex-row justify-around">
            <div className="w-1/3">
              <StrategySection />
            </div>
            <div className="w-2/3">
              <HeldEquities />
            </div>
          </div>
        </section>

        {/* Stock Management Tool for premium users */}
        {/* <section className="bg-white p-6 mt-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Stock Management Tool</h2>
        </section> */}
      </main>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            YieldWise
          </a>
        </p>
      </footer>
    </div>
  );
}
