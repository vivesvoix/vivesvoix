// Adam / qwkuns

import express from 'express';
import { JSONFilePreset } from 'lowdb/node';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('pages'));
app.use('/src', express.static('src'));

// const defaultData = { timestamp: Date.now(), error: "no_db" }
// const db = await JSONFilePreset('db/db.json', defaultData)

// // ébauche d'une feature permettant de modifier à distance le contenu du site sans modifier le json
// // mis en suspens pour des raisons de simplicité et de sécurité

// async function updateTimestamp() {
//     db.data.timestamp = Date.now();
//     await db.write();
// }

// await updateTimestamp();

// routes

app.get('/api/db', (req, res) => {
    res.sendFile('db/db.json', { root: '.' });
})

app.get('/favicon.ico', (req, res) => {
    res.sendFile('medias/favicon.ico', { root: '.' });
})

app.use("/medias", express.static(join(__dirname, '/medias')));

app.listen(PORT, () => {
    console.log(`Le site est lancé sur http://localhost:${PORT}`);
});