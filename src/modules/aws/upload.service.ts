import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.getOrThrow('AWS_BUCKET_REGION');
    const endpoint = `https://s3.${region}.amazonaws.com`;

    this.s3Client = new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async upload(fileName: string, file: Buffer): Promise<string> {
    const bucketName = this.configService.getOrThrow('AWS_BUCKET_NAME');

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: file,
      }),
    );

    // Construir y retornar la URL de la imagen
    const imageUrl = `https://${bucketName}.s3.${this.configService.getOrThrow('AWS_BUCKET_REGION')}.amazonaws.com/${fileName}`;
    return imageUrl;
  }
}