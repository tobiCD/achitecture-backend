
const { token } = require('morgan')
const keyTokenModel = require('../models/keyToken.models')

const createToken = async (userId, publicKey,privateKey) => {
    try {
       
        const token = await keyTokenModel.create({
            user: userId,
            publicKey, 
            privateKey
        });
        return token ? token.publicKey : null;
    } catch (error) {
        console.error('Error in createToken:', error);
        return null;
    }
};
module.exports = {createToken}