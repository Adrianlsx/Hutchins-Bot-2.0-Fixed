const axios = require("axios");

module.exports = {
    name: "sim",
    info: "Chat with Simini",
    dev: "Eugene Aguilar",
    onPrefix: true, // Change to false if you want no prefix
    dmUser: false, // Change to true if you want to allow DMs
    nickName: ["simsimi"],
    usages: "{pn} [message]",
    cooldowns: 3, // cooldown time in seconds

    onLaunch: async function ({ api, event, actions, args }) {
        try {
            let message = args.join(" ");
            if (!message) {
                return actions.reply("Please put a message.");
            }

            console.log(`Sending request to API with message: ${message}`);
            const response = await axios.get(`https://markdevs69v2.onrender.com/api/sim/get/${message}`);
            const respond = response.data.reply;

            console.log(`Sending message to user: ${respond}`);
            await actions.reply(respond);
        } catch (error) {
            console.error("An error occurred:", error);
            await actions.reply("Oops! Something went wrong.");
        }
    }
};
