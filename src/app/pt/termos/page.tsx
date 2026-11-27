import type { Metadata } from "next";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { LegalDocument, LegalSection } from "../../../components/LegalDocument";
import { SITE_CONFIG } from "../../../lib/seo";

const updated = "19 de novembro de 2026";
const sections: LegalSection[] = [
  { title: "1. Âmbito", paragraphs: ["Estes termos aplicam-se ao blog editorial público e aos seus artigos. Não regulam o registo, as subscrições, os pagamentos nem a utilização do software e CRM Leadsx1B. A utilização desses produtos está sujeita aos termos apresentados pela plataforma."] },
  { title: "2. Utilização do blog", paragraphs: ["Pode ler os artigos e partilhar ligações para fins lícitos. Não deve interferir com o site, tentar obter acesso não autorizado, prejudicar o seu funcionamento nem usar o conteúdo de forma que viole a lei ou os direitos de terceiros."] },
  { title: "3. Conteúdo editorial", paragraphs: ["Os artigos têm finalidade geral, educativa e informativa. Não constituem aconselhamento jurídico, financeiro, de privacidade ou profissional, e não garantem resultados comerciais específicos. Confirme os factos importantes e avalie se uma recomendação se aplica à sua situação antes de agir.", "Procuramos manter o conteúdo útil e atualizado, mas o blog é disponibilizado sem garantia de que todos os artigos estejam completos, isentos de erros ou sempre atualizados. Nada nestes termos limita direitos que a legislação aplicável não permita limitar."] },
  { title: "4. Propriedade intelectual", paragraphs: ["Salvo indicação em contrário num artigo, os textos, a marca e os elementos visuais originais do blog pertencem à Leadsx1B ou aos respetivos titulares. Pode citar pequenos excertos com atribuição clara e ligação para o artigo original. A reprodução ou republicação de partes substanciais exige autorização prévia, exceto quando permitida pela lei aplicável."] },
  { title: "5. Ligações de terceiros", paragraphs: ["O blog pode incluir ligações para sites ou serviços de terceiros. São disponibilizadas por conveniência e não significam que controlamos ou aprovamos todos os serviços externos. Os termos e avisos de privacidade desses serviços aplicam-se à sua utilização."] },
  { title: "6. Responsabilidade", paragraphs: ["Na medida permitida pela lei aplicável, a Leadsx1B não é responsável por perdas indiretas decorrentes da confiança em conteúdo editorial geral ou da indisponibilidade temporária do blog. Estes termos não excluem responsabilidades nem direitos do consumidor que a lei não permita excluir."] },
  { title: "7. Alterações e contacto", paragraphs: ["Podemos atualizar estes termos quando o blog mudar. A data acima indica a revisão mais recente. Envie dúvidas sobre estes termos para suporte@leads1xb.pro."] },
];

export const metadata: Metadata = {
  title: "Termos de Utilização | Blog Leadsx1B",
  description: "Termos para leitura e utilização do blog editorial Leadsx1B.",
  alternates: { canonical: `${SITE_CONFIG.blogDomain}/pt/termos`, languages: { "pt-BR": `${SITE_CONFIG.blogDomain}/pt/termos`, en: `${SITE_CONFIG.blogDomain}/terms`, "x-default": `${SITE_CONFIG.blogDomain}/terms` } },
  openGraph: { title: "Termos de Utilização | Blog Leadsx1B", description: "Termos para leitura e utilização do blog editorial Leadsx1B.", url: `${SITE_CONFIG.blogDomain}/pt/termos`, siteName: "Leadsx1B", locale: "pt_BR", type: "website", images: [{ url: SITE_CONFIG.defaultOgImage, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Termos de Utilização | Blog Leadsx1B", description: "Termos para leitura e utilização do blog editorial Leadsx1B.", images: [SITE_CONFIG.defaultOgImage] },
};

export default function TermosPage() {
  return <div className="flex min-h-screen flex-col"><Header currentLocale="pt" /><LegalDocument locale="pt" documentType="terms" title="Termos de Utilização" summary="As condições aplicáveis à leitura e utilização do blog editorial Leadsx1B." updated={updated} sections={sections} /><Footer locale="pt" /></div>;
}
