import express from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import path from 'path';

import stations from './routes/stations.js';
import journeys from './routes/journeys.js';

export const app = express();
const buildPath = path.join(process.cwd() + '/build');

/**
 * Express routes and middlewares
 */
app.use(cors())
app.use(express.static(buildPath));
app.get('/', (_, res) => res.sendFile(path.join(buildPath, 'index.html')));

app.get('/ping', (_, res) => res.send('pong'));
app.get('/stations', stations);
app.get('/journeys', journeys);

/**
 * App server
 */
const tlsServerOptions = {
  key: fs.readFileSync('dev-certs/server-key.pem'),
  cert: fs.readFileSync('dev-certs/server-crt.pem'),
};
const port = process.env.EXPRESS_PORT || 3001;
export const server = https
  .createServer(tlsServerOptions, app)
  .listen(port, () => {
    console.log(`Express server listening on port: ${port}`);
  });

