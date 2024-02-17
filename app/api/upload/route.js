import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req) {
  await isAdmin();
  const data = await req.formData();
  if (data.get("file")) {
    const file = data.get("file");
    const s3CLient = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const ext = file.name.split(".").slice(-1)[0];
    const newFile = uniqid() + "." + ext;

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    s3CLient.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: newFile,
        Body: buffer,
        ACL: "public-read",
        ContentType: file.type,
      })
    );
      const links=[]
      const link=`https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${newFile}`
      links.push(link)
      return new Response(JSON.stringify(links));
  }
}
