import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    secure: true
})

export const uploadImageToCloudinary = async (file: File, folder: string = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER as string): Promise<UploadApiResponse | undefined> => {

    /*
        // Image upload from API route on cloudinary works on localhost but not on vercel production.
        // Had to use an alternative sdk function to make it work properly.

        const buff = await file.arrayBuffer();
        const bytes = Buffer.from(buff);

        return new Promise(async (resolve, reject) => {
            cloudinary.uploader.upload_stream({
                resource_type: 'auto',
                folder
            }, async (err, result) => {
                if (err) {
                    return reject(err.message);
                }

                return resolve(result);
            }).end(bytes);
        })
    */


    // Contains the blob's data in binary form
    const fileBuffer = await file.arrayBuffer();

    // Converting image to Data URLs and upload to cloudinary
    const mime = file.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(fileBuffer).toString('base64');
    const fileUri = `data:${mime};${encoding},${base64Data}`;


    return new Promise(async (resolve, reject) => {

        cloudinary.uploader.upload(fileUri, {
            invalidate: true,
            folder
        }, async (err, result) => {
            if (err) {
                return reject(err.message);
            }

            return resolve(result);
        })
    });

};