import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    category: "Orders & Delivery",
    questions: [
      {
        q: "How fast is delivery?",
        a: "We offer ultra-fast delivery within 10-30 minutes depending on your location and order size. Our delivery partners are stationed at nearby dark stores to ensure quick fulfillment.",
      },
      {
        q: "What is the minimum order value?",
        a: "There is no minimum order value. However, orders below ₹199 may incur a small delivery fee. Orders above ₹199 enjoy free delivery.",
      },
      {
        q: "Can I schedule a delivery for later?",
        a: "Currently, we focus on instant delivery. Scheduled delivery options are coming soon! Stay tuned for updates.",
      },
      {
        q: "What if my order is delayed?",
        a: "If your order is delayed beyond the estimated time, please contact our support team. We may offer compensation or refunds for significant delays.",
      },
    ],
  },
  {
    category: "Payments & Refunds",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major payment methods including Credit/Debit cards, UPI, Net Banking, and Cash on Delivery (COD). Digital wallets like Paytm and PhonePe are also supported.",
      },
      {
        q: "How do I get a refund?",
        a: "Refunds are processed within 5-7 business days to your original payment method. For COD orders, refunds are credited to your shopUP wallet for future purchases.",
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled before they are dispatched from our store. Once out for delivery, cancellation may not be possible. Contact support immediately for assistance.",
      },
    ],
  },
  {
    category: "Products & Quality",
    questions: [
      {
        q: "How do you ensure product freshness?",
        a: "Our products are sourced daily from verified suppliers and stored in temperature-controlled environments. Fruits, vegetables, and dairy products are checked for quality before dispatch.",
      },
      {
        q: "What if I receive a damaged or wrong product?",
        a: "We apologize for any inconvenience. Please report the issue within 24 hours with photos through the app or website. We'll arrange a replacement or full refund.",
      },
      {
        q: "Are your products priced higher than local stores?",
        a: "We strive to match or beat local store prices. Plus, we regularly offer exclusive discounts and deals that can save you even more!",
      },
    ],
  },
  {
    category: "Account & App",
    questions: [
      {
        q: "How do I create an account?",
        a: "Simply click on 'Register' and enter your phone number or email. Verify with OTP and you're ready to shop! You can also continue as a guest for quick orders.",
      },
      {
        q: "How do I update my delivery address?",
        a: "Go to your account settings and select 'Manage Addresses'. You can add, edit, or delete addresses anytime. Make sure to set your preferred default address.",
      },
      {
        q: "Is my personal information secure?",
        a: "Absolutely. We use industry-standard encryption to protect your data. Your payment information is never stored on our servers and is processed through secure payment gateways.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <MainLayout>
      <div className="container-main py-6 md:py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Find answers to common questions about shopUP
            </p>
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8 max-w-3xl">
          {faqData.map((section, index) => (
            <div key={index}>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                {section.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {section.questions.map((item, qIndex) => (
                  <AccordionItem
                    key={qIndex}
                    value={`${index}-${qIndex}`}
                    className="bg-card border border-border rounded-xl px-4"
                  >
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 p-6 bg-muted rounded-2xl max-w-3xl">
          <h3 className="font-semibold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Our support team is available 24/7 to help you with any queries.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:support@shopup.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Email Support
            </a>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-primary text-primary font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQ;
