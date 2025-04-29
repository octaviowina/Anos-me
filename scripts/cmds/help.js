const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 義 𝐂𝐡𝐫𝐢𝐬 𝐬𝐭 | 😈 勇 ]";
 
module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "NTKhang", // orginal author Kshitiz
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "View command usage",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },
 
  onStart: async function ({ message, args, event, threadsData, role }) {
  const { threadID } = event;
  const threadData = await threadsData.get(threadID);
  const prefix = getPrefix(threadID);
 
  if (args.length === 0) {
      const categories = {};
      let msg = "";
 
      msg += `╔══════════════╗\n      𝐌𝐢𝐧𝐚𝐭𝐨 𝐤𝐚𝐦𝐢𝐤𝐚𝐳𝐞\n╚══════════════╝`;
 
      for (const [name, value] of commands) {
          if (value.config.role > 1 && role < value.config.role) continue;
 
          const category = value.config.category || "Uncategorized";
          categories[category] = categories[category] || { commands: [] };
          categories[category].commands.push(name);
      }
8
      Object.keys(categories).forEach(category => {
          if (category !== "info") {
              msg += `\n╭────────────⭓\n│『 ${category.toUpperCase()} 』`;
 
              const names = categories[category].commands.sort();
              for (let i = 0; i < names.length; i += 1) {
                  const cmds = names.slice(i, i + 1).map(item => `│★${item}`);
                  msg += `\n${cmds.join(" ".repeat(Math.max(0, 5 - cmds.join("").length)))}`;
              }
 
              msg += `\n╰────────⭓`;
          }
      });
 
      const totalCommands = commands.size;
      msg += `\n𝐀𝐜𝐭𝐮𝐞𝐥𝐥𝐞𝐦𝐞𝐧𝐭, 𝐌𝐢𝐧𝐚𝐭𝐨 𝐚 ${totalCommands} 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬 𝐪𝐮𝐢 𝐩𝐞𝐮𝐯𝐞𝐧𝐭 ê𝐭𝐫𝐞 𝐮𝐭𝐢𝐥𝐢𝐬é𝐞𝐬. 𝐁𝐢𝐞𝐧𝐭ô𝐭, 𝐝𝐚𝐯𝐚𝐧𝐭𝐚𝐠𝐞 𝐝𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬 𝐬𝐞𝐫𝐨𝐧𝐭 𝐚𝐣𝐨𝐮𝐭é𝐞𝐬 𝐜𝐡𝐞𝐳 𝐦𝐢𝐧𝐚𝐭𝐨 𝐧𝐚𝐦𝐢𝐤𝐚𝐳𝐞.\n`;
      msg += `𝙏𝙮𝙥𝙚 ${prefix} 𝐂𝐦𝐝 𝐡𝐞𝐥𝐩 : 𝐍𝐨𝐦 𝐩𝐨𝐮𝐫 𝐯𝐨𝐢𝐫 𝐥𝐞𝐬 𝐝é𝐭𝐚𝐢𝐥𝐬 𝐝𝐞 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.\n`;
      msg += `𝐏𝐎𝐔𝐑 𝐓𝐎𝐔𝐓𝐄 𝐀𝐔𝐓𝐑𝐄 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍, 𝐂𝐎𝐍𝐓𝐀𝐂𝐓𝐄𝐙 𝐋𝐄 𝐏𝐑𝐎𝐏𝐑𝐈É𝐓𝐀𝐈𝐑𝐄 𝐂𝐇𝐑𝐈𝐒 𝐒𝐓 𝐄𝐍 𝐓𝐀𝐏𝐀𝐍𝐓 .𝐂𝐀𝐋𝐋𝐀𝐃 𝐇𝐄𝐋𝐏.`;
 
 
      const helpListImages = [
 
"https://i.ibb.co/p2XTMGt/a578eabd-155d-40ee-a4ee-0b3fe0602d36.jpg",
"https://i.ibb.co/p2XTMGt/a578eabd-155d-40ee-a4ee-0b3fe0602d36.jpg', ",
"https://i.ibb.co/p2XTMGt/a578eabd-155d-40ee-a4ee-0b3fe0602d36.jpg",
"https://i.ibb.co/p2XTMGt/a578eabd-155d-40ee-a4ee-0b3fe0602d36.jpg",
"https://i.ibb.co/p2XTMGt/a578eabd-155d-40ee-a4ee-0b3fe0602d36.jpg",
"https://i.ibb.co/p2XTMGt/a578eabd-155d-40ee-a4ee-0b3fe0602d36.jpg",
"https://i.ibb.co/p2XTMGt/a578eabd-155d-40ee-a4ee-0b3fe0602d36.jpg"
];
 
 
      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];
 
 
      await message.reply({
          body: msg,
          attachment: await global.utils.getStreamFromURL(helpListImage)
      });
  } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));
 
      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";
 
        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";
 
        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);
 
        const response = `╭── NAME ────⭓
  │ ${configCommand.name}
  ├── INFO
  │ Description: ${longDescription}
  │ Other names: ${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}
  │ Other names in your group: Do not have
  │ Version: ${configCommand.version || "1.0"}
  │ Role: ${roleText}
  │ Time per command: ${configCommand.countDown || 1}s
  │ Author: ${author}
  ├── Usage
  │ ${usage}
  ├── Notes
  │ The content inside <XXXXX> can be changed
  │ The content inside [a|b|c] is a or b or c
  ╰━━━━━━━❖`;
 
        await message.reply(response);
      }
    }
  },
};
 
function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
                    }
