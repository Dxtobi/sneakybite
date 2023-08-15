import { redirect } from '@sveltejs/kit';
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_KEY_API, CLOUDINARY_KEY_SECR } from '$env/static/private';
import toStream from 'buffer-to-stream';


export async function load({ locals }) {


  if (locals.customer?.role.toLocaleLowerCase() != 'admin') {
      throw redirect(303, '/')
  }

 
}


cloudinary.config({
  cloud_name: 'jaofiles',
  api_key: CLOUDINARY_KEY_API, // Store in .env.local
  api_secret: CLOUDINARY_KEY_SECR, // Store in .env.local
  secure: true
});  
/**
 * @param {FormDataEntryValue | null } value
 */
function isEmpty(value) {
  if (value === null) return
  return value.toString().trim() === '';
}


/**
 * @type {import('@sveltejs/kit').Actions}
 */
export const actions = {
  food: async ({ request, locals }) => {
    try {
      const { FOOD } = locals;

      const data = await request.formData();
      const foodName = data.get('foodName');
      const price = data.get('price');
      const timeduration = data.get('timeduration');
      const ingredients = data.get('ingredients');
      const category = data.get('category');
      const description = data.get('description');
      const foodImage = data.get('imageURL');

     
      const validFoodImage = foodImage instanceof File;

      if (
        !foodName || isEmpty(foodName) ||
        !price || isEmpty(price) ||
        !timeduration || isEmpty(timeduration) ||
        !description || isEmpty(description) ||
        !validFoodImage ||
        !category || isEmpty(category) ||
        !ingredients || isEmpty(ingredients) 
      ) {
        // Handle validation errors here
        // ...

        return {
          success: false,
          error: true,
        };
      }

      const buffer = Buffer.from(await foodImage.arrayBuffer());
      const result = await uploadImageToCloudinary(buffer);

      if (!result) {
        throw new Error('Upload failed. Please try again later.');
      }

      const newFoodData = {
        name:foodName,
        price: price,
        timeduration,
        ingredients:parseGenres(ingredients),
        category:parseGenres(category),
        description,
        imageURL: result.url,
      };

     // console.log(newFoodData)

      const resp = await FOOD.create(newFoodData);

      if (!resp) {
        return {
          success: false,
          error: true,
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error: true,
      };
    }
  },
};





// @ts-ignore
function parseGenres(genresString) {
  // Split the genresString by commas and trim whitespace from each genre
  const genresArray = genresString.split(',').map((/** @type {string} */ genre) => genre.trim().toLowerCase());

  return genresArray;
}

/**
 * 
 * Uploads an image to Cloudinary from a File object.
 * 
 * 
 * @param {string | Buffer} fileBuffer
 *
 * @returns {Promise<import('cloudinary').UploadApiResponse | import('cloudinary').UploadApiErrorResponse>} A Promise resolving to the Cloudinary API response or an error.
 */

async function uploadImageToCloudinary(fileBuffer) {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream((error, result) => {
      if (error) return reject(error);
      // @ts-ignore
      resolve(result);
    });

    const readableStream = toStream(fileBuffer);
    console.log(readableStream)
    readableStream.pipe(upload);
  });
}
