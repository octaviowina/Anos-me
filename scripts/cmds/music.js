 const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "music",
        version: "1.0",
        author: "Asmit",
        countDown: 5,
        role: 0,
        shortDescription: "Search and download music from JioSaavn",
        longDescription: "Fetches music data from JioSaavn based on a search query and sends the first song as a download.",
        category: "reply",
    },
    onStart: async function() {
        console.log("Music command loaded");
    },
    onChat: async function({ event, message, getLang }) {
        console.log("Received event:", event);

        const command = event.body.trim().toLowerCase();
        console.log("Command:", command);

        if (command.startsWith("music ")) {
            const query = command.substring(6).trim();
            console.log("Query:", query);

            if (!query) {
                return message.reply("🎵 Please provide a search query after the 'music' command.");
            }

            const SEARCH_API_URL = `https://jiosaavn-api-rztc.onrender.com/api/search/songs?query=${encodeURIComponent(query)}`;

            try {
                const searchResponse = await axios.get(SEARCH_API_URL);
                console.log("Search API Response:", searchResponse.data);

                if (searchResponse.data && searchResponse.data.results && searchResponse.data.results.length > 0) {
                    const song = searchResponse.data.results[0];
                    const songId = song.id;
                    const DETAIL_API_URL = `https://jiosaavn-api-rztc.onrender.com/api/songs?id=${songId}`;

                    const detailResponse = await axios.get(DETAIL_API_URL);
                    console.log("Detail API Response:", detailResponse.data);

                    if (detailResponse.data && detailResponse.data.song && detailResponse.data.song.downloadUrl) {
                        const downloadUrl = detailResponse.data.song.downloadUrl;

                        const downloadPath = path.resolve(__dirname, `${song.title}.mp3`);
                        const writer = fs.createWriteStream(downloadPath);

                        const downloadResponse = await axios({
                            url: downloadUrl,
                            method: 'GET',
                            responseType: 'stream',
                        });

                        downloadResponse.data.pipe(writer);

                        writer.on('finish', async () => {
                            console.log(`Downloaded song: ${downloadPath}`);
                            await message.reply({
                                body: `🎶 Here is your song: ${song.title} by ${song.primary_artists}`,
                                attachment: fs.createReadStream(downloadPath),
                            });
                            fs.unlinkSync(downloadPath); // Delete the file after sending
                        });

                        writer.on('error', (error) => {
                            console.error('Error downloading the song:', error);
                            return message.reply('⚠️ Sorry, there was an error downloading the song.');
                        });
                    } else {
                        return message.reply("😔 No download URL found for the song.");
                    }
                } else {
                    return message.reply("😔 No songs found for your query.");
                }
            } catch (error) {
                console.error('Error fetching music data:', error);
                return message.reply('⚠️ Sorry, there was an error fetching the music data.');
            }
        }
    }
};