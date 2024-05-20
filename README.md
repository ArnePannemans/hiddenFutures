# Project

This is a fun 'art' project built together with my dad. The main functionality is a UI that allows users to play and experiment with converting really big numbers into images and vice versa. The idea is that every image you can imagine—whether it's a picture of how you'll look when you're 80, the view from the top of Mount Everest, or the winning lottery numbers for next week—exists somewhere within a grid of pixels, each associated with a unique number. You can start from a randomly generated number, choose a number yourself, or upload an image.

The underlying philosophy is that all images exist somewhere within this grid and can be retrieved with the right number, if only we had the right number... However, in practice, almost all numbers will generate meaningless noise due to the random configuration of pixels (insert interesting link with entropy). But that's part of the fun! Press the "Feeling Lucky?" button to test your luck and see if you can generate something interesting. Who knows, you might stumble upon an image of next week's lottery numbers or a hidden masterpiece!

On the flip side, you can also upload an image and retrieve its magic number. Imagine finding the unique number that represents your favorite photo!

You can set the grid size and the amount of greyscale values (e.g. resolution of the image) as environment variables.

<div style="display: flex; align-items: center;">
  <img src="images/random.png" alt="Random Image" style="padding: 5px; width: 60%;" />
  <img src="images/lottooo.png" alt="Lottery Numbers" style="width: 40%; margin-left: 20px;" />
</div>



## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js (deployed using Heroku)
- **Image Processing**: Sharp

## Live demo

Try out the [demo](https://arnepannemans.github.io/hiddenFutures/)

## Setup

### Prerequisites

- Node.js installed on your machine.

### Steps

1. Clone the repository.
2. Navigate to the project directory.
3. Install the dependencies and run the backend.

```bash
   npm install
   npm start
```
4. Run frontend

```bash
   npm run frontend
```

## Future research

Currently thinking of making the pixel generation process less `random` and more aligned with how natural images actually look. [Reference](https://hal.science/hal-00453249/document). The idea is that while now all possible pixel configurations are purely random, real images follow different patterns. This change aims to make the generated images more realistic and interesting.

### Future Research

- **Shannon Entropy**: Looking into methods to control the randomness of pixel values, making them more like the information content found in natural images. For example, instead of every pixel being completely random, we can adjust the randomness to create more structured images.
- **Spatial Correlations**: Trying out techniques to make neighboring pixels more similar, just like in real images where adjacent pixels tend to have similar colors. This could involve using Perlin noise or taking inspiration from existing photos to create more natural-looking textures.
- **Natural Image Statistics**: Exploring how real images are structured and using that knowledge to guide our image generation. This way, the generated images will have patterns and structures similar to what we see in the real world.
