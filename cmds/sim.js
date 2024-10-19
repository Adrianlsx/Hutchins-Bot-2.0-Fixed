const axios = require("axios");

module.exports = {
    name: "sim",
    info: "Talk to Sim",
    dev: "KENLIEPLAYS",
    onPrefix: true, // Change to false if you want no prefix
    dmUser: false, // Change to true if you want to allow DMs
    nickName: [],
    usages: "[ask]",
    cooldowns: 2, // Cooldown time in seconds

    onLaunch: async function ({ api, event, actions, args }) {
        const { messageID, threadID, senderID } = event;
        const tid = threadID;
        const mid = messageID;
        const content = encodeURIComponent(args.join(" "));

        if (!args[0]) {
            return actions.reply("Please type a message...");
        }

        try {
            const res = await axios.get(`https://simsimi.site/api/v2/?mode=talk&lang=ph&message=${content}&filter=false`);
            const respond = res.data.success;

            if (res.data.error) {
                await actions.reply(`Error: ${res.data.error}`);
            } else {
                await actions.reply(respond);
            }
        } catch (error) {
            console.error(error);
            await actions.reply("An error occurred while fetching the data.");
        }
    }
};
