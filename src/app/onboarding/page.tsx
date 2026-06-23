import { OnboardingStepper } from "../components/OnboardingStepper";

export function Onboarding() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5 py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#25D366] opacity-[0.05] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[600px]">
        <div className="text-center mb-10">
          <h1 className="text-black text-2xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
            Set Up Your Business
          </h1>
          <p className="text-[#888] text-sm mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Get your AI agent ready in under 3 minutes
          </p>
        </div>

        <OnboardingStepper />
      </div>
    </div>
  );
}
