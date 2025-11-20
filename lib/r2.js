import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

export async function uploadToR2(buffer, key, contentType) {
    try {
        const command = new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: contentType,
        });

        await r2Client.send(command);

        // Return public URL
        const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;
        return { success: true, url: publicUrl };
    } catch (error) {
        console.error('R2 upload error:', error);
        return { success: false, error: error.message };
    }
}

export async function deleteFromR2(key) {
    try {
        const command = new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: key,
        });

        await r2Client.send(command);
        return { success: true };
    } catch (error) {
        console.error('R2 delete error:', error);
        return { success: false, error: error.message };
    }
}

export function getR2Url(key) {
    return `${process.env.R2_PUBLIC_URL}/${key}`;
}
