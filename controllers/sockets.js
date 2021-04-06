const User = require('../models/users');
const Message = require('../models/message');

const userConnect = async (uid) => {
    const user = await User.findById(uid);
    user.online = true;
    await user.save();

    return user;
};

const userDisconnect = async (uid) => {
    const user = await User.findById(uid);
    user.online = false;
    await user.save();

    return user;
};

const getUsers = async () => {
    const users = await User
                        .find()
                        .sort('-online');

    return users;
};

const saveMessage = async (messages) => {
    try {
        const message = new Message(messages);
        await message.save();

        return message;
    } catch (error) {
        console.log(error);

        return false;
    }
};

module.exports = {
    userConnect,
    userDisconnect,
    getUsers,
    saveMessage,
}