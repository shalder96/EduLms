import { FaWhatsapp } from "react-icons/fa";

const FloatingChatIcon = () => {
  return (
    <a
      href="https://wa.me/7557899627"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 p-4 text-white transition-transform duration-300 bg-green-500 rounded-full shadow-lg bottom-6 right-6 hover:bg-green-600 hover:scale-110"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default FloatingChatIcon;
