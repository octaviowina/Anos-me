 const axios = require('axios');
const UPoLPrefix = [
  'edu',
  'ai',
  'Megan',
  'bot',
  'ask'
]; 

  module.exports = {
  config: {
    name: 'ai',
    version: '1.2.1',
    role: 0,
    category: 'AI',
    author: 'Metoushela walker',
    shortDescription: '',
    longDescription: '',
  },
  
  onStart: async function () {},
  onChat: async function ({ message, event, args, api, threadID, messageID }) {
      
      const ahprefix = UPoLPrefix.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!ahprefix) {
        return; 
      } 
      
     const upol = event.body.substring(ahprefix.length).trim();
   if (!upol) {
        await message.reply('𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻𝗮𝗹 ✨\n━━━━━━━━━━━━━\nAsk Me Your Question');
        return;
      }
      
      const apply = ['Awww🥹, maybe you need my help', 'How can i help you?', 'How can i assist you today?', 'How can i help you?🙂'];
      
     const randomapply = apply[Math.floor(Math.random() * apply.length)];

     
      if (args[0] === 'hi') {
          message.reply(`${randomapply}`);
          return;
      }
      
    const encodedPrompt = encodeURIComponent(args.join(" "));

   await message.reply('thinking..');
  
    const response = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodedPrompt}`);
 
     const UPoL = response.data.answer; 

      const upolres = `𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻𝗮𝗹 ✨\n━━━━━━━━━━━━━\n${UPoL}`;
      
        message.reply(upolres);
  }
};
