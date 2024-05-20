const sharp = require('sharp');

const pixelValues = [
    0, 85, 170, 255,
    85, 170, 255, 0,
    170, 255, 0, 85,
    255, 0, 85, 0
];

const buffer = Buffer.from(pixelValues);
console.log('Buffer created, length:', buffer.length);
console.log('Buffer data:', buffer);

sharp(buffer, {
    raw: {
        width: 4,
        height: 4,
        channels: 1
    }
})
.resize({ width: 400, height: 400, kernel: sharp.kernel.nearest }) // Resize for visibility
.png()
.toFile('output.png', (err, info) => {
    if (err) {
        console.error('Failed to generate image:', err);
    } else {
        console.log('Image generated successfully:', info);
    }
});
