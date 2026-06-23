import { api, Subscription } from "../lib/api";

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "";

export const billingService = {
  getSubscription: (businessId?: number) => {
    const params = businessId ? `?business_id=${businessId}` : "";
    return api.get<Subscription>(`/billing/subscription/${params}`);
  },

  initializePayment: (businessId: number, plan: string, billingCycle: "monthly" | "annual") => {
    return api.post<{ authorization_url: string; reference: string; access_code: string }>(
      "/billing/initialize/",
      { business_id: businessId, plan, billing_cycle: billingCycle }
    );
  },

  verifyPayment: (reference: string, businessId: number, plan: string, billingCycle: string) => {
    return api.post<{ status: string; plan: string; billing_cycle: string; expires_at: string }>(
      "/billing/verify/",
      { reference, business_id: businessId, plan, billing_cycle: billingCycle }
    );
  },

  payWithPaystack: (plan: string, billingCycle: "monthly" | "annual", businessId: number, email: string, onCallback: (reference: string) => void) => {
    return billingService.initializePayment(businessId, plan, billingCycle).then((res) => {
      const handler = (window as any).PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email,
        amount: 0,
        ref: res.reference,
        onClose: () => {
          window.location.href = `/payment/callback?reference=${res.reference}&business_id=${businessId}&plan=${plan}&billing_cycle=${billingCycle}&status=cancelled`;
        },
        callback: (response: any) => {
          onCallback(response.reference);
        },
      });
      handler.openIframe();
      return res;
    });
  },
};
