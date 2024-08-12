import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Message, MessageMutation} from './types';

const filename = './database.json';
let data: Message[] = [];

const database = {
    async init() {
        try {
            const content = await fs.readFile(filename);
            data = JSON.parse(content.toString());
        } catch (e) {
            data = [];
        }
    },
    async getMessages() {
        return data;
    },
    async addMessage(message: MessageMutation) {
        const id = crypto.randomUUID();
        const datetime = new Date().toISOString();
        const newMessage: Message = {id, ...message, datetime};
        data.push(newMessage);
        await this.save();
        return newMessage;
    },
    async save() {
        return fs.writeFile(filename, JSON.stringify(data, null, 2));
    }
};

export default database;
