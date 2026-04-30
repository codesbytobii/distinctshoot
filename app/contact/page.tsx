// "use client";
// import { useState } from "react";
// import { Mail, Phone, Instagram, MapPin, ArrowRight } from "lucide-react";

// export default function ContactPage() {
//   const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
//   const [sent, setSent] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e: React.MouseEvent) => {
//     e.preventDefault();
//     // TODO: integrate EmailJS or server action
//     setSent(true);
//   };

//   return (
//     <div className="min-h-screen pt-32 pb-24 px-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
//         {/* Left — Info */}
//         <div>
//           <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "var(--gold)" }}>Let's Talk</p>
//           <h1 className="font-display font-light leading-tight mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--fg)" }}>
//             Start a<br /><em style={{ color: "var(--gold)" }}>Conversation</em>
//           </h1>
//           <p className="text-base leading-relaxed mb-12" style={{ color: "var(--fg-muted)" }}>
//             We respond to all enquiries within 24 hours. Whether you have a clear vision 
//             or just the seed of an idea, reach out — we'll grow it together.
//           </p>

//           <div className="flex flex-col gap-6">
//             {[
//               { icon: Mail, label: "Email", value: "hello@distinctshoot01.com", href: "mailto:hello@distinctshoot01.com" },
//               { icon: Phone, label: "Phone", value: "+234 800 000 0000", href: "tel:+2348000000000" },
//               { icon: Instagram, label: "Instagram", value: "@distinctshoot01", href: "https://instagram.com/distinctshoot01" },
//               { icon: MapPin, label: "Location", value: "Lagos, Nigeria", href: "#" },
//             ].map((item) => (
//               <a
//                 key={item.label}
//                 href={item.href}
//                 target={item.href.startsWith("http") ? "_blank" : undefined}
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-5 group"
//               >
//                 <div
//                   className="w-10 h-10 border flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:border-gold"
//                   style={{ borderColor: "var(--border)" }}
//                 >
//                   <item.icon size={14} style={{ color: "var(--gold)" }} />
//                 </div>
//                 <div>
//                   <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "var(--fg-muted)" }}>{item.label}</p>
//                   <p className="text-sm" style={{ color: "var(--fg)" }}>{item.value}</p>
//                 </div>
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* Right — Form */}
//         <div>
//           {sent ? (
//             <div className="h-full flex flex-col items-center justify-center text-center py-20">
//               <div className="w-16 h-16 border-2 flex items-center justify-center mb-6" style={{ borderColor: "var(--gold)" }}>
//                 <ArrowRight size={24} style={{ color: "var(--gold)" }} />
//               </div>
//               <h3 className="font-display text-3xl font-light mb-4" style={{ color: "var(--fg)" }}>Message Received</h3>
//               <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
//                 Thank you for reaching out. We'll be in touch within 24 hours.
//               </p>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-6">
//               {/* Name */}
//               <div>
//                 <label className="text-xs tracking-widest uppercase block mb-3" style={{ color: "var(--fg-muted)" }}>Your Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className="w-full bg-transparent border px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-gold"
//                   style={{ borderColor: "var(--border)", color: "var(--fg)" }}
//                   placeholder="Adaeze Okonkwo"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="text-xs tracking-widest uppercase block mb-3" style={{ color: "var(--fg-muted)" }}>Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   className="w-full bg-transparent border px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-gold"
//                   style={{ borderColor: "var(--border)", color: "var(--fg)" }}
//                   placeholder="you@email.com"
//                 />
//               </div>

//               {/* Service */}
//               <div>
//                 <label className="text-xs tracking-widest uppercase block mb-3" style={{ color: "var(--fg-muted)" }}>Service Interested In</label>
//                 <select
//                   name="service"
//                   value={form.service}
//                   onChange={handleChange}
//                   className="w-full bg-transparent border px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-gold appearance-none cursor-pointer"
//                   style={{ borderColor: "var(--border)", color: form.service ? "var(--fg)" : "var(--fg-muted)", backgroundColor: "var(--bg)" }}
//                 >
//                   <option value="" disabled>Select a service</option>
//                   <option value="portrait">Portrait Session</option>
//                   <option value="editorial">Editorial & Fashion</option>
//                   <option value="brand">Brand & Commercial</option>
//                   <option value="wedding">Wedding & Events</option>
//                   <option value="other">Other / Not Sure</option>
//                 </select>
//               </div>

//               {/* Message */}
//               <div>
//                 <label className="text-xs tracking-widest uppercase block mb-3" style={{ color: "var(--fg-muted)" }}>Your Message</label>
//                 <textarea
//                   name="message"
//                   value={form.message}
//                   onChange={handleChange}
//                   rows={5}
//                   className="w-full bg-transparent border px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-gold resize-none"
//                   style={{ borderColor: "var(--border)", color: "var(--fg)" }}
//                   placeholder="Tell us about your vision, the date, and anything else we should know..."
//                 />
//               </div>

