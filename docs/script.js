import { backendUrl } from './config.js';
import logger, { setLoggingEnabled } from './logger.js';

// comment to force new github pages deployment

let gridSize;
let grayscaleValues;

document.addEventListener('DOMContentLoaded', async () => {
    const config = await fetchConfig();
    gridSize = config.gridSize;
    grayscaleValues = config.grayscaleValues;
    setLoggingEnabled(config.loggingEnabled);

    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');

    document.getElementById('generateButton').addEventListener('click', () => {
        document.getElementById('imageUpload').value = '';
        const randomPixelValues = generateRandomPixelValues();
        const randomNumber = pixelValuesToNumber(randomPixelValues);
        updateNumberInput(randomNumber.toString());
        retrieveImage(randomNumber.toString());
    });

    document.getElementById('imageUpload').addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch(`${backendUrl}/upload`, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`Failed to upload image: ${response.statusText}`);
                }

                const result = await response.json();
                const number = result.number;
                updateNumberInput(number);
                retrieveImage(number);
            } catch (error) {
                logger.error('Error uploading image:', error);
            }
        }
    });

    document.getElementById('numberInput').addEventListener('input', debounce((event) => {
        const number = event.target.value;
        logger.log('changed number!');
        retrieveImage(number);
    }, 100));
});

/**
 * Fetches configuration from the backend.
 * @returns {Promise<Object>} - The configuration object.
 */
async function fetchConfig() {
    try {
        const response = await fetch(`${backendUrl}/config`);
        const config = await response.json();
        logger.log('Fetched config:', config);
        return config;
    } catch (error) {
        logger.error('Error fetching config:', error);
    }
}

/**
 * Generates random pixel values based on the grid size and grayscale values.
 * @returns {number[]} - Array of random pixel values.
 */
function generateRandomPixelValues() {
    const pixelValues = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
        pixelValues.push(Math.floor(Math.random() * grayscaleValues)); // Random value between 0 and grayscaleValues - 1, uniform distribution
    }
    logger.log("pixelValues: ", pixelValues);
    return pixelValues;
}

/**
 * Converts an array of pixel values to a number.
 * @param {number[]} pixelValues - Array of pixel values.
 * @returns {BigInt} - The resulting number.
 */
function pixelValuesToNumber(pixelValues) {
    const number = pixelValues.reduce((acc, val) => acc * BigInt(grayscaleValues) + BigInt(val), BigInt(0));
    logger.log('Number:', number);
    return number;
}

/**
 * Retrieves the image for a given number from the backend.
 * @param {string} number - The number as a string.
 */
async function retrieveImage(number) {
    try {
        logger.log(`Retrieving image for number: ${number}`);
        const response = await fetch(`${backendUrl}/retrieve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number })
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        logger.log('Image URL:', imageUrl);

        const imageCanvas = document.getElementById('imageCanvas');
        const ctx = imageCanvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            logger.log('Image loaded successfully.');
            imageCanvas.width = img.width;
            imageCanvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };

        img.onerror = (err) => {
            logger.error('Error loading image:', err);
        };

        img.src = imageUrl;
    } catch (error) {
        logger.error('Error retrieving image:', error);
    }
}

/**
 * Updates the number input field with a new number.
 * @param {string} number - The new number.
 */
function updateNumberInput(number) {
    const numberInput = document.getElementById('numberInput');
    numberInput.value = number;
}

/**
 * Debounce function to delay the execution of a function.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        logger.log('Debouncing...');
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}