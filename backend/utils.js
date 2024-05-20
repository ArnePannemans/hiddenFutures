/**
 * Utility functions for Project Papa
 */


/**
 * Maps a value to a grayscale value based on the maximum value and light mode.
 * @param {number} value - The value to map.
 * @param {number} maxValue - The maximum value.
 * @param {boolean} lightMode - The light mode flag.
 * @returns {number} - The mapped grayscale value.
 */
export function mapValue(value, maxValue, lightMode) {
    const normalizedValue = value / (maxValue - 1);
    if (lightMode) {
        return Math.floor(Math.sqrt(normalizedValue) * 255);
    } else {
        return Math.floor(normalizedValue * 255);
    }
}

/**
 * Converts a number to pixel values based on the grid size and grayscale values.
 * @param {string} numberStr - The number as a string in base 10.
 * @param {number} gridSize - The size of the grid.
 * @param {number} grayscaleValues - The number of grayscale values.
 * @param {boolean} lightMode - The light mode flag.
 * @returns {number[]} - Array of pixel values ranging from 0 to 255.
 */
export function numberToPixelValues(number, gridSize, grayscaleValues, lightMode) {
    const pixelValues = [];
    let tempNumber = BigInt(number);
    for (let i = 0; i < gridSize * gridSize; i++) {
        const pixelValue = Number(tempNumber % BigInt(grayscaleValues));
        const mappedValue = mapValue(pixelValue, grayscaleValues, lightMode);
        pixelValues.push(mappedValue);
        tempNumber = tempNumber / BigInt(grayscaleValues);
    }
    return pixelValues.reverse();
}

/**
 * Converts an array of pixel values to a number.
 * @param {number[]} pixelValues - Array of pixel values.
 * @param {number} grayscaleValues - The number of grayscale values.
 * @returns {BigInt} - The resulting number.
 */
export function pixelValuesToNumber(pixelValues, grayscaleValues) {
    const number = pixelValues.reduce((acc, val) => acc * BigInt(grayscaleValues) + BigInt(val), BigInt(0));
    return number;
}
