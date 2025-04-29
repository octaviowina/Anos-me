module.exports = {
  config: {
    name: "help",
    aliases: ["aide", "commands"],
    version: "1.0",
    author: "VOLDIGO",
    countDown: 5,
    role: 0,
    shortDescription: "Affiche la liste des commandes",
    longDescription: "Montre toutes les commandes disponibles ou les détails d'une commande spécifique",
    category: "Utilitaires",
    guide: "{p}help [commande]",
  },

  onStart: async function ({ api, event, args, commands }) {
    const { threadID, messageID } = event;

    if (!args[0]) {
      // Liste des commandes
      const commandList = commands
        .map(cmd => `🔹 cmd.config.name :{cmd.config.shortDescription}`)
        .join("\n");

      return api.sendMessage(
        `✨ Liste des commandes disponibles ✨\n\n${commandList}\n\n❓ Utilise "{p}help [nomCommande]" pour plus d'infos.`,
        threadID,
        messageID
      );
    } else {
      // Détail d'une commande
      const name = args[0].toLowerCase();
      const command =commands.find(cmd => cmd.config.name === name || (cmd.config.aliases        cmd.config.aliases.includes(name)));

      if (!command) 
        return api.sendMessage(`❌ La commande "{name}" est introuvable.`, threadID, messageID);
      }

      const config = command.config;
      return api.sendMessage(
        `📘 Commande : config.name📌 Description :{config.longDescription || config.shortDescription}\n🔁 Alias : config.aliases?.join(", ") || "Aucun"📚 Guide :{config.guide || "Pas de guide disponible"}\n🔐 Rôle requis : ${config.role}`,
        threadID,
        messageID
      );
    }
  }
};
