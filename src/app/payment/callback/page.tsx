import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { billingService } from "../../../services/billing";

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [error, setError] = useState("");

  useEffect(() => {
    const reference = searchParams.get("reference");
    const businessId = searchParams.get("business_id");
    const plan = searchParams.get("plan");
    const billingCycle = searchParams.get("billing_cycle");
    const txStatus = searchParams.get("status");

    if (txStatus === "cancelled") {
      setStatus("error");
      setError("Payment was cancelled.");
      return;
    }

    if (!reference || !businessId || !plan) {
      setStatus("error");
      setError("Invalid payment response. Missing required parameters.");
      return;
    }

    billingService
      .verifyPayment(reference, Number(businessId), plan, billingCycle || "monthly")
      .then(() => {
        setStatus("success");
        setTimeout(() => navigate("/dashboard"), 3000);
      })
      .catch((err: any) => {
        setStatus("error");
        setError(err?.message || "Payment verification failed. Please contact support.");
      });
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md w-full mx-4 text-center">
        {status === "verifying" && (
          <>
            <Loader2 size={48} className="animate-spin text-[#37b24d] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              Verifying your payment...
            </h2>
            <p className="text-[#6b7280] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Please wait while we confirm your payment with Paystack.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle size={48} className="text-[#37b24d] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              Payment Successful!
            </h2>
            <p className="text-[#6b7280] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Your subscription has been updated. Redirecting to dashboard...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              Payment Failed
            </h2>
            <p className="text-[#6b7280] text-sm mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              {error}
            </p>
            <button
              onClick={() => navigate("/pricing")}
              className="bg-[#37b24d] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2d9a3e] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Back to Pricing
            </button>
          </>
        )}
      </div>
    </div>
  );
}
