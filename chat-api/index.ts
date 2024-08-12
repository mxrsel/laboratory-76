import express from "express";
import cors, {CorsOptions} from 'cors';
import messagesRouter from './routers/messages';
import database from './database';

const app = express();
const port = 8000;

const whiteList = ['http://localhost:5173'];
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if(!origin || whiteList.indexOf(origin) === -1) {
            callback(null, origin);
        } else {
            callback(new Error('not allowed by cors'));
        }
    }
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/messages', messagesRouter);

const run = async () => {
    await database.init();

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
};

run().catch(console.error);
