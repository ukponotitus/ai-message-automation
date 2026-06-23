import { BrowserRouter, Routes, Route, useParams, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "../context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { WhatWeOffer } from "./components/WhatWeOffer";
import { FAQ } from "./components/FAQ";
import PricingPage from "./pricing/page";
import { Contact } from "./components/Contact";
import { SocialProof } from "./components/SocialProof";
import { BeforeAfter } from "./components/BeforeAfter";
import { UseCaseTabs } from "./components/UseCaseTabs";
import { Footer } from "./components/Footer";
import { ProductPage } from "./components/ProductPage";
import Privacy from "./privacy/page";
import { AboutPage } from "./about-us/page";
import { Onboarding } from "./onboarding/page";
import { Dashboard } from "./dashboard/page";
import PaymentCallbackPage from "./payment/callback/page";
import { SignIn } from "./signIn/page";
import { SignUp } from "./signUp/page";
import { ProtectedRoute } from "./components/ProtectedRoute";


function HomePage() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <HowItWorks />
      <BeforeAfter />
      <UseCaseTabs />
      <WhatWeOffer />
      <FAQ />
      <Contact />
    </main>
  );
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function ProductPageWrapper() {
  const { productId } = useParams();
  return <ProductPage productId={productId || ""} />;
}

function SolutionPage() {
  const { solutionId } = useParams();
  const solutions: Record<string, { title: string; desc: string }> = {
    creators: { title: "For Creators", desc: "Build your brand and engage followers automatically across Instagram, TikTok, and WhatsApp." },
    ecommerce: { title: "For eCommerce", desc: "Automate order updates, abandoned cart follow-ups, and customer support on WhatsApp." },
    agencies: { title: "For Agencies", desc: "Manage multiple clients' WhatsApp automation from a single dashboard." },
    "lead-gen": { title: "Lead Generation", desc: "Capture, qualify, and route leads automatically from social media to your sales team." },
    support: { title: "Customer Support", desc: "24/7 AI-powered support that handles FAQs, tickets, and escalations." },
    broadcasts: { title: "Broadcast Campaigns", desc: "Send targeted promotions and updates to customer segments at scale." },
  };
  const page = solutions[solutionId || ""];
  if (!page) {
    return <div className="min-h-screen flex items-center justify-center bg-white pt-20"><p className="text-[#6b7280]">Page not found</p></div>;
  }
  return (
    <div className="min-h-screen bg-white pt-[120px] pb-28">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 text-center">
        <h1 className="text-[#1a1a2e] text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.04em] mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>{page.title}</h1>
        <p className="text-[#4b5563] max-w-[560px] mx-auto text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>{page.desc}</p>
        <a href="/auth?redirect=/onboarding" className="inline-flex items-center gap-2 bg-[#37b24d] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#2b8a3e] transition-colors mt-8" style={{ fontFamily: "'Inter', sans-serif" }}>
          Get Started
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen overflow-x-hidden bg-white">
          <Routes>
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/onboarding" element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            } />

            <Route path="/payment/callback" element={<PaymentCallbackPage />} />

            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/product/:productId" element={<ProductPageWrapper />} />
              <Route path="/solutions/:solutionId" element={<SolutionPage />} />
            </Route>
          </Routes>
          <Toaster />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}