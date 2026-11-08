
export default function AuthLayout({ children }) {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-[1440px] grid-cols-1 items-center gap-8 px-4 py-6 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:px-12 lg:py-10 xl:px-16">
      {/* Left: Product preview */}
      <section className="relative hidden min-h-[620px] overflow-hidden rounded-[32px] bg-secondary p-8 text-secondary-text shadow-2xl shadow-black/10 sm:p-10 lg:flex lg:flex-col lg:justify-between xl:p-12">
        {/* Decorative background shapes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative z-10">
          <div className="mb-12 inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-lg font-bold text-accent-text shadow-lg shadow-black/10">
              R
            </span>

            <div>
              <p className="mb-0 text-lg font-semibold tracking-tight">
                RentApp
              </p>
              <p className="mb-0 text-xs text-secondary-text/65">
                Property management
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary-text/85">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Your rental workspace
          </span>

          <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.18] tracking-tight text-secondary-text xl:text-[46px]">
            Your properties.
            <br />
            <span className="text-accent">One clear view.</span>
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-secondary-text/75 xl:text-base">
            Keep rent, tenants and property operations organized in one
            simple workspace designed to make your day easier.
          </p>
        </div>

        {/* Dashboard illustration */}
        <div className="relative z-10 mx-auto mt-10 w-full max-w-[560px] rounded-2xl border border-white/15 bg-[#0A171D]/70 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#FFBD76]" />
              <span className="text-xs font-medium text-white/85">
                Overview
              </span>
            </div>
            <span className="rounded-lg border border-white/10 px-2.5 py-1 text-[10px] text-white/55">
              This month
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <p className="mb-1 text-[10px] text-white/55">
                Properties
              </p>
              <p className="mb-0 text-2xl font-semibold text-white">
                18
              </p>
              <p className="mb-0 mt-1 text-[10px] text-[#FFBD76]">
                Across societies
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <p className="mb-1 text-[10px] text-white/55">
                Occupancy
              </p>
              <p className="mb-0 text-2xl font-semibold text-white">
                94%
              </p>
              <p className="mb-0 mt-1 text-[10px] text-[#8DD7BB]">
                Illustrative data
              </p>
            </div>

            <div className="col-span-2 rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:col-span-1">
              <p className="mb-1 text-[10px] text-white/55">
                Rent tracking
              </p>
              <p className="mb-0 text-2xl font-semibold text-white">
                <span className="text-[#FFBD76]">●</span> Active
              </p>
              <p className="mb-0 mt-1 text-[10px] text-white/50">
                Monthly overview
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="mb-1 text-xs font-medium text-white/90">
                  Monthly collection
                </p>
                <p className="mb-0 text-[10px] text-white/45">
                  Sample visualization
                </p>
              </div>

              <span className="rounded-md bg-[#FFBD76]/10 px-2 py-1 text-[10px] text-[#FFBD76]">
                Rent overview
              </span>
            </div>

            <div
              aria-label="Illustrative monthly rent collection bar chart"
              role="img"
              className="flex h-24 items-end gap-2"
            >
              {[38, 56, 45, 72, 60, 86, 67, 95, 76, 88, 70, 100].map(
                (height, index) => (
                  <div
                    key={index}
                    className={`flex-1 rounded-t-sm ${
                      index === 7
                        ? "bg-[#FFBD76]"
                        : "bg-[#317873]/90"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                )
              )}
            </div>

            <div className="mt-2 flex justify-between text-[9px] text-white/40">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Dec</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] text-white/65">
            <span className="rounded-full border border-white/10 px-3 py-1.5">
              Properties
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1.5">
              Tenants
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1.5">
              Rent & utilities
            </span>
          </div>
        </div>

        <p className="relative z-10 mb-0 mt-8 text-xs text-secondary-text/55">
          A simpler way to manage rentals.
        </p>
      </section>

      {/* Right: Login form */}
      <section className="flex w-full items-center justify-center">
        {children}
      </section>
    </div>
  );
}
