import { chatsDao } from "../dao/index.js";

export class ChatService {

    static getMessages(){
        return chatsDao.getMessages()
    }
    static createMessage(messageInfo){
        return chatsDao.createMessage(messageInfo)
    }
}

