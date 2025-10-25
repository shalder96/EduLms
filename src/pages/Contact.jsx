import { useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { FaEnvelope, FaPhoneAlt, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const form = useRef();

    const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hjgq15t", // from EmailJS dashboard
        "template_gnjqzoe", // from EmailJS dashboard
        form.current,
        "qtV1csepmbDkePvqa" // from EmailJS account
      )
      .then(
        (result) => {
          alert("✅ Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert("❌ Failed to send message. Try again later!");
          console.log(error.text);
        }
      );
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] flex items-center justify-center px-6 py-20">
      <motion.div
        className="grid w-full max-w-6xl gap-10 p-8 border shadow-lg md:grid-cols-2 bg-white/10 backdrop-blur-md rounded-3xl md:p-12 border-white/20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Left Section */}
        <div className="space-y-6 text-white">
          <h2 className="text-4xl font-bold mb-4 text-[#A6E1FA]">Get in Touch ✨</h2>
          <p className="text-gray-300">
            Have any questions about our courses, instructors, or your learning journey?  
            We’d love to hear from you!
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#A6E1FA] text-xl" />
              <span>support@educraft.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#A6E1FA] text-xl" />
              <span>+91 98765 43210</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <a href="#" className="hover:text-[#A6E1FA] transition"><FaFacebook size={24} /></a>
            <a href="#" className="hover:text-[#A6E1FA] transition"><FaInstagram size={24} /></a>
            <a href="#" className="hover:text-[#A6E1FA] transition"><FaLinkedin size={24} /></a>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-6 text-white"
        >
          <h3 className="text-2xl font-semibold text-[#A6E1FA] mb-4">Send a Message</h3>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-[#A6E1FA] placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-[#A6E1FA] placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Message</label>
            <textarea
              placeholder="Type your message..."
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-[#A6E1FA] placeholder-gray-400"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#A6E1FA]/20 border border-[#A6E1FA]/50 hover:bg-[#A6E1FA]/30 transition font-semibold text-[#A6E1FA]"
          >
            Send Message 🚀
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
