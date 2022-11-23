import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export const mullterConfig : multer.Options = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'music'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'music'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) {
                    cb(err, 'erro')
                }

                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName)
            })
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'audio/mpeg',
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/webp'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Invalid file type.'))
        }
    },
    limits: {
        fileSize: 2 * 2024 * 1024
    }
};