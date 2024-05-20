import sharp from 'sharp';
import { mapValue, numberToPixelValues, pixelValuesToNumber } from './utils.js';
import logger from '../common/logger.js';

const GRID_SIZE = parseInt(process.env.GRID_SIZE, 10) || 30;
const GREYSCALE_VALUES = parseInt(process.env.GREYSCALE_VALUES, 10) || 4;
const LIGHT_MODE = process.env.LIGHT_MODE === 'true';

export const getConfig = (req, res) => {
    logger.log('Config route hit');
    res.json({
        gridSize: GRID_SIZE,
        grayscaleValues: GREYSCALE_VALUES,
        loggingEnabled: process.env.LOGGING_ENABLED === 'true'
    });
};

export const retrieveImage = (req, res) => {
    const { number } = req.body;
    logger.log(`Received number: ${number}`);

    try {
        const pixelValues = numberToPixelValues(number, GRID_SIZE, GREYSCALE_VALUES, LIGHT_MODE);
        logger.log(`Pixel values: ${pixelValues}`);

        const buffer = Buffer.from(pixelValues);
        logger.log('Buffer created, length:', buffer.length);

        sharp(buffer, {
            raw: {
                width: GRID_SIZE,
                height: GRID_SIZE,
                channels: 1
            }
        })
        .resize({ width: 500, height: 500, kernel: sharp.kernel.nearest }) // Resize for better visibility
        .png()
        .toBuffer()
        .then((data) => {
            logger.log('Image generated successfully, size:', data.length);
            res.set('Content-Type', 'image/png');
            res.send(data);
        })
        .catch(err => {
            logger.error('Failed to generate image:', err);
            res.status(500).send({ error: 'Failed to generate image' });
        });
    } catch (error) {
        logger.error('Error processing number:', error);
        res.status(500).send({ error: 'Error processing number' });
    }
};

export const uploadImage = (req, res) => {
    logger.log('Received image upload');
    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded' });
    }

    const imageBuffer = req.file.buffer;

    sharp(imageBuffer)
        .resize(GRID_SIZE, GRID_SIZE)
        .greyscale()
        .raw()
        .toBuffer()
        .then(data => {
            const pixelValues = Array.from(data).map(value => mapValue(value, 255, LIGHT_MODE));

            // Map pixel values to the nearest greyscale values
            const mappedPixelValues = pixelValues.map(value => Math.round(value / 255 * (GREYSCALE_VALUES - 1)));

            const number = pixelValuesToNumber(mappedPixelValues, GREYSCALE_VALUES);
            logger.log('Converted image to number:', number);

            res.json({ number: number.toString() });
        })
        .catch(err => {
            logger.error('Failed to process image:', err);
            res.status(500).send({ error: 'Failed to process image' });
        });
};