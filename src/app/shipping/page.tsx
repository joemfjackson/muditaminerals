import Link from "next/link";
import { ArrowRight, Truck, RotateCcw, Shield, Package } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata = {
  title: "Shipping & Returns | Mudita Minerals",
  description:
    "Shipping rates, delivery times, and return policy for Mudita Minerals. Free shipping on orders over $75.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16 md:pt-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <ScrollReveal>
          <div className="mb-12 sm:mb-16">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Policies
            </p>
            <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-bone sm:text-4xl md:text-5xl">
              Shipping & Returns
            </h1>
            <div className="mt-4 h-0.5 w-16 bg-gold" />
          </div>
        </ScrollReveal>

        {/* Quick stats */}
        <ScrollReveal>
          <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Truck, label: "Free Shipping", sub: "Orders $75+" },
              { icon: Package, label: "Fast Processing", sub: "1–2 days" },
              { icon: RotateCcw, label: "Easy Returns", sub: "30 days" },
              { icon: Shield, label: "Insured", sub: "Every shipment" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-md border border-stone/50 bg-charcoal p-4 text-center"
              >
                <stat.icon className="mx-auto mb-2 h-5 w-5 text-gold" />
                <p className="font-heading text-xs font-bold uppercase tracking-wider text-bone sm:text-sm">
                  {stat.label}
                </p>
                <p className="text-[10px] text-muted sm:text-xs">{stat.sub}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Shipping section */}
        <ScrollReveal>
          <section className="mb-12">
            <h2 className="mb-6 font-heading text-xl font-bold uppercase tracking-wider text-bone">
              Shipping
            </h2>
            <div className="space-y-6 text-sm leading-relaxed text-muted">
              <div className="rounded-md border border-stone/50 bg-charcoal overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone/50 bg-stone/20">
                      <th className="px-5 py-3 text-left font-heading text-xs font-bold uppercase tracking-wider text-bone">
                        Method
                      </th>
                      <th className="px-5 py-3 text-left font-heading text-xs font-bold uppercase tracking-wider text-bone">
                        Delivery
                      </th>
                      <th className="px-5 py-3 text-left font-heading text-xs font-bold uppercase tracking-wider text-bone">
                        Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone/50">
                    <tr>
                      <td className="px-5 py-3 text-bone">Standard Shipping</td>
                      <td className="px-5 py-3">3–7 business days</td>
                      <td className="px-5 py-3">
                        <span className="text-gold">Free</span> over $75 / $5.95
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 text-bone">Expedited Shipping</td>
                      <td className="px-5 py-3">2–3 business days</td>
                      <td className="px-5 py-3">$12.95</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 text-bone">Priority / Overnight</td>
                      <td className="px-5 py-3">1–2 business days</td>
                      <td className="px-5 py-3">$24.95</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-3">
                <p>
                  <strong className="text-bone">Processing time:</strong> Orders placed before 2pm
                  PST on weekdays typically ship same-day or next business day. Weekend orders ship
                  the following Monday.
                </p>
                <p>
                  <strong className="text-bone">Tracking:</strong> You&apos;ll receive a shipping
                  confirmation email with tracking information once your order ships.
                </p>
                <p>
                  <strong className="text-bone">Packaging:</strong> Every item is individually
                  wrapped in protective foam and tissue, then placed in a sturdy box with extra
                  padding. Fragile specimens (clusters, geodes, towers) receive additional
                  reinforcement.
                </p>
                <p>
                  <strong className="text-bone">Insurance:</strong> All shipments are insured
                  against loss or damage during transit at no extra cost.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Returns section */}
        <ScrollReveal>
          <section className="mb-12">
            <h2 className="mb-6 font-heading text-xl font-bold uppercase tracking-wider text-bone">
              Returns & Exchanges
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted">
              <p>
                We want you to love every piece in your collection. If for any reason you&apos;re
                not completely satisfied, we offer a hassle-free return policy.
              </p>

              <div className="rounded-md border border-stone/50 bg-charcoal p-5 space-y-3">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-bone">
                  30-Day Return Policy
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Items may be returned within 30 days of delivery.</li>
                  <li>Items must be in their original, undamaged condition.</li>
                  <li>
                    Email{" "}
                    <span className="text-gold">hello@muditaminerals.com</span>{" "}
                    with your order number to initiate a return.
                  </li>
                  <li>We&apos;ll send a prepaid return label within 24 hours.</li>
                  <li>Refunds are processed within 3–5 business days of receiving the return.</li>
                </ul>
              </div>

              <div className="rounded-md border border-gold/20 bg-gold/5 p-5 space-y-2">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-gold">
                  Damaged Items
                </h3>
                <p>
                  If your item arrives damaged, please email us with photos within 48 hours of
                  delivery. We&apos;ll send a replacement or issue a full refund immediately — no
                  need to return the damaged item.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-bone">
                  Non-Returnable Items
                </h3>
                <p>
                  For hygiene and safety reasons, the following items cannot be returned: earrings,
                  items marked as final sale, and custom/special orders.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Questions CTA */}
        <ScrollReveal>
          <div className="rounded-md border border-stone/50 bg-charcoal p-8 text-center">
            <h2 className="mb-2 font-heading text-xl font-bold uppercase tracking-wider text-bone">
              Have a Question?
            </h2>
            <p className="mb-6 text-sm text-muted">
              Check our FAQ or reach out directly — we&apos;re always happy to help.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 rounded-sm border-2 border-stone px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider text-bone transition-colors duration-200 hover:border-gold hover:text-gold"
              >
                View FAQ
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 font-heading font-bold uppercase tracking-wider text-black transition-colors duration-200 hover:bg-gold-light"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
