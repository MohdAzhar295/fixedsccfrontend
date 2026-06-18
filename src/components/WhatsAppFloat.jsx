/**
 * Floating WhatsApp contact button — persistent on all storefront pages.
 */
import { WHATSAPP_NUMBER } from "../config";
import { IconWhatsApp } from "./icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:bg-[#1fba57] hover:scale-105 transition-all"
      aria-label="Chat on WhatsApp"
    >
      <IconWhatsApp className="w-6 h-6" />
      <span className="text-sm font-semibold hidden sm:inline">WhatsApp</span>
    </a>
  );
}
