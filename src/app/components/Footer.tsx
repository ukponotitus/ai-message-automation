import { motion } from "motion/react";
import { 
  Youtube, 
  Facebook, 
  Linkedin, 
  Instagram, 
  Twitter 
} from "lucide-react";
import { Link } from "react-router-dom";


const footerLinks = [
  // { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy",     href: "/privacy" },
  // { label: "404",                href: "/404" },
];

export function Footer() {
  return (
    <div className="flex flex-col items-start relative size-full bg-black">
      <div 
        className="flex flex-col gap-[48px] items-center w-full px-[40px] py-[40px] relative rounded-tl-[24px] rounded-tr-[24px] shrink-0" 
        style={{ 
          backgroundImage: "linear-gradient(0deg, rgb(20, 20, 20) 0%, rgb(23, 35, 15) 45%, rgb(38, 57, 29) 65%, rgb(36, 95, 55) 85%, rgb(36, 95, 55) 100%)" 
        }}
      >

        <div className="flex flex-wrap md:flex-nowrap gap-[40px] md:gap-[120px] items-start justify-between w-full max-w-[1120px] relative shrink-0">
          
          <div className="flex flex-col gap-[12px] items-start w-[357.33px] shrink-0">
            <div className="flex gap-[12px] items-center">
              <div className="w-[32px] h-[32px] rounded-[8px] bg-[#25D366] flex items-center justify-center shrink-0">
                 <svg width="14" height="20" viewBox="0 0 12 20" fill="none">
                   <path d="M0 1.5H12V7.5H6L0 1.5ZM0 7.5H6L12 13.5H6V19.5L0 13.5V7.5Z" fill="black" />
                 </svg>
              </div>
              <span className="font-['Poppins'] font-normal text-[24px] text-white tracking-[-0.48px] leading-[31.2px] m-0">
                Automate<span className="text-[#25D366]">NG</span>
              </span>
            </div>
            <p className="font-['Poppins'] font-normal text-[#a5a5a5] text-[16px] leading-[24px] m-0">
              Powering Nigerian businesses with<br />
              AI-driven WhatsApp automation.
            </p>
          </div>

          <div className="flex flex-col gap-[16px] items-start w-[150px] shrink-0">
            <span className="font-['Inter'] font-medium text-[14px] text-white tracking-[2.8px] leading-[21px] m-0">
              EXPLORE
            </span>
            <div className="flex flex-col gap-[8px]">
              {["Services", "Case Studies", "Pricing", "Blogs", "About Us", "Contact"].map((link) => (
                <a key={link} href={`#${link.toLowerCase().replace(' ', '')}`} className="font-['Poppins'] font-normal text-[#a5a5a5] text-[16px] leading-[24px] no-underline hover:text-white transition-colors m-0">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[16px] items-start w-[150px] shrink-0">
            <span className="font-['Inter'] font-medium text-[14px] text-white tracking-[2.8px] leading-[21px] m-0">
              LEGAL
            </span>
            {footerLinks.map(({ label, href }) => (
              <Link 
              key={label} 
              to={href} // Change 'href' to 'to'
              className="font-['Poppins'] font-normal text-[#a5a5a5] text-[16px] leading-[24px] no-underline hover:text-white transition-colors m-0"
            >
              {label}
            </Link>
            ))}
          </div>
          
        </div>

        {/* Bottom Divider */}
        <div className="bg-[#1e1e1e] h-px w-full max-w-[1120px] relative shrink-0" />

        {/* Bottom Links */}
        <div className="flex flex-col md:flex-row gap-[16px] items-center justify-between w-full max-w-[1120px] relative shrink-0">
          <div className="flex flex-col gap-[8px] items-center md:items-start justify-center">
            <span className="font-['Poppins'] font-normal text-[14px] text-[rgba(255,255,255,0.4)] leading-[21px] m-0">
              © 2026 AutomateNG. All rights reserved.
            </span>
            <div className="flex items-center">
              <span className="font-['Poppins'] font-normal text-[14px] text-[rgba(255,255,255,0.4)] leading-[21px] m-0 whitespace-nowrap">
                Made by&nbsp;
              </span>
              <span className="font-['Poppins'] font-normal text-[14px] text-white leading-[21px] m-0 whitespace-nowrap">
                Titus Ukpono
              </span>
            </div>
          </div>

          <div className="flex gap-[16px] items-center justify-end">
  <a
    href="https://www.youtube.com/@UkponoTitus-ze5du"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Youtube
      size={22}
      className="text-[#a5a5a5] hover:text-white cursor-pointer transition-colors"
    />
  </a>

  <a
    href="https://www.facebook.com/titusukpono0/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Facebook
      size={22}
      className="text-[#a5a5a5] hover:text-white cursor-pointer transition-colors"
    />
  </a>

  <a
    href="https://www.linkedin.com/in/ukpono-titus-72810b346/?skipRedirect=true"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Linkedin
      size={22}
      className="text-[#a5a5a5] hover:text-white cursor-pointer transition-colors"
    />
  </a>

  <a
    href="https://www.instagram.com/ukscode/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Instagram
      size={22}
      className="text-[#a5a5a5] hover:text-white cursor-pointer transition-colors"
    />
  </a>
</div>
        </div>
      </div>
    </div>
  );
}
