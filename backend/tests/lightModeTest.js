/* the inspiration for adding a light mode to the mapping function comes from the observation
* the distribution of color in natural images are not linear, but follow more spatially complex patterns
* the light mode is a simple way to introduce some of this complexity to make the random images
* visually more relatable
*/

function mapValue(value, maxValue, lightMode) {
    const normalizedValue = value / (maxValue - 1);
    if (lightMode) {
        return Math.floor(Math.sqrt(normalizedValue) * 255);
    } else {
        return Math.floor(normalizedValue * 255);
    }
}

const maxValue = 10;

const values = Array.from({ length: maxValue }, (_, i) => i);

const mappedValuesLightMode = values.map(v => mapValue(v, maxValue, true));
const mappedValuesNormalMode = values.map(v => mapValue(v, maxValue, false));

console.log('Input Values:', values);
console.log('Mapped Values in Light Mode (Square Root):', mappedValuesLightMode);
console.log('Mapped Values in Normal Mode (Linear):', mappedValuesNormalMode);
