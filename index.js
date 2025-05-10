import express from 'express';
import { king } from './king.js';
import './Alive.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/send-message', async (req, res) => {
    const { number, text } = req.query;

    if (!number || !text) return res.status(400).send('Missing number or text');

    try {
        const jid = number.includes('@s.whatsapp.net') ? number : `${number}@s.whatsapp.net`;
        await king.sendMessage(jid, { text });
        res.send('Message sent!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to send message');
    }
});

app.listen(PORT, () => {
    console.log(`⚡ Flash-Md V2 running on http://localhost:${PORT}`);
});
