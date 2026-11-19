import type { Metadata } from "next";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { LegalDocument, LegalSection } from "../../components/LegalDocument";
import { SITE_CONFIG } from "../../lib/seo";

const updated = "November 19, 2026";
const sections: LegalSection[] = [
  { title: "1. Scope and operator", paragraphs: ["This notice applies to the public editorial blog at this domain, including its English and Portuguese article pages. The blog is operated under the Leadsx1B Inc. name shown on this site. It does not cover the Leadsx1B software, account dashboard, subscriptions, or payment arrangements. Those services require their own privacy notice and terms from the platform operator."] },
  { title: "2. Information handled when you visit", paragraphs: ["The blog does not require an account and does not currently provide comments or an active newsletter signup. The hosting, content delivery, and security providers used to serve the site may process technical request information such as IP address, browser and device details, requested pages, timestamps, and security events to deliver and protect the site. Their own notices describe their processing and retention.", "If you email us, we receive the address and information included in your message so we can reply and handle the request."] },
  { title: "3. Cookies and analytics", paragraphs: ["The blog code does not currently include advertising cookies or third-party analytics. Technical storage or logs needed by the hosting provider to deliver and secure the site may still be used. If analytics, advertising, or other optional tracking is added, this notice and any required consent choices will be updated before that processing begins."] },
  { title: "4. How information is used and shared", paragraphs: ["Technical information is used to operate, maintain, troubleshoot, and protect the blog. Email messages are used to answer the person who contacted us. We do not sell information submitted by email. Information may be handled by hosting, delivery, security, and email providers acting to provide their services, or disclosed when required by law."] },
  { title: "5. Retention and international processing", paragraphs: ["We keep email correspondence only for as long as reasonably needed to answer and document the request or meet legal obligations. Technical log retention is determined by the providers and settings used to host and protect the blog. Providers may process information in countries other than yours; applicable safeguards depend on the provider and the relevant law."] },
  { title: "6. Your choices and rights", paragraphs: ["Depending on where you live and the law that applies, you may have rights to request access to, correction of, deletion of, or information about personal data, to object to or restrict certain processing, or to complain to a supervisory authority. Contact suporte@leads1xb.pro to make a request. We may need reasonable information to verify and respond to it."] },
  { title: "7. Links and changes", paragraphs: ["Articles may link to third-party websites. Their privacy practices are governed by their own notices. We may update this notice when the blog or its providers change; the date above shows when it was last revised."] },
  { title: "8. Contact", paragraphs: ["For questions or requests about this blog's privacy practices, contact Leadsx1B Inc. at suporte@leads1xb.pro. This contact is for the editorial blog; it is not a substitute for the privacy contact for the separate software platform."] },
];

export const metadata: Metadata = {
  title: "Privacy Policy | Leadsx1B Blog",
  description: "Privacy information for the Leadsx1B bilingual editorial blog.",
  alternates: { canonical: `${SITE_CONFIG.blogDomain}/privacy`, languages: { en: `${SITE_CONFIG.blogDomain}/privacy`, pt: `${SITE_CONFIG.blogDomain}/pt/privacidade`, "x-default": `${SITE_CONFIG.blogDomain}/privacy` } },
  openGraph: { title: "Privacy Policy | Leadsx1B Blog", description: "Privacy information for the Leadsx1B bilingual editorial blog.", url: `${SITE_CONFIG.blogDomain}/privacy`, siteName: "Leadsx1B", type: "website", images: [{ url: SITE_CONFIG.defaultOgImage, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Privacy Policy | Leadsx1B Blog", description: "Privacy information for the Leadsx1B bilingual editorial blog.", images: [SITE_CONFIG.defaultOgImage] },
};

export default function PrivacyPage() {
  return <div className="flex min-h-screen flex-col"><Header currentLocale="en" /><LegalDocument locale="en" documentType="privacy" title="Privacy Policy" summary="How the Leadsx1B editorial blog handles information when you read the site or contact us." updated={updated} sections={sections} /><Footer locale="en" /></div>;
}
