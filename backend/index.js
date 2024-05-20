/**
 * Project papa - Backend
 * Handles the conversion of a number to a grayscale image.
 */

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from '../common/logger.js';
import routes from './routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
    logger.log(`Server running on http://localhost:${port}`);
});
