import type { Metadata } from "next";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { LegalDocument, LegalSection } from "../../components/LegalDocument";
import { SITE_CONFIG } from "../../lib/seo";

const updated = "November 19, 2026";
const sections: LegalSection[] = [
  { title: "1. Scope", paragraphs: ["These terms apply to the public editorial blog and its articles. They do not govern registration, subscriptions, payments, or use of the Leadsx1B software and CRM. Use of those products is subject to terms presented by the platform operator."] },
  { title: "2. Using the blog", paragraphs: ["You may read and share links to the articles for lawful purposes. You agree not to interfere with the site, attempt unauthorized access, disrupt its operation, or use its content in a way that violates applicable law or another person's rights."] },
  { title: "3. Editorial content", paragraphs: ["The articles provide general educational and informational material. They are not legal, financial, privacy, or professional advice, and they do not promise a particular business result. Check important facts and assess whether a recommendation fits your circumstances before acting on it.", "We work to keep the material useful and current, but the blog is provided without a promise that every article is complete, error-free, or continuously updated. Nothing here limits rights that cannot be limited under applicable law."] },
  { title: "4. Intellectual property", paragraphs: ["Unless an article says otherwise, the blog's text, branding, and original visual materials belong to Leadsx1B or their respective rights holders. You may quote short portions with clear attribution and a link to the original article. Reproducing or republishing substantial portions requires prior permission, except where applicable law allows it."] },
  { title: "5. Third-party links", paragraphs: ["The blog may link to websites or services operated by others. Those links are provided for convenience and do not mean we control or endorse every third-party service. Their terms and privacy notices apply to your use of those services."] },
  { title: "6. Liability", paragraphs: ["To the extent allowed by applicable law, Leadsx1B is not responsible for indirect losses resulting from reliance on general editorial content or temporary unavailability of the blog. These terms do not exclude liability or consumer rights that the law does not allow us to exclude."] },
  { title: "7. Updates and contact", paragraphs: ["We may update these terms as the blog changes. The date above shows the latest revision. Questions about these terms can be sent to suporte@leads1xb.pro."] },
];

export const metadata: Metadata = {
  title: "Terms of Use | Leadsx1B Blog",
  description: "Terms for reading and using the Leadsx1B editorial blog.",
  alternates: { canonical: `${SITE_CONFIG.blogDomain}/terms`, languages: { en: `${SITE_CONFIG.blogDomain}/terms`, pt: `${SITE_CONFIG.blogDomain}/pt/termos`, "x-default": `${SITE_CONFIG.blogDomain}/terms` } },
  openGraph: { title: "Terms of Use | Leadsx1B Blog", description: "Terms for reading and using the Leadsx1B editorial blog.", url: `${SITE_CONFIG.blogDomain}/terms`, siteName: "Leadsx1B", type: "website", images: [{ url: SITE_CONFIG.defaultOgImage, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Terms of Use | Leadsx1B Blog", description: "Terms for reading and using the Leadsx1B editorial blog.", images: [SITE_CONFIG.defaultOgImage] },
};

export default function TermsPage() {
  return <div className="flex min-h-screen flex-col"><Header currentLocale="en" /><LegalDocument locale="en" documentType="terms" title="Terms of Use" summary="The terms that apply to reading and using the Leadsx1B editorial blog." updated={updated} sections={sections} /><Footer locale="en" /></div>;
}
