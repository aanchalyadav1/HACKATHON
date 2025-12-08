// ALIS-backend/services/pdfService.js
import PDFDocument from "pdfkit";

export function generateSanctionPDF({ name = "Applicant", amount = "₹0", plan = "N/A", date = new Date().toLocaleDateString() } = {}) {
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const buffers = [];
  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {});

  // Header
  doc.fontSize(20).text("VisionCoders — Sanction Letter", { align: "center" });
  doc.moveDown(1.2);

  doc.fontSize(12).text(`Date: ${date}`);
  doc.moveDown();

  doc.fontSize(14).text(`To: ${name}`);
  doc.moveDown();

  doc.fontSize(12).text(`This letter confirms that the loan application has been evaluated and a provisional sanction is issued for ${amount}.`);
  doc.moveDown();
  doc.text(`Plan: ${plan}`);
  doc.moveDown();

  doc.text("Regards,");
  doc.text("VisionCoders — ALIS Team");

  doc.end();

  return new Promise((resolve, reject) => {
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.on("error", reject);
  });
                     }