//               <button
//                 onClick={handleSubmit}
//                 className="flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 mt-2"
//                 style={{ backgroundColor: "var(--gold)", color: "#0A0A0A" }}
//               >
//                 Send Message <ArrowRight size={14} />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import { Mail, Phone, Instagram, MapPin, ArrowRight } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    const result = await sendContactEmail(form);
    setStatus(result.success ? "sent" : "error");

    if (result.success) {
      setForm({ name: "", email: "", service: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* Left — Info */}
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: "var(--gold)" }}>Let's Talk</p>
          <h1
            className="font-display font-light leading-tight mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--fg)" }}
          >
            Start a<br /><em style={{ color: "var(--gold)" }}>Conversation</em>
          </h1>
          <p className="text-base leading-relaxed mb-12" style={{ color: "var(--fg-muted)" }}>
            We respond to all enquiries within 24 hours. Whether you have a clear vision
            or just the seed of an idea, reach out — we'll grow it together.
          </p>

          <div className="flex flex-col gap-6">
            {[
              { icon: Mail, label: "Email", value: "distinctshoot@gmail.com", href: "mailto:distinctshoot@gmail.com" },
              { icon: Phone, label: "Phone", value: "+234 704 866 6024", href: "tel:+2347048666024" },
              { icon: Instagram, label: "Instagram", value: "@distinctshoot", href: "https://instagram.com/distinctshoot" },
              { icon: MapPin, label: "Location", value: "Lagos, Nigeria", href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-5 group"
              >
                <div
                  className="w-10 h-10 border flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:border-gold"
                  style={{ borderColor: "var(--border)" }}
                >
                  <item.icon size={14} style={{ color: "var(--gold)" }} />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ color: "var(--fg-muted)" }}>{item.label}</p>
                  <p className="text-sm" style={{ color: "var(--fg)" }}>{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div>
          {status === "sent" ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div
                className="w-16 h-16 border-2 flex items-center justify-center mb-6"
                style={{ borderColor: "var(--gold)" }}
              >
                <ArrowRight size={24} style={{ color: "var(--gold)" }} />
              </div>
              <h3 className="font-display text-3xl font-light mb-4" style={{ color: "var(--fg)" }}>
                Message Received
              </h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--fg-muted)" }}>
                Thank you for reaching out. We'll be in touch within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-[10px] tracking-[0.3em] uppercase border-b pb-px"
                style={{ color: "var(--gold)", borderColor: "var(--gold)" }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Name */}
              <div>
                <label className="text-[10px] tracking-widest uppercase block mb-3" style={{ color: "var(--fg-muted)" }}>
                  Your Name <span style={{ color: "var(--gold)" }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-gold"
                  style={{ borderColor: "var(--border)", color: "var(--fg)" }}
                  placeholder="Adaeze Okonkwo"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-[10px] tracking-widest uppercase block mb-3" style={{ color: "var(--fg-muted)" }}>
                  Email Address <span style={{ color: "var(--gold)" }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-gold"
                  style={{ borderColor: "var(--border)", color: "var(--fg)" }}
                  placeholder="you@email.com"
                />
              </div>

              {/* Service */}
              <div>
                <label className="text-[10px] tracking-widest uppercase block mb-3" style={{ color: "var(--fg-muted)" }}>
                  Service Interested In
                </label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full bg-transparent border px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-gold appearance-none cursor-pointer"
                  style={{
                    borderColor: "var(--border)",
                    color: form.service ? "var(--fg)" : "var(--fg-muted)",
                    backgroundColor: "var(--bg)",
                  }}
                >
                  <option value="" disabled>Select a service</option>
                  <option value="Portrait Session">Portrait Session</option>
                  <option value="Editorial & Fashion">Editorial & Fashion</option>
                  <option value="Brand & Commercial">Brand & Commercial</option>
                  <option value="Wedding & Events">Wedding & Events</option>
                  <option value="Other / Not Sure">Other / Not Sure</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-[10px] tracking-widest uppercase block mb-3" style={{ color: "var(--fg-muted)" }}>
                  Your Message <span style={{ color: "var(--gold)" }}>*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-transparent border px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-gold resize-none"
                  style={{ borderColor: "var(--border)", color: "var(--fg)" }}
                  placeholder="Tell us about your vision, the date, and anything else we should know..."
                />
              </div>

              {/* Error */}
              {status === "error" && (
                <p className="text-xs" style={{ color: "#e05c5c" }}>
                  Something went wrong. Please try again or email us directly at distinctshoot@gmail.com
                </p>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={status === "sending"}
                className="flex items-center justify-center gap-3 px-8 py-4 text-xs tracking-[0.25em] uppercase transition-all duration-300 mt-2 disabled:opacity-60"
                style={{ backgroundColor: "var(--gold)", color: "#0A0A0A" }}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
                {status !== "sending" && <ArrowRight size={13} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}