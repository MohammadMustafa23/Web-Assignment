import { useEffect, useMemo, useRef, useState } from "react";

/* -----------------------------------------
   Navigation configuration
----------------------------------------- */

const companyLinks = [
  {
    title: "Our Story",
    description: "The vision behind Cynbit.",
    href: "/#our-story",
    icon: "story",
  },
  {
    title: "Our Team",
    description: "Meet the architects.",
    href: "/#our-team",
    icon: "team",
  },
  {
    title: "Careers",
    description: "Join the revolution.",
    href: "/careers",
    icon: "career",
  },
  {
    title: "Social Impact",
    description: "Our global footprint.",
    href: "/#social-impact",
    icon: "impact",
  },
];

const navigationLinks = [
  { title: "Expertise", href: "/#expertise" },
  { title: "BitElevate", href: "/#bitelevate" },
  { title: "Case Studies", href: "/#case-studies" },
  { title: "Careers", href: "/careers" },
  { title: "Contact", href: "/#contact" },
];

const searchLinks = [...navigationLinks, ...companyLinks];

/* -----------------------------------------
   SVG Icons
----------------------------------------- */

function Logo() {
  return (
    <a
      href="/"
      aria-label="Cynbit homepage"
      className="flex shrink-0 items-center gap-2"
    >
      <svg
        viewBox="0 0 44 38"
        fill="none"
        className="h-8 w-9"
        aria-hidden="true"
      >
        <path
          d="M17.5 25.5L12.5 30.5C9.5 33.5 4.5 33.5 1.5 30.5C-1.5 27.5 -1.5 22.5 1.5 19.5L9 12"
          transform="translate(3 2)"
          stroke="#1675F9"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M26.5 12.5L31.5 7.5C34.5 4.5 39.5 4.5 42.5 7.5C45.5 10.5 45.5 15.5 42.5 18.5L35 26"
          transform="translate(-3 2)"
          stroke="#1675F9"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M13 23L26 10"
          stroke="#1675F9"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      <span className="text-[25px] font-extrabold tracking-tight text-slate-950">
        Cynbit
      </span>
    </a>
  );
}

