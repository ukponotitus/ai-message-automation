import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";


const imgWoman = "/TestmonialsSection-1/imgWoman.png";
const imgMan = "/TestmonialsSection-1/imgMan.png";
const imgProfileSmall = "/TestmonialsSection-1/imgProfileSmall.png";

const testimonials = [
  {
    id: 1,
    type: "gradient",
    name: "Amaka Eze",
    role: "Founder, GlowSkin Beauty",
    quote: `"Our WhatsApp workflow is now 80% automated, saving us hours every week. The AI responses are seamless and efficient!"`,
  },
  {
    id: 2,
    type: "image",
    name: "Ngozi Nwachukwu",
    role: "MD at Lagosbites",
    quote: `"From automated lead capture to 24/7 customer support, AutomateNG transformed our processes. Highly recommend this team!"`,
    image: imgWoman,
  },
  {
    id: 3,
    type: "gradient",
    name: "Fatima Aliyu",
    role: "CEO at StyleHouse",
    quote: `“Custom WhatsApp bots used to be complex. With AutomateNG, we built and launched our ordering bot in 3 days. Super intuitive.”`,
    smallProfile: imgProfileSmall,
  },
  {
    id: 4,
    type: "image",
    name: "Chidinma Uche",
    role: "Director at PrimeCare Clinics",
    quote: `“Thanks to AutomateNG, our appointment reminders run on autopilot with zero human errors. Game-changer for our clinic.”`,
    image: imgMan,
  },
  {
    id: 5,
    type: "gradient",
    name: "Tunde Bakare",
    role: "Head of Sales, NaijaTech",
    quote: `"Our conversion rate jumped by 40% after implementing their lead qualification bots. The setup was incredibly fast."`,
  },
  {
    id: 6,
    type: "image",
    name: "Oluwaseun Adeyemi",
    role: "Founder, QuickLogistics",
    quote: `"Customers now track their packages directly on WhatsApp. The automation saved our support team from endless calls."`,
    image: imgWoman, // Reusing for dummy
  }
];

export function Testimonials() {
  // Duplicate array for infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="bg-black flex flex-col gap-[64px] items-center px-[40px] py-[112px] relative w-full overflow-hidden">
      <div className="flex flex-col gap-[23px] items-center max-w-[1120px] w-full z-10 relative">
        <div className="flex flex-col items-start w-full">
          <p className="font-['Inter'] font-medium text-[#32cd87] text-[13.8px] tracking-[2.8px] leading-[21px] uppercase m-0">
            TESTIMONIALS
          </p>
        </div>
        <div className="flex flex-col items-start w-full">
          <h2 className="font-['Poppins'] font-normal text-[64px] text-white tracking-[-3.2px] leading-[76.8px] m-0">
            What Our Clients Say
          </h2>
        </div>
      </div>

      <div className="w-[100vw] relative -mx-[40px]">
        {/* Left and Right Fades for seamless marquee */}
        <div className="absolute top-0 left-0 w-[150px] h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[150px] h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden w-full flex">
          <motion.div
            className="flex gap-[40px] px-[20px]"
            animate={{
              x: ["0%", "-50%"]
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40,
            }}
            style={{ width: "max-content" }}
          >
            {duplicatedTestimonials.map((t, idx) => (
              <div 
                key={`${t.id}-${idx}`} 
                className="relative flex-shrink-0 w-[461px] h-[573px] bg-[#141414] rounded-[20px] overflow-hidden p-[16px] group hover:scale-[1.02] transition-transform duration-500"
              >
                <div className="absolute inset-0 rounded-[20px] pointer-events-none">
                  <div className="absolute inset-0 border-[#1e1e1e] border-l-2 border-t-2 rounded-[20px] group-hover:border-[#32cd87]/30 transition-colors duration-500" />
                </div>
                
                <div className="relative w-full h-full rounded-[20px] overflow-hidden">
                  {t.type === "gradient" ? (
                    <div className="flex flex-col justify-between h-full p-[24px] relative">
                      <div 
                        className="absolute inset-0 rounded-[12px] opacity-100 group-hover:opacity-80 transition-opacity duration-500" 
                        style={{ 
                          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 429 541' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(80.223 0 0 81.15 78.936 91.429)'><stop stop-color='rgba(20,20,20,1)' offset='0'/><stop stop-color='rgba(24,43,34,1)' offset='0.125'/><stop stop-color='rgba(28,66,49,1)' offset='0.25'/><stop stop-color='rgba(35,113,78,1)' offset='0.5'/><stop stop-color='rgba(43,159,106,1)' offset='0.75'/><stop stop-color='rgba(50,205,135,1)' offset='1'/></radialGradient></defs></svg>")`
                        }} 
                      />
                      <div className="relative z-10 flex-1">
                        <p className="font-['Poppins'] font-normal text-[32px] text-white tracking-[-1.28px] leading-[41.6px] whitespace-pre-wrap m-0">
                          {t.quote}
                        </p>
                      </div>
                      <div className="relative z-10 flex items-center gap-[16px]">
                        {t.smallProfile ? (
                          <div className="w-[56px] h-[56px] rounded-[56px] overflow-hidden shrink-0">
                            <ImageWithFallback src={t.smallProfile} alt={t.name} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-[56px] h-[56px] rounded-[56px] bg-[#1e1e1e] shrink-0" />
                        )}
                        <div className="flex flex-col justify-center gap-[8px]">
                          <p className="font-['Poppins'] font-medium text-[18px] text-white tracking-[-0.3px] leading-[27px] m-0">
                            {t.name}
                          </p>
                          <p className="font-['Poppins'] font-normal text-[16px] text-[#a5a5a5] leading-[24px] m-0">
                            {t.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full relative p-[24px]">
                      <div className="absolute inset-0 rounded-[12px] overflow-hidden">
                        <ImageWithFallback 
                          src={t.image!} 
                          alt={t.name} 
                          className="absolute top-0 h-full w-[126.11%] left-[-13.05%] max-w-none object-cover group-hover:scale-105 transition-transform duration-700" 
                          style={{ objectPosition: "center" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/40 group-hover:from-black/80 transition-colors duration-500" />
                      </div>
                      
                      <div className="relative z-10 flex justify-between items-start w-full">
                        <p className="font-['Poppins'] font-medium text-[18px] text-white tracking-[-0.3px] leading-[27px] m-0">
                          {t.name}
                        </p>
                        <p className="font-['Poppins'] font-normal text-[16px] text-[#d6d6d6] text-right leading-[24px] max-w-[180px] m-0">
                          {t.role}
                        </p>
                      </div>
                      
                      <div className="relative z-10 mt-auto flex-1 flex flex-col justify-end">
                        <p className="font-['Poppins'] font-normal text-[32px] text-white tracking-[-1.28px] leading-[41.6px] whitespace-pre-wrap m-0">
                          {t.quote}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
