import sharp from 'sharp';

export async function processImage(buffer, options = {}) {
    const {
        maxWidth = 2000,
        maxHeight = 2000,
        quality = 85,
        createThumbnail = true,
        thumbnailWidth = 400,
        thumbnailHeight = 400
    } = options;

    try {
        // Get image metadata
        const metadata = await sharp(buffer).metadata();

        // Process main image
        let imageProcessor = sharp(buffer);

        // Resize if necessary
        if (metadata.width > maxWidth || metadata.height > maxHeight) {
            imageProcessor = imageProcessor.resize(maxWidth, maxHeight, {
                fit: 'inside',
                withoutEnlargement: true
            });
        }

        // Convert to WebP and compress
        const processedImage = await imageProcessor
            .webp({ quality })
            .toBuffer();

        const result = {
            image: processedImage,
            metadata: {
                width: metadata.width,
                height: metadata.height,
                format: 'webp',
                size: processedImage.length
            }
        };

        // Create thumbnail if requested
        if (createThumbnail) {
            const thumbnail = await sharp(buffer)
                .resize(thumbnailWidth, thumbnailHeight, {
                    fit: 'cover',
                    position: 'center'
                })
                .webp({ quality: 80 })
                .toBuffer();

            result.thumbnail = thumbnail;
            result.thumbnailMetadata = {
                width: thumbnailWidth,
                height: thumbnailHeight,
                format: 'webp',
                size: thumbnail.length
            };
        }

        return result;
    } catch (error) {
        console.error('Image processing error:', error);
        throw new Error('Failed to process image: ' + error.message);
    }
}

export async function getImageDimensions(buffer) {
    const metadata = await sharp(buffer).metadata();
    return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format
    };
}
