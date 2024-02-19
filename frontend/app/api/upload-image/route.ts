import { NextRequest, NextResponse } from "next/server";

import { uploadImageToCloudinary } from "@/cloudinary";

export const POST = async (req: NextRequest) => {

    // Get form data from request
    const formdata = await req.formData();

    // Extract image file
    const image = formdata.get('image') as unknown as File;

    try {
        // Upload image to cloudinary
        const data = await uploadImageToCloudinary(image);

        return NextResponse.json({
            success: true,
            image_url: data?.secure_url
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "Internal Server Error"
        }, { status: 500 });
    }

}