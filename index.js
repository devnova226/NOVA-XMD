import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import qrRouter from './qr.js';
import pairRouter from './pair.js';

const app = express();

// CORS (important pour que Vercel puisse appeler Render)
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;

// Éviter limite d’événements
import('events').then(events => {
    events.EventEmitter.defaultMaxListeners = 500;
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Routes API
app.use('/qr', qrRouter);
app.use('/code', pairRouter);

// Pages HTML
app.use('/pair', (req, res) => {
    res.sendFile(path.join(__dirname, 'pair.html'));
});
app.use('/qrpage', (req, res) => {
    res.sendFile(path.join(__dirname, 'qr.html'));
});
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.listen(PORT, () => {
    console.log(`YouTube: @GlobalTechInfo\nGitHub: @GlobalTechInfo\nServer running on http://localhost:${PORT}`);
});

export default app;