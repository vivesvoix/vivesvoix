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
app.use(express.static(join(__dirname, 'pages')));
app.use('/src', express.static(join(__dirname, 'src')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'pages', 'index.html'));
});

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
    res.sendFile(join(__dirname, 'db', 'db.json'));
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(join(__dirname, 'medias', 'favicon.ico'));
});

app.use("/medias", express.static(join(__dirname, 'medias')));

app.get('/.well-known/security.txt', (req, res) => {
    const securityContact = [
        'Contact: mailto:admin@vivesvoix.fr',
        'Acknowledgments: https://github.com/vivesvoix/vivesvoix',
        'Preferred-Languages: fr, en',
        'Canonical: https://vivesvoix.fr/.well-known/security.txt'
    ].join('\n');

    res.header('Content-Type', 'text/plain');
    res.send(securityContact);
});

app.get('/error', (req, res) => {
    res.sendFile(join(__dirname, 'pages', '404.html'));
});

app.use((req, res) => {
    res.status(404).sendFile(join(__dirname, 'pages', '404.html'));
});

// gestionnaire global d'erreurs (doit être le dernier middleware)
app.use((err, req, res, next) => {
    console.error("Erreur serveur détectée :", err.stack);

    const code = err.status || 500;
    const msg = encodeURIComponent("Oups, une erreur interne s'est produite. Le serveur a rencontré un problème inattendu.");
    res.redirect(`/error?code=${code}&msg=${msg}`);
});

app.listen(PORT, () => {
    console.log(`Le site est lancé sur http://localhost:${PORT}`);
});

export default app;