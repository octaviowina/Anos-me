const { commands } = global.GoatBot; // On suppose que toutes les commandes sont accessibles via global.GoatBot

module.exports = {
  config: {
    name: "help",
    version: "1.0",
    author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Display all available commands",
    },
    longDescription: {
      en: "Display a categorized list of all commands available in the bot",
    },
    category: "system",
    guide: {
      en: "{pn}",
    },
  },

  onStart: async function ({ message, role }) {
    // Initialisation d'un objet pour regrouper les commandes par catégories
    const categories = {};

    // Parcours des commandes pour les classer par catégories
    for (const [name, value] of commands) {
      // Vérifie le rôle requis pour la commande
      if (value.config.role > 0 && role < value.config.role) continue;

      const category = value.config.category || "Uncategorized";
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(name);
    }

    // Construction du message à afficher
    let messageToSend = "==[📜 LIST OF COMMANDS 📜]==\n━━━━━━━━━━━━━━━━\n";
    for (const [category, cmds] of Object.entries(categories)) {
      messageToSend += `\n✨ ${category.toUpperCase()} ✨\n`;
      messageToSend += cmds.sort().map(cmd => `- ${cmd}`).join("\n");
      messageToSend += "\n";
    }

    // Ajout du total des commandes
    messageToSend += `━━━━━━━━━━━━━━━━\nTotal commands: ${commands.size}`;

    // Envoi du message
    return message.reply(messageToSend);
  },
};
