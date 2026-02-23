import { Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata = {
  title: "Contact Us | Mudita Minerals",
  description:
    "Get in touch with Mudita Minerals. Questions about orders, products, or custom requests? We'd love to hear from you.",
};

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email",
    detail: "hello@muditaminerals.com",
    sub: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Location",
    detail: "Las Vegas, Nevada",
    sub: "Online only — no storefront",
  },
  {
    icon: Clock,
    title: "Hours",
    detail: "Mon – Fri, 9am – 5pm PST",
    sub: "Weekend orders ship Monday",
  },
  {
    icon: MessageCircle,
    title: "Social",
    detail: "@muditaminerals",
    sub: "Follow us for new arrivals",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16 md:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <ScrollReveal>
          <div className="mb-12 sm:mb-16">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Get in Touch
            </p>
            <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-bone sm:text-4xl md:text-5xl">
              Contact Us
            </h1>
            <div className="mt-4 h-0.5 w-16 bg-gold" />
          </div>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Contact form */}
          <ScrollReveal>
            <div className="rounded-md border border-stone/50 bg-charcoal p-6 sm:p-8">
              <h2 className="mb-6 font-heading text-xl font-bold uppercase tracking-wider text-bone">
                Send Us a Message
              </h2>
              <form className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-sm border border-stone/50 bg-black px-4 py-3 text-sm text-bone placeholder:text-muted/50 outline-none transition-colors duration-200 focus:border-gold"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full rounded-sm border border-stone/50 bg-black px-4 py-3 text-sm text-bone placeholder:text-muted/50 outline-none transition-colors duration-200 focus:border-gold"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full rounded-sm border border-stone/50 bg-black px-4 py-3 text-sm text-bone outline-none transition-colors duration-200 focus:border-gold cursor-pointer"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Question</option>
                    <option value="custom">Custom Request</option>
                    <option value="wholesale">Wholesale / Bulk</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full rounded-sm border border-stone/50 bg-black px-4 py-3 text-sm text-bone placeholder:text-muted/50 outline-none transition-colors duration-200 focus:border-gold resize-none"
                    placeholder="How can we help?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-sm bg-gold py-3 font-heading font-bold uppercase tracking-wider text-black transition-colors duration-200 hover:bg-gold-light sm:w-auto sm:px-10"
                >
                  Send Message
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* Right: Contact info cards */}
          <div className="space-y-4">
            {CONTACT_INFO.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="flex items-start gap-4 rounded-md border border-stone/50 bg-charcoal p-5 transition-colors duration-300 hover:border-gold/30">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm border border-stone/50 bg-stone/30">
                    <item.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-bone">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-bone/80">{item.detail}</p>
                    <p className="mt-0.5 text-xs text-muted">{item.sub}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* Extra note */}
            <ScrollReveal delay={0.4}>
              <div className="mt-6 rounded-md border border-gold/20 bg-gold/5 p-5">
                <p className="text-sm leading-relaxed text-muted">
                  <span className="font-bold text-gold">Custom orders welcome.</span> Looking for a
                  specific mineral, a bulk order for an event, or a unique gift? Let us know — we
                  love helping people find the perfect piece.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
