import { redirect } from "next/navigation";

// Contact form temporarily unavailable — redirect visitors to home
export default function ContactPage() {
  redirect("/");
}
