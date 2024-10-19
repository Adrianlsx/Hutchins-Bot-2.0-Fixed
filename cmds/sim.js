const axios = require("axios");

module.exports = {
    name: "sim",
    info: "Talk to Sim",
    dev: "KENLIEPLAYS",
    onPrefix: true,
    dmUser: false,
    nickName: [],
    usages: "[ask]",
    cooldowns: 2,

    onLaunch: async function ({ api, event, actions, args }) {
        const { messageID, threadID } = event;
        const tid = threadID;
        const mid = messageID;
        const content = encodeURIComponent(args.join(" "));

        if (!args[0]) {
            return actions.reply("Please type a message...");
        }

        console.log("User input:", args); // Log user input

        try {
            const res = await axios.get(`https://simsimi.site/api/v2/?mode=talk&lang=ph&message=${content}&filter=false`);
            console.log("API response:", res.data); // Log the API response

            if (res.data.error) {
                await actions.reply(`Error: ${res.data.error}`);
            } else {
                await actions.reply(res.data.success);
            }
        } catch (error) {
            console.error("An error occurred:", error); // Log the error
            await actions.reply("An error occurred while fetching the data.");
        }
    }
};