function ChevronDown({ className = "" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRight({ className = "" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 15 15 5M6 5h9v9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle
        cx="10.8"
        cy="10.8"
        r="6.8"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m16 16 5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -----------------------------------------
   Company menu icons
----------------------------------------- */

function CompanyIcon({ type }) {
  const iconPaths = {
    story: (
      <>
        <path d="M3 8 12 3l9 5-9 5-9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    team: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 20c0-3.5 2.5-6 6-6s6 2.5 6 6M15 15c3.5 0 6 2 6 5" />
      </>
    ),
    career: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
      </>
    ),
    impact: (
      <>
        <path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2 4.5 4.5 0 0 1 8 2c0 6-8 11-8 11Z" />
        <path d="m9 11 2 2 4-4" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[19px] w-[19px]"
      aria-hidden="true"
    >
      {iconPaths[type]}
    </svg>
  );
}

/* -----------------------------------------
   Main Navbar
----------------------------------------- */

export default function Navbar() {
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const headerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter navigation links for quick search.
  const filteredSearchLinks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return searchLinks;

    return searchLinks.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  // Close menus when clicking outside or pressing Escape.
  useEffect(() => {
    function handleOutsideClick(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setCompanyOpen(false);
        setMobileOpen(false);
        setSearchOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setCompanyOpen(false);
        setMobileOpen(false);
        setSearchOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Focus search field when opened.
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  function closeNavigation() {
    setCompanyOpen(false);
    setMobileOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  }

  function toggleCompany() {
    setCompanyOpen((previous) => !previous);
    setSearchOpen(false);
  }

  function toggleSearch() {
    setSearchOpen((previous) => !previous);
    setCompanyOpen(false);
    setMobileOpen(false);
    setSearchQuery("");
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[68px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 lg:flex xl:gap-8"
        >
          {/* Company Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={toggleCompany}
              aria-expanded={companyOpen}
              aria-haspopup="true"
              aria-controls="company-dropdown"
              className="inline-flex items-center gap-1.5 py-3 text-[14px] font-semibold text-slate-800 transition hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-4"
            >
              Company
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  companyOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {companyOpen && (
              <div
                id="company-dropdown"
                role="menu"
                className="absolute left-0 top-full mt-2 w-[270px] rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_16px_45px_rgba(15,23,42,0.12)] animate-in fade-in slide-in-from-top-2 duration-200"
              >
                {companyLinks.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    role="menuitem"
                    onClick={closeNavigation}
                    className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-teal-50 focus-visible:bg-teal-50 focus-visible:outline-none"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 transition group-hover:bg-teal-100">
                      <CompanyIcon type={item.icon} />
                    </span>

                    <span className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-bold text-slate-900">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {item.description}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Other navigation links */}
          {navigationLinks.map((item) => (
            <a
              key={item.title}
              href={item.href}
              onClick={closeNavigation}
              className="whitespace-nowrap py-3 text-[14px] font-semibold text-slate-800 transition hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-4"
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 lg:flex">
          {/* Search */}
          <button
            type="button"
            onClick={toggleSearch}
            aria-label={searchOpen ? "Close search" : "Open navigation search"}
            aria-expanded={searchOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-800 transition hover:bg-slate-100 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            {searchOpen ? <CloseIcon /> : <SearchIcon />}
          </button>

          {/* Main CTA */}
          <a
            href="/#contact"
            onClick={closeNavigation}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-800 to-teal-700 px-6 text-[13px] font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
          >
            Get in Touch
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleSearch}
            aria-label={searchOpen ? "Close search" : "Open navigation search"}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-800 transition hover:bg-slate-100"
          >
            {searchOpen ? <CloseIcon /> : <SearchIcon />}
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileOpen((previous) => !previous);
              setSearchOpen(false);
            }}
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-900 transition hover:bg-slate-100"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Search Panel */}
      {searchOpen && (
        <div className="absolute left-0 top-full w-full border-b border-slate-200 bg-white px-5 py-5 shadow-xl sm:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-100">
              <SearchIcon />

              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search Cynbit pages..."
                aria-label="Search website navigation"
                className="h-12 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />

              <span className="hidden whitespace-nowrap text-[11px] text-slate-400 sm:block">
                Navigation
              </span>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {searchQuery ? "Search results" : "Quick links"}
              </p>

              {filteredSearchLinks.length > 0 ? (
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {filteredSearchLinks.map((item) => (
                    <a
                      key={`${item.title}-${item.href}`}
                      href={item.href}
                      onClick={closeNavigation}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-teal-50 hover:text-teal-800"
                    >
                      {item.title}
                      {item.description && (
                        <span className="ml-2 text-xs font-normal text-slate-400">
                          {item.description}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="rounded-lg bg-slate-50 px-3 py-4 text-sm text-slate-500">
                  No matching pages found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute left-0 top-full max-h-[calc(100vh-68px)] w-full overflow-y-auto border-b border-slate-200 bg-white px-5 pb-6 pt-3 shadow-xl lg:hidden"
        >
          {/* Mobile Company Dropdown */}
          <div className="border-b border-slate-100 py-1">
            <button
              type="button"
              onClick={toggleCompany}
              aria-expanded={companyOpen}
              className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-slate-900"
            >
              Company
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  companyOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {companyOpen && (
              <div className="mb-3 space-y-1 pl-3">
                {companyLinks.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    onClick={closeNavigation}
                    className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-teal-50 hover:text-teal-800"
                  >
                    <span className="font-semibold">{item.title}</span>
                    <span className="mt-0.5 block text-xs text-slate-400">
                      {item.description}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Links */}
          {navigationLinks.map((item) => (
            <a
              key={item.title}
              href={item.href}
              onClick={closeNavigation}
              className="block border-b border-slate-100 py-3.5 text-sm font-semibold text-slate-800 transition hover:text-teal-700"
            >
              {item.title}
            </a>
          ))}

          {/* Mobile CTA */}
          <a
            href="/#contact"
            onClick={closeNavigation}
            className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-full bg-teal-800 px-5 text-sm font-bold text-white transition hover:bg-teal-900"
          >
            Get in Touch
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>
      )}
    </header>
  );
}
