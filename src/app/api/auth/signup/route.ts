import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const mongoUri = "mongodb+srv://mrithunjay26:77820897@comments.jx9xmpc.mongodb.net/"; // Your MongoDB URI
const client = new MongoClient(mongoUri);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            await client.connect();
            const db = client.db('user'); // Replace with your database name

            // Check if user already exists
            const existingUser = await db.collection('users').findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save user to database
            await db.collection('users').insertOne({ email, password: hashedPassword });

            // Send verification email
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "mrithunjay@stuimpact.works",
                    pass: "26IMSknights!",
                },
            });

            const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit code
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Email Verification',
                text: `Your verification code is ${verificationCode}`,
            });

            // You may want to save the verification code to the database for validation

            res.status(200).json({ message: 'User registered. Please check your email for verification.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await client.close();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
