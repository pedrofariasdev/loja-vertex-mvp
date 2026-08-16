import type { Metadata } from "next";
import { ContactoPageClient } from "./ContactoPageClient";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Fala com a VERTEX — email, telefone e horário de atendimento para qualquer dúvida sobre a tua encomenda.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return <ContactoPageClient />;
}
