const moment = require("moment");

function formatMessage(username, text) {
    return {
        username, 
        text,
        time: moment().format('h:mm a')  // the time now in hour minute am/pm format
    }
}

module.exports = formatMessage;