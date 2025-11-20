import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import { processImage } from '@/lib/imageProcessor';
import { uploadToR2 } from '@/lib/r2';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
    const auth = checkAuth();
    if (!auth.authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const type = formData.get('type') || 'content'; // 'content' or 'gallery'

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Read file buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Process image
        const processed = await processImage(buffer, {
            maxWidth: type === 'gallery' ? 2000 : 1200,
            maxHeight: type === 'gallery' ? 2000 : 1200,
            quality: 85,
            createThumbnail: type === 'gallery'
        });

        // Generate unique filename
        const fileId = uuidv4();
        const mainKey = `${type}/${fileId}.webp`;

        // Upload main image to R2
        const uploadResult = await uploadToR2(
            processed.image,
            mainKey,
            'image/webp'
        );

        if (!uploadResult.success) {
            return NextResponse.json(
                { error: 'Upload failed: ' + uploadResult.error },
                { status: 500 }
            );
        }

        const result = {
            success: true,
            url: uploadResult.url,
            metadata: processed.metadata
        };

        // Upload thumbnail if it exists
        if (processed.thumbnail) {
            const thumbnailKey = `${type}/thumbnails/${fileId}.webp`;
            const thumbResult = await uploadToR2(
                processed.thumbnail,
                thumbnailKey,
                'image/webp'
            );

            if (thumbResult.success) {
                result.thumbnailUrl = thumbResult.url;
            }
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
