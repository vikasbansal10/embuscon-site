import ContactForm from "@/components/ContactForm";
export const metadata = { title: "Contact — Embuscon" };

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto container-px py-12">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <ContactForm />
    </div>
  );
}
