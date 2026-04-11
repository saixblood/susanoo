const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "اوامر",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SAIN",
  description: "عرض قائمة الأوامر المتاحة",
  commandCategory: "النظام",
  usages: "اوامر",
  cooldowns: 3
};

module.exports.languages = {
  "vi": {},
  "en": {}
};

module.exports.onLoad = () => {};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;

  const cmdsPath = __dirname;
  const files = fs.readdirSync(cmdsPath).filter(f => f.endsWith(".js"));

  const names = [];
  for (const f of files) {
    try {
      const cmd = require(path.join(cmdsPath, f));
      if (cmd.config?.name) names.push(cmd.config.name);
    } catch {}
  }

  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const cmdList = names.map(n => `𖠄 ‹ ${n} › 𖠄`).join("\n\n");

  const msg =
    `⏤͟͟͞͞ َ🕷️ 𝕭ᷭ͢𝐨𝐭 𝖝 𝐒𝐨𝐬𝐚𝐧𝐨 🪼\n\n`
    + `        𖡩 ⥔𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝕷͜𝗜𝗦𝗧⥕  𖡩\n\n`
    + cmdList
    + `\n\n---------------------------------------\n\n`
    + `🕷️⏤͟͟͞͞ َ𝕾̸̷̶ 𝐒𝖔𝐬𝖆𝐧𝖔 • 𝕷͜𝗜𝗦͡𝗧  -   🪼\n\n`
    + `--◜𓆩𝐒𝖔𝖘𝖆𝖓𝖔𓆩𖠻𓆪 ͟𝖇𝐲̰ 𝗦𝖆𝖎𓉈\n\n`
    + `🪄🎩 تفضل سيدي، هذه قائمة أوامري المتاحة 𓆩𖠻𓆪\n`
    + `🕐 ${time}`;

  return api.sendMessage(msg, threadID, messageID);
};
