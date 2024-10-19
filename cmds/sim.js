const axios = require("axios");

module.exports = {
  config: {
    name: 'sim',
    aliases: ['simsimi'],
    version: '1.0',
    author: 'Eugene Aguilar', // fixed by Alex api by Mark Hitsuraan
    countDown: 3,
    role: 0,
    shortDescription: 'Chat with Simini',
    longDescription: 'sim your message',
    category: 'fun',
    guide: '{pn}',
  },

  onStart: async function ({ api, event, args, reply }) {
    try {
      let message = args.join(" ");
      if (!message) {
        return api.sendMessage(`please put a message`, event.threadID, event.messageID);
      }

      console.log(`Sending request to API with message: ${message}`);
      const response = await axios.get(`https://markdevs69v2.onrender.com/api/sim/get/${message}`);
      console.log(`API response: ${JSON.stringify(response.data)}`);
      const respond = response.data.reply;

      console.log(`Respond variable: ${respond}`);
      console.log(`typeof respond: ${typeof respond}`);

      console.log(`Sending message to user: ${respond}`);
      api.sendMessage(respond, event.threadID, event.messageID);
    } catch (error) {
      console.error("An error occurred:", error);
      api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
    }
  }
};
