import type { Metadata } from "next";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { LegalDocument, LegalSection } from "../../../components/LegalDocument";
import { SITE_CONFIG } from "../../../lib/seo";

const updated = "19 de novembro de 2026";
const sections: LegalSection[] = [
  { title: "1. Âmbito e responsável", paragraphs: ["Esta política aplica-se ao blog editorial público neste domínio, incluindo os artigos em português e inglês. O blog é operado sob o nome Leadsx1B Inc. apresentado neste site. Não abrange o software Leadsx1B, o painel de contas, as subscrições ou os pagamentos. Esses serviços precisam de aviso de privacidade e termos próprios da plataforma."] },
  { title: "2. Informações tratadas durante a visita", paragraphs: ["O blog não exige conta e, atualmente, não oferece comentários nem inscrição ativa em newsletter. Os fornecedores de hospedagem, distribuição de conteúdo e segurança usados para disponibilizar o site podem tratar dados técnicos da requisição, como endereço IP, navegador e dispositivo, páginas visitadas, horários e eventos de segurança, para entregar e proteger o site. Os avisos desses fornecedores explicam o tratamento e a retenção próprios.", "Se nos enviar um e-mail, recebemos o endereço e as informações incluídas na mensagem para responder e tratar do pedido."] },
  { title: "3. Cookies e análise de visitas", paragraphs: ["O código atual do blog não inclui cookies publicitários nem ferramentas externas de análise de visitas. O fornecedor de hospedagem ainda pode usar registos ou armazenamento técnico necessários para disponibilizar e proteger o site. Se forem adicionadas ferramentas de análise, publicidade ou outro rastreamento opcional, esta política e as opções de consentimento legalmente exigidas serão atualizadas antes do início desse tratamento."] },
  { title: "4. Utilização e partilha", paragraphs: ["As informações técnicas são usadas para operar, manter, diagnosticar problemas e proteger o blog. As mensagens de e-mail são usadas para responder a quem nos contactou. Não vendemos informações enviadas por e-mail. Os dados podem ser tratados por fornecedores de hospedagem, distribuição, segurança e e-mail para prestar esses serviços, ou divulgados quando a lei exigir."] },
  { title: "5. Retenção e tratamento internacional", paragraphs: ["Mantemos a correspondência por e-mail apenas pelo tempo razoavelmente necessário para responder, documentar o pedido ou cumprir obrigações legais. O prazo dos registos técnicos depende dos fornecedores e das configurações de hospedagem e segurança. Os fornecedores podem tratar informações em países diferentes do seu; as garantias aplicáveis dependem do fornecedor e da legislação pertinente."] },
  { title: "6. As suas opções e direitos", paragraphs: ["Consoante o local onde reside e a legislação aplicável, poderá ter direitos de acesso, correção, eliminação ou informação sobre dados pessoais, bem como de oposição ou limitação de certos tratamentos e de reclamação a uma autoridade de controlo. Para apresentar um pedido, escreva para suporte@leads1xb.pro. Poderemos solicitar informações razoáveis para verificar e responder ao pedido."] },
  { title: "7. Ligações e alterações", paragraphs: ["Os artigos podem incluir ligações para sites de terceiros. As práticas de privacidade desses sites são regidas pelos próprios avisos. Esta política pode ser atualizada quando o blog ou os seus fornecedores mudarem; a data acima indica a revisão mais recente."] },
  { title: "8. Contacto", paragraphs: ["Para dúvidas ou pedidos sobre a privacidade deste blog, contacte Leadsx1B Inc. pelo endereço suporte@leads1xb.pro. Este contacto diz respeito ao blog editorial e não substitui o contacto de privacidade da plataforma de software, que é um serviço separado."] },
];

export const metadata: Metadata = {
  title: "Política de Privacidade | Blog Leadsx1B",
  description: "Informações de privacidade do blog editorial bilingue Leadsx1B.",
  alternates: { canonical: `${SITE_CONFIG.blogDomain}/pt/privacidade`, languages: { "pt-BR": `${SITE_CONFIG.blogDomain}/pt/privacidade`, en: `${SITE_CONFIG.blogDomain}/privacy`, "x-default": `${SITE_CONFIG.blogDomain}/privacy` } },
  openGraph: { title: "Política de Privacidade | Blog Leadsx1B", description: "Informações de privacidade do blog editorial bilingue Leadsx1B.", url: `${SITE_CONFIG.blogDomain}/pt/privacidade`, siteName: "Leadsx1B", locale: "pt_BR", type: "website", images: [{ url: SITE_CONFIG.defaultOgImage, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Política de Privacidade | Blog Leadsx1B", description: "Informações de privacidade do blog editorial bilingue Leadsx1B.", images: [SITE_CONFIG.defaultOgImage] },
};

export default function PrivacidadePage() {
  return <div className="flex min-h-screen flex-col"><Header currentLocale="pt" /><LegalDocument locale="pt" documentType="privacy" title="Política de Privacidade" summary="Como o blog editorial Leadsx1B trata informações quando visita o site ou entra em contacto connosco." updated={updated} sections={sections} /><Footer locale="pt" /></div>;
}
