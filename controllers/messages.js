const Message = require('../models/message');
const { request, response } = require("express");

const chat = async (req = request, res = response) => {
    const myID = req.uid;
    const messageDe = req.params.de;
    const last30 = await Message.find({
        $or: [
            {de: myID, para: messageDe},
            {de: messageDe, para: myID},
        ]
    }).sort({createdAt: 'asc'})
    .limit(30);

    res.json({
        ok: true,
        messages: last30,
    });
};

module.exports = {
    chat
}