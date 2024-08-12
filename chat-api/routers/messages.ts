import express from 'express';
import database from '../database';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const queryDate = req.query.datetime as string | undefined;

    if (queryDate) {
        const date = new Date(queryDate);
        if (isNaN(date.getTime())) {
            return res.status(400).json({error: 'Invalid date format'});
        }

        const filteredMessages = (await database.getMessages()).filter(
            message => new Date(message.datetime) > date
        );
        return res.json(filteredMessages);
    }

    const messages = await database.getMessages();
    return res.json(messages.slice(-30));
});

messagesRouter.post('/', async (req, res) => {
    const {author, message} = req.body;

    if (!author || !message) {
        return res.status(400).json({error: 'Author and message must be present in the request'});
    }

    const newMessage = await database.addMessage({author, message});
    return res.status(201).json(newMessage);
});

export default messagesRouter;
