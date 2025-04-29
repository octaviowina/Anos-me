const axios = require("axios");

module.exports = {
  config: {
    name: "lyrics",
    version: "1.0",
    author: "Ayanfe",
    description: "Fetch lyrics for a song",
    category: "utility",
    guide: {
      en: "{pn} <song title>"
    },
    usages: "/lyrics <song title>",
    cooldowns: 5,
    dependencies: {
      axios: ""
    }
  },

  onStart: async function ({ message, args }) {
    if (args.length === 0) {
      return message.reply("⚠️ *Oops!* You forgot to provide a song title! 🎶\nExample: `/lyrics Despacito`");
    }

    const songTitle = args.join(" ");
    const searchingMessage = await message.reply(`🔍 **Searching lyrics** for "${songTitle}"... Please wait! ⏳`);

    try {
      // Call the lyrics API
      const response = await axios.get(`https://kaiz-apis.gleeze.com/api/shazam-lyrics?title=${encodeURIComponent(songTitle)}`);
      const lyricsData = response.data;

      if (!lyricsData || !lyricsData.lyrics) {
        await message.unsend(searchingMessage.messageID);
        return message.reply(`❌ *Sorry!* Lyrics for "${songTitle}" were not found. Please try another song. 🙁`);
      }

      // Format and send the lyrics
      const lyricsMessage = `
🎶 *Lyrics for*: "${lyricsData.title || songTitle}"  
🎤 *Artist*: ${lyricsData.artist || "Unknown"}  

${lyricsData.lyrics}

✨ Enjoy your music! Let me know if you want lyrics for another song. 🎵
      `;

      await message.unsend(searchingMessage.messageID);
      message.reply(lyricsMessage);
    } catch (error) {
      console.error("Error fetching lyrics:", error.message);
      await message.unsend(searchingMessage.messageID);
      message.reply("❌ *Oops!* Something went wrong while fetching the lyrics. Please try again later. 😕");
    }
  }
};
