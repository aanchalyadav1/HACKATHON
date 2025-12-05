import { generateSanctionPDF } from '../utils/pdf.js';

export async function sanctionController(req,res){
  try{
    const pdf = await generateSanctionPDF(req.body);
    res.setHeader('Content-Type','application/pdf');
    res.send(pdf);
  }catch(err){
    res.status(500).json({ error:String(err) });
  }
}
