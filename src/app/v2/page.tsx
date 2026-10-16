import type { Metadata } from "next";
import { V2Landing } from "@/components/v2/landing";
import "../v2.css";

export const metadata: Metadata = {
  title: "Corporate Preview",
  robots: { index: false, follow: false },
};

export default function CorporatePreview() {
  return <V2Landing corporate />;
}
