import PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';

export function generateSanctionPDF(data){
  return new Promise((resolve)=>{
    const doc = new PDFDocument();
    const chunks = [];

    doc.fontSize(20).text("ALIS Sanction Letter", { align:"center" });
    doc.moveDown();
    doc.fontSize(14).text(`Applicant: ${data.applicantName}`);
    doc.text(`Amount Approved: ${data.amount}`);
    doc.text(`Risk Rating: ${data.risk}`);

    doc.on('data', c => chunks.push(c));
    doc.on('end', ()=> resolve(Buffer.concat(chunks)));

    doc.end();
  });
}
