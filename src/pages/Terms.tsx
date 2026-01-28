import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const Terms = () => {
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
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Last updated: January 2025
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-3xl">
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to shopUP. By accessing or using our website, mobile application, 
                and services (collectively, the "Platform"), you agree to be bound by these 
                Terms and Conditions. If you do not agree with any part of these terms, 
                please do not use our Platform.
              </p>
            </section>

            {/* Eligibility */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Eligibility
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                To use our services, you must:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Be at least 18 years of age or have parental consent</li>
                <li>Provide accurate and complete registration information</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Reside in an area where our delivery services are available</li>
              </ul>
            </section>

            {/* Account */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Account Registration
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                When you create an account with us, you agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Keep your account information current and accurate</li>
              </ul>
            </section>

            {/* Orders */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Orders & Pricing
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                All orders placed through our Platform are subject to acceptance and availability. 
                We reserve the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Refuse or cancel any order at our discretion</li>
                <li>Limit order quantities per customer</li>
                <li>Modify prices without prior notice</li>
                <li>Substitute products with similar alternatives when unavailable</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Prices displayed include applicable taxes unless otherwise stated. 
                Delivery charges may apply based on order value and location.
              </p>
            </section>

            {/* Delivery */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Delivery Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We strive to deliver your orders within the estimated timeframe. However:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Delivery times are estimates and not guaranteed</li>
                <li>You must be available to receive the order at the delivery address</li>
                <li>We are not liable for delays due to factors beyond our control</li>
                <li>Failed delivery attempts may result in order cancellation</li>
              </ul>
            </section>

            {/* Refunds */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Returns & Refunds
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Our return and refund policy:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Report issues within 24 hours of delivery with photographic evidence</li>
                <li>Perishable items may have different return policies</li>
                <li>Refunds are processed within 5-7 business days</li>
                <li>We may offer store credit or replacement at our discretion</li>
              </ul>
            </section>

            {/* User Conduct */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. User Conduct
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Use the Platform for any unlawful purpose</li>
                <li>Interfere with or disrupt the Platform's operation</li>
                <li>Attempt to gain unauthorized access to any part of the Platform</li>
                <li>Misuse promotional codes or offers</li>
                <li>Engage in fraudulent activities or false claims</li>
              </ul>
            </section>

            {/* Privacy */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. Privacy & Data
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. Our collection, use, and protection of your 
                personal information is governed by our Privacy Policy, which forms part of 
                these Terms. By using our Platform, you consent to our data practices as 
                described in the Privacy Policy.
              </p>
            </section>

            {/* Liability */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, shopUP shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages arising 
                from your use of the Platform. Our total liability shall not exceed the 
                amount paid by you for the specific order giving rise to the claim.
              </p>
            </section>

            {/* Changes */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                10. Changes to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be 
                effective immediately upon posting on the Platform. Your continued use of 
                the Platform after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: legal@shopup.com</p>
                <p>Phone: +1 (234) 567-890</p>
                <p>Address: 123 Commerce Street, Business District, City 10001</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Terms;
