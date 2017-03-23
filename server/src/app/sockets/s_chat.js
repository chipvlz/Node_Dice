﻿import chatModel from '../Models/chatModel';
import logger from '../helper/logger';
const chat = (io) => {
 
   
    io.on('connection', (socket) => {
        
        socket.on('getChats',  () => {
            chatModel.GetChats( (err, chats) => {
                if (err) return console.error('getChats error:' + err);
                socket.emit('getChats', chats);
            });
        });

        socket.on('sendChat',  (chat) =>{

            logger.info('chat: ' + chat.message );

         //   chat.chatUser = session.username;
            chat.timeStamp = new Date();
            chatModel.AddChat(chat,  (err) => {
                if (err) return console.error('sendChat error:' + err);
            });
            io.emit('recvChat', {
           //     user: chat.chatUser, 
                timeStamp: chat.timeStamp, 
                message: chat.message
            });
        });
    });

};

export default chat;