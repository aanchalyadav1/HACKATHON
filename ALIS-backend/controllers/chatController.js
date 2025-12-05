import { groqChat } from '../services/groqService.js';

export async function chatController(req,res){
  try{
    const { message, sessionId, user } = req.body;
    const reply = await groqChat(message);
    res.json({ agent:'ALIS', reply, sessionId: sessionId || 'new-session' });
  } catch(err){
    res.status(500).json({ error:String(err) });
  }
}
