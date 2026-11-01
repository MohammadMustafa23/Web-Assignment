const currentYear = new Date().getFullYear();

const footerLinks = {
  explore: [
    { label: "About Us", href: "/#our-story" },
    { label: "Our Team", href: "/#our-team" },
    { label: "Services", href: "/#expertise" },
    { label: "Products", href: "/#products" },
  ],
  resources: [
    { label: "Case Studies", href: "/#case-studies" },
    { label: "BitElevate", href: "/#bitelevate" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/#blog" },
  ],
  legal: [
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
    { label: "Privacy", href: "/privacy" },
  ],
};

/* -----------------------------------------
   Footer Icons
----------------------------------------- */

function FooterIcon({ name, className = "h-5 w-5" }) {
  const icons = {
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 7 9-7" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z" />
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    arrow: (
      <>
        <path d="M7 17 17 7M7 7h10v10" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

/* -----------------------------------------
   Social Icons
----------------------------------------- */

function SocialIcon({ name }) {
  const icons = {
    linkedin: (
      <>
        <path d="M5 8v11M5 5v.01M9 19v-6a4 4 0 0 1 8 0v6M9 12v7" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    facebook: (
      <path d="M15 21v-8h3l.5-4H15V7c0-1.2.4-2 2-2h2V1.4C18.3 1.2 17.3 1 16 1c-3 0-5 1.8-5 5v3H8v4h3v8h4Z" />
    ),
    x: <path d="m4 4 16 16M20 4 4 20m0-16h5l11 16h-5L4 4Z" />,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

/* -----------------------------------------
   Reusable Footer Link Group
----------------------------------------- */

function FooterLinkGroup({ title, links }) {
  return (
    <div>
      <h3 className="mb-5 text-lg font-bold text-teal-800">{title}</h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-[15px] text-slate-700 transition-colors duration-200 hover:text-teal-700 focus-visible:outline-none focus-visible:text-teal-800"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -----------------------------------------
   Main Footer
----------------------------------------- */

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-teal-100 bg-gradient-to-b from-[#f8fcfc] to-[#f0f9f9]"
    >
      <div className="mx-auto max-w-[1440px] px-5 pb-6 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.9fr_1.15fr_1.2fr] lg:gap-8">
          {/* Brand Section */}
          <div className="lg:pr-5">
            <a
              href="/"
              aria-label="Cynbit home"
              className="inline-flex items-center gap-3"
            >
              <svg
                viewBox="0 0 44 38"
                fill="none"
                className="h-10 w-10"
                aria-hidden="true"
              >
                <path
                  d="m8 23 5-5m-5 5a7 7 0 1 1-10-10l6-6a7 7 0 0 1 10 10"
                  transform="translate(5 4)"
                  stroke="#1675F9"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="m36 15-5 5m5-5a7 7 0 1 0-10 10l-6 6a7 7 0 0 0-10-10"
                  transform="translate(-4 -3)"
                  stroke="#1675F9"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>

              <span className="text-3xl font-extrabold tracking-tight text-slate-950">
                Cynbit
              </span>
            </a>

            <p className="mt-6 max-w-[330px] text-[15px] leading-7 text-slate-700">
              A technology partner for building scalable, intelligent, and
              high-impact digital solutions.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-100 text-slate-700 transition hover:-translate-y-1 hover:border-teal-400 hover:bg-teal-50 hover:text-teal-800"
              >
                <SocialIcon name="linkedin" />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-100 text-slate-700 transition hover:-translate-y-1 hover:border-teal-400 hover:bg-teal-50 hover:text-teal-800"
              >
                <SocialIcon name="instagram" />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-100 text-slate-700 transition hover:-translate-y-1 hover:border-teal-400 hover:bg-teal-50 hover:text-teal-800"
              >
                <SocialIcon name="facebook" />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-100 text-slate-700 transition hover:-translate-y-1 hover:border-teal-400 hover:bg-teal-50 hover:text-teal-800"
              >
                <SocialIcon name="x" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="border-t border-teal-100 pt-7 sm:border-t-0 sm:pt-0 lg:border-l lg:pl-8">
            <FooterLinkGroup title="Explore" links={footerLinks.explore} />
          </div>

          {/* Resources */}
          <div className="border-t border-teal-100 pt-7 sm:border-t-0 sm:pt-0 lg:border-l lg:pl-8">
            <FooterLinkGroup title="Resources" links={footerLinks.resources} />
          </div>

          {/* Contact */}
          <div className="border-t border-teal-100 pt-7 sm:border-t-0 sm:pt-0 lg:border-l lg:pl-8">
            <h3 className="mb-6 text-lg font-bold text-teal-800">
              Get in Touch
            </h3>

            <div className="space-y-5">
              <a
                href="mailto:hello@cynbit.in"
                className="group flex items-start gap-4 text-[15px] text-slate-800 transition hover:text-teal-800"
              >
                <FooterIcon
                  name="email"
                  className="mt-0.5 h-6 w-6 shrink-0 text-teal-800"
                />
                <span>hello@cynbit.in</span>
              </a>

              <a
                href="tel:+919001012345"
                className="group flex items-start gap-4 text-[15px] text-slate-800 transition hover:text-teal-800"
              >
                <FooterIcon
                  name="phone"
                  className="mt-0.5 h-6 w-6 shrink-0 text-teal-800"
                />
                <span>+91 90010 12345</span>
              </a>

              <div className="flex items-start gap-4 text-[15px] leading-6 text-slate-800">
                <FooterIcon
                  name="location"
                  className="mt-1 h-6 w-6 shrink-0 text-teal-800"
                />

                <address className="not-italic">
                  32/115, Pratap Nagar,
                  <br />
                  Jaipur, Rajasthan 302033
                </address>
              </div>
            </div>
          </div>

          {/* Start a Project CTA */}
          <div className="rounded-3xl border border-teal-100 bg-[#eaf6f6] p-7 lg:p-8">
            <h3 className="text-2xl font-bold tracking-tight text-slate-950">
              Start a Project
            </h3>

            <p className="mt-4 text-[15px] leading-7 text-slate-700">
              Have an idea? Let's turn it into a scalable solution together.
            </p>

            <a
              href="/#contact"
              className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-teal-800 to-teal-700 px-5 text-base font-bold text-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
            >
              Get in Touch
              <FooterIcon name="arrow" className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-14 flex flex-col gap-5 border-t border-teal-200/80 pt-7 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p className="text-sm leading-6 text-slate-600">
            © {currentYear} Cynbit Technologies. Demo Project for Educational
            Purpose.
          </p>

          <nav
            aria-label="Legal navigation"
            className="flex flex-wrap items-center gap-7"
          >
            {footerLinks.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-600 transition hover:text-teal-800"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
