import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';
import path from 'path';
import fs from 'fs';


const uploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser to handle file uploads
  },
};

export async function POST(req: NextRequest) {
  return new Promise((resolve, reject) => {
    upload.single('profileImage')(req as any, {} as any, async (err: any) => {
      if (err) {
        console.error(`Error uploading file: ${err.message}`);
        return resolve(new NextResponse(JSON.stringify({ error: `Error uploading file: ${err.message}` }), { status: 500 }));
      }

      // Access parsed body from request
      const formData = new URLSearchParams(await req.text());
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const profileImage = (req as any).file;

      if (profileImage) {
        const profileImagePath = `/uploads/${profileImage.filename}`;
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Profile Image Path:', profileImagePath);

        return resolve(new NextResponse(JSON.stringify({ message: 'Profile updated successfully!', profileImagePath }), { status: 200 }));
      } else {
        return resolve(new NextResponse(JSON.stringify({ error: 'No file uploaded.' }), { status: 400 }));
      }
    });
  });
}
