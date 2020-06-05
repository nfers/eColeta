import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import routes from './routes/';

const app = express();

app.use(bodyParser());

app.use(express.json());

app.use(cors());

app.use(routes);

app.use('/api/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3030);

