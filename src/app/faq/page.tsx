import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FAQAccordion } from "./FAQAccordion";

export const metadata = {
  title: "FAQ | Mudita Minerals",
  description:
    "Frequently asked questions about Mudita Minerals — ordering, shipping, authenticity, crystal care, and more.",
};

const FAQ_SECTIONS = [
  {
    title: "Ordering & Payment",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) through our secure Stripe checkout. Apple Pay and Google Pay are also available.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "We process orders quickly! If you need to make changes, email us at hello@muditaminerals.com within 1 hour of placing your order. Once an order has shipped, we cannot modify it, but you can initiate a return.",
      },
      {
        question: "Do you offer gift wrapping?",
        answer:
          "Not yet, but it's coming soon! In the meantime, every order is carefully wrapped in protective packaging with a branded touch — perfect for gifting as-is.",
      },
      {
        question: "Are your prices in USD?",
        answer:
          "Yes, all prices on our site are listed in US Dollars (USD).",
      },
    ],
  },
  {
    title: "Shipping",
    items: [
      {
        question: "Do you offer free shipping?",
        answer:
          "Yes! We offer free standard shipping on all orders over $75 within the United States. Orders under $75 ship for a flat rate of $5.95.",
      },
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 3–7 business days within the US. Orders placed before 2pm PST on weekdays typically ship same-day or next business day.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Not at this time. We currently ship within the United States only. International shipping is something we're working on for the future.",
      },
      {
        question: "How are fragile items packaged?",
        answer:
          "Every specimen is individually wrapped in protective foam and tissue, then placed in a sturdy box with additional padding. We take extra care with delicate pieces like crystal clusters and geodes.",
      },
    ],
  },
  {
    title: "Products & Authenticity",
    items: [
      {
        question: "Are your crystals and minerals authentic?",
        answer:
          "Absolutely. Every piece we sell is 100% natural and authentic. We source directly from trusted mines and verified suppliers. We never sell synthetic, dyed, or heat-treated stones without clear labeling.",
      },
      {
        question: "Will my piece look exactly like the photo?",
        answer:
          "Natural minerals are unique by nature — no two pieces are identical. While we photograph each item accurately, slight variations in color, size, and formation are normal and part of what makes each piece special.",
      },
      {
        question: "How do I care for my crystals?",
        answer:
          "Most crystals can be gently cleaned with lukewarm water and a soft cloth. Avoid harsh chemicals and prolonged direct sunlight (which can fade some stones like amethyst). Some softer minerals like selenite should not be submerged in water. We include a care card with every order.",
      },
      {
        question: "Do you offer wholesale or bulk pricing?",
        answer:
          "Yes! For bulk orders, events, or wholesale inquiries, please contact us at hello@muditaminerals.com with details about what you're looking for and quantities needed.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy on all items. If you're not completely satisfied, you can return your purchase in its original condition for a full refund. See our Shipping & Returns page for complete details.",
      },
      {
        question: "How do I start a return?",
        answer:
          "Email us at hello@muditaminerals.com with your order number and reason for return. We'll send you a prepaid return label and instructions within 24 hours.",
      },
      {
        question: "What if my item arrives damaged?",
        answer:
          "We're sorry if that happens! Please email us with photos of the damage within 48 hours of delivery. We'll send a replacement or issue a full refund — no need to return the damaged item.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16 md:pt-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <ScrollReveal>
          <div className="mb-12 sm:mb-16">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Help Center
            </p>
            <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-bone sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h1>
            <div className="mt-4 h-0.5 w-16 bg-gold" />
          </div>
        </ScrollReveal>

        {/* FAQ Sections */}
        <div className="space-y-10">
          {FAQ_SECTIONS.map((section, si) => (
            <ScrollReveal key={section.title} delay={si * 0.08}>
              <div>
                <h2 className="mb-4 font-heading text-lg font-bold uppercase tracking-wider text-bone">
                  {section.title}
                </h2>
                <FAQAccordion items={section.items} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Still have questions? */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 rounded-md border border-stone/50 bg-charcoal p-8 text-center">
            <h2 className="mb-2 font-heading text-xl font-bold uppercase tracking-wider text-bone">
              Still Have Questions?
            </h2>
            <p className="mb-6 text-sm text-muted">
              We&apos;re here to help. Reach out and we&apos;ll get back to you within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-3 font-heading font-bold uppercase tracking-wider text-black transition-colors duration-200 hover:bg-gold-light"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
