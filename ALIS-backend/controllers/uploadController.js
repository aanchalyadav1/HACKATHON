import admin from '../config/firebaseAdmin.js';

export async function uploadController(req,res){
  try{
    if(!req.files?.file) return res.status(400).json({ error:"No file uploaded" });
    const file = req.files.file;
    const bucket = admin.storage().bucket();
    const filename = `salary/${Date.now()}_${file.name}`;
    const fileRef = bucket.file(filename);
    await fileRef.save(file.data);

    const url = await fileRef.getSignedUrl({ action:'read', expires:'03-01-2030' });
    res.json({ url:url[0] });
  }catch(err){
    res.status(500).json({ error:String(err) });
  }
}
