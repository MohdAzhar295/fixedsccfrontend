/** Format WhatsApp number for display and tel: links. */
export function formatDisplayPhone(number) {
  if (!number) return "";
  if (number.startsWith("91") && number.length >= 12) {
    return `+91 ${number.slice(2, 7)} ${number.slice(7)}`;
  }
  return `+${number}`;
}

export function telHref(number) {
  return `tel:+${number.replace(/\D/g, "")}`;
}
