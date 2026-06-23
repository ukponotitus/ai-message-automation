import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const imgSaas = "/CaseStudiesSection/imgSaas.png";
const imgEcom = "/CaseStudiesSection/imgEcom.png";
const imgFinance = "/CaseStudiesSection/imgFinance.png";
const imgHealthcare = "/CaseStudiesSection/imgHealthcare.png";

const caseStudies = [
  {
    tag: "E-Commerce",
    title: "How KudaMart Cut Support Response Times by 80% with WhatsApp AI",
    desc: "We deployed an intelligent WhatsApp chatbot that handles product inquiries, order tracking, and returns instantly—freeing up human agents.",
    metrics: [
      { val: "80%", lbl: "Faster Response Time" },
      { val: "3X", lbl: "Increase in Sales Conversion" },
    ],
    image: imgSaas,
  },
  {
    tag: "Real Estate",
    title: "How LekkiHomes Automated Lead Qualification 24/7",
    desc: "LekkiHomes integrated our WhatsApp CRM to auto-qualify property inquiries, schedule viewings, and send tailored brochures on demand.",
    metrics: [
      { val: "45%", lbl: "More Qualified Leads" },
      { val: "24/7", lbl: "Automated Engagement" },
    ],
    image: imgEcom,
  },
  {
    tag: "Finance",
    title: "How PayNaija Streamlined Customer Onboarding via WhatsApp",
    desc: "By moving KYC document collection and FAQs to an automated WhatsApp flow, PayNaija reduced drop-offs during sign-ups significantly.",
    metrics: [
      { val: "60%", lbl: "Drop in Onboarding Time" },
      { val: "90%", lbl: "Completion Rate" },
    ],
    image: imgFinance,
  },
  {
    tag: "Healthcare",
    title: "How MedCare Clinic Reduced No-Shows by 40% with Smart Reminders",
    desc: "Automated WhatsApp appointment booking and reminders helped MedCare clinic ensure patients show up, optimizing doctor schedules.",
    metrics: [
      { val: "40%", lbl: "Fewer Appointment No-Shows" },
      { val: "500+", lbl: "Hours Saved Monthly" },
    ],
    image: imgHealthcare,
  },
];

export function OurRecentWork() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="casestudies" className="bg-white py-[112px] px-[40px] flex flex-col items-center relative w-full overflow-hidden">
      <div className="flex flex-col gap-[64px] max-w-[1120px] w-full">
        <div ref={ref} className="flex flex-col gap-[23px] items-start w-full">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="font-['Inter'] font-medium text-[#37b24d] text-[13.8px] tracking-[2.8px] uppercase m-0"
          >
            CASE STUDIES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="font-['Poppins'] font-normal text-[64px] text-[#1a1a2e] tracking-[-3.2px] leading-[1.2] m-0"
          >
            Our Recent Work
          </motion.h2>
        </div>

        <div className="flex flex-col gap-[24px] w-full">
          {caseStudies.map((cs, index) => (
            <motion.div
              key={cs.tag}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="bg-white border border-gray-200 rounded-[24px] p-[24px] flex flex-col md:flex-row gap-[40px] items-center justify-between w-full group hover:border-[#37b24d]/30 transition-colors duration-500 shadow-sm"
            >
              <div className="flex flex-col flex-1 h-full py-[16px] max-w-[500px]">
                <div className="flex flex-col gap-[16px] mb-[48px]">
                  <span className="font-['Inter'] font-medium text-[#9ca3af] text-[14px] m-0 capitalize">
                    {cs.tag}
                  </span>
                  <h3 className="font-['Poppins'] font-normal text-[32px] text-[#1a1a2e] tracking-[-0.64px] leading-[1.3] m-0">
                    {cs.title}
                  </h3>
                  <p className="font-['Poppins'] font-normal text-[#6b7280] text-[16px] leading-[24px] m-0">
                    {cs.desc}
                  </p>
                </div>

                <div className="flex items-start gap-[64px] mt-auto">
                  {cs.metrics.map((metric, i) => (
                    <div key={i} className="flex flex-col gap-[8px]">
                      <span className="font-['Poppins'] font-normal text-[48px] text-[#37b24d] leading-[1] tracking-[-1.92px] m-0">
                        {metric.val}
                      </span>
                      <span className="font-['Poppins'] font-normal text-[#9ca3af] text-[14px] leading-[20px] max-w-[120px] m-0">
                        {metric.lbl}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-[50%] h-[380px] rounded-[16px] overflow-hidden relative shrink-0">
                <ImageWithFallback 
                  src={cs.image} 
                  alt={cs.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                />
                
                <div className="absolute top-[20px] right-[20px] w-[48px] h-[48px] bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center border border-gray-200 group-hover:bg-[#37b24d] group-hover:border-[#37b24d] transition-all duration-300 cursor-pointer">
                  <ArrowUpRight size={24} className="text-[#1a1a2e] group-hover:text-white transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mt-[24px]"
        >
          <motion.a
            href="#casestudies"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center bg-gray-100 text-[#6b7280] px-[24px] py-[16px] rounded-[12px] no-underline hover:text-[#1a1a2e] hover:bg-gray-200 transition-colors"
          >
            <span className="font-['Poppins'] font-medium text-[16px] leading-[24px] m-0">
              See all Case Studies
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
