import express from "express";
import fs from 'fs';
import https from 'https';
import cors from 'cors';
// fai finta che questo sia il tuo database
import fixture from './fixtures.json' assert {type: 'json'};

//create un'applicazione express
const app = express();

// cors serve per permettere al client di fare richieste ad altri URL
app.use(cors())

// i tuoi URL:
// in questi puoi scegliere le risorse che vuoi fare partire nel tuo server
// possono essere get (per ottenere dati), post (per aggiungere dati), put (per aggiornare dati), delete (per aggiornare dati)
app.get('/verdura', (req, res) => {
    const result = fixture.verdure;
    res.send(result)
})
app.get('/frutta', (req, res) => {
    const result = fixture.frutta;
    res.send(result)
})

// non ti preoccupare di questo, in genere copiali e incollali se crei un server
// le cert servono per farlo partire in https (chrome non supporta piu' http)
const tlsServerOptions = {
    key: fs.readFileSync('dev-certs/server-key.pem'),
    cert: fs.readFileSync('dev-certs/server-crt.pem'),
};
const port = process.env.EXPRESS_PORT || 3001;
export const server = https.createServer(tlsServerOptions, app).listen(port, () => {
    console.log(`Express server listening on port: ${port}`);
});
