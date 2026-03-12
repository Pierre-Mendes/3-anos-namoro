import { jsPDF } from "jspdf";
import { dancingScriptBase64 } from "./dancingScriptBase64";

export function generateCertificatePDF(partner: string) {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
    });

    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    // Function to draw a simple heart
    const drawHeart = (x: number, y: number, size: number) => {
        doc.setFillColor(255, 77, 109); // #ff4d6d
        doc.setDrawColor(255, 77, 109);
        const r = size / 4;
        doc.circle(x - r, y - r, r, 'F');
        doc.circle(x + r, y - r, r, 'F');
        doc.triangle(x - 2 * r, y - r + 0.2, x + 2 * r, y - r + 0.2, x, y + size / 2, 'F');
    };

    // --- TIMBRADO BORDERS AND HEADER ---
    // Outer border
    doc.setLineWidth(1);
    doc.setDrawColor(255, 143, 171); // #ff8fab
    doc.rect(12, 12, width - 24, height - 24);
    
    // Inner border
    doc.rect(14, 14, width - 28, height - 28);

    // Header strip for letterhead effect
    doc.setFillColor(255, 229, 236); // #ffe5ec
    doc.rect(14, 14, width - 28, 22, "F");

    doc.setFont("times", "italic");
    doc.setTextColor(178, 24, 92); // #b2185c
    doc.setFontSize(16);
    doc.text("Renovação de Relacionamento", width / 2, 27, { align: "center" });
    
    // Decorative hearts next to the header text
    drawHeart(width / 2 - 55, 26, 6);
    drawHeart(width / 2 + 55, 26, 6);

    // Smaller decor hearts in corners
    drawHeart(25, 25, 8);
    drawHeart(width - 25, 25, 8);

    // --- MAIN CONTENT ---
    // Moved everything up to increase bottom margin and avoid cutting off
    doc.setFont("times", "bold");
    doc.setTextColor(74, 20, 48); // #4a1430
    doc.setFontSize(36);

    doc.text("Certificado de Renovação", width / 2, 60, {
        align: "center",
    });

    doc.setFont("times", "normal");
    doc.setFontSize(16);

    doc.text("Certificamos, para todos os fins de muito amor e carinho, que", width / 2, 80, { align: "center" });

    doc.setFont("times", "italic");
    doc.setFontSize(28);
    doc.setTextColor(178, 24, 92); // #b2185c

    doc.text("Pierre Mendes Salatiel", width / 2, 98, { align: "center" });

    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.setTextColor(74, 20, 48);

    doc.text("e", width / 2, 110, { align: "center" });

    doc.setFont("times", "italic");
    doc.setFontSize(28);
    doc.setTextColor(178, 24, 92);

    doc.text(partner, width / 2, 122, { align: "center" });

    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.setTextColor(74, 20, 48);

    doc.text("renovaram oficialmente seu relacionamento por mais um ciclo,", width / 2, 140, {
        align: "center",
    });

    doc.text("prometendo cumplicidade, grandes aventuras e muita paciência.", width / 2, 148, { align: "center" });

    const dataAtual = new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    doc.setFont("times", "italic");
    doc.setFontSize(14);
    doc.text(`Assinado em: ${dataAtual}`, width / 2, 165, {
        align: "center",
    });

    // --- SIGNATURES ---
    doc.setLineWidth(0.5);
    doc.setDrawColor(74, 20, 48);
    
    // Pierre Signature line
    doc.line(40, 185, 120, 185);
    doc.setFont("times", "normal");
    doc.setFontSize(14);
    doc.text("Pierre Mendes Salatiel", 80, 192, { align: "center" });

    // Partner Signature line
    doc.line(177, 185, 257, 185);
    doc.text(partner, 217, 192, { align: "center" });

    // Actual Signatures (Calligraphy effect)
    try {
        // We add the font to jsPDF VFS (Virtual File System)
        doc.addFileToVFS("DancingScript.ttf", dancingScriptBase64);
        doc.addFont("DancingScript.ttf", "DancingScript", "normal");
        
        doc.setFont("DancingScript", "normal");
        doc.setFontSize(32);
        doc.setTextColor(178, 24, 92); // #b2185c
        
        doc.text("Pierre Mendes Salatiel", 80, 182, { align: "center" });
        doc.text(partner, 217, 182, { align: "center" });
    } catch {
        // Fallback to times italic if the font fails to load
        doc.setFont("times", "italic");
        doc.setFontSize(28);
        doc.setTextColor(178, 24, 92);
        doc.text("Pierre Mendes Salatiel", 80, 180, { align: "center" });
        doc.text(partner, 217, 180, { align: "center" });
    }

    doc.save("certificado-relacionamento.pdf");
}
