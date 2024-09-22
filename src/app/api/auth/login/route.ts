import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const mongoUri = "mongodb+srv://mrithunjay26:77820897@comments.jx9xmpc.mongodb.net/"; // Your MongoDB URI
const client = new MongoClient(mongoUri);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            await client.connect();
            const db = client.db('your_db_name'); // Replace with your database name

            // Find the user
            const user = await db.collection('users').findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Check password
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            // User is authenticated, you may want to create a session here

            res.status(200).json({ message: 'Login successful' });
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
