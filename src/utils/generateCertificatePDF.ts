import { jsPDF } from "jspdf";

export function generateCertificatePDF(partner: string) {
    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text("Certificado Oficial de Relacionamento", 105, 40, {
        align: "center",
    });

    doc.setFontSize(14);

    doc.text("Certificamos que", 105, 70, { align: "center" });

    doc.setFontSize(18);

    doc.text("Pierre Mendes Salatiel", 105, 90, { align: "center" });

    doc.text("e", 105, 105, { align: "center" });

    doc.text(partner, 105, 120, { align: "center" });

    doc.setFontSize(14);

    doc.text("renovaram oficialmente seu relacionamento", 105, 145, {
        align: "center",
    });

    doc.text("com amor e compromisso.", 105, 155, { align: "center" });

    doc.text(`Data: ${new Date().toLocaleDateString()}`, 105, 180, {
        align: "center",
    });

    doc.save("certificado-relacionamento.pdf");
}
