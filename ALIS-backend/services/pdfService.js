// ALIS-backend/services/pdfService.js
import PDFDocument from "pdfkit";

export function generateSanctionPDF({ name = "Applicant", amount = "₹0", plan = "Standard", date = new Date().toLocaleDateString() } = {}) {
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const chunks = [];
  doc.on("data", (chunk) => chunks.push(chunk));
  doc.on("end", () => { /* finished */ });

  doc.fontSize(18).text("VisionCoders — Sanction Letter", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Date: ${date}`);
  doc.moveDown();

  doc.fontSize(14).text(`To: ${name}`);
  doc.moveDown(0.5);

  doc.fontSize(12).text(`This letter confirms a provisional sanction of ${amount} under plan ${plan}. Please supply any pending documents for final disbursal.`);
  doc.moveDown(1);

  doc.text("Terms & conditions apply.", { continued: false });
  doc.moveDown(2);

  doc.text("Regards,");
  doc.text("VisionCoders — ALIS Team");

  doc.end();

  return new Promise((resolve, reject) => {
    doc.on("end", () => {
      const pdfData = Buffer.concat(chunks);
      resolve(pdfData);
    });
    doc.on("error", (err) => reject(err));
  });
}
