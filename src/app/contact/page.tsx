"use client";
import { useState } from 'react';
import Link from 'next/link';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', { name, email, message });
        // Handle form submission logic here
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-600 opacity-50"></div>
                <div
                    className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
                <div
                    className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-tr from-pink-500 to-red-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
                <div
                    className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-tl from-green-500 to-teal-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            </div>

            <header className="flex justify-between items-center p-4 relative z-10">
                <div className="flex items-center space-x-2">
                    <img src="/StuImpact.png?height=32&width=32" alt="STUimpact Logo" className="h-8 w-8"/>
                    <span className="text-xl font-bold">STUimpact</span>
                </div>
                <nav className="flex items-center space-x-4">
                <a href="/" className="text-gray-300 hover:text-white">Home</a>
                    <a href="/nonprofits" className="text-gray-300 hover:text-white">Nonprofits</a>
                    <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
                    <Link href="/opportunities">
                        <button
                            className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-full px-4 py-2 text-white transition duration-300 hover:scale-105">
                            Find Opportunities
                        </button>
                    </Link>
                </nav>
            </header>

            <main className="flex-grow container mx-auto px-4 py-20 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-2">Contact Us</h2>
                    <p className="text-lg text-white mb-4">Contact For Any Query</p>
                    <p className="text-md text-gray-200 max-w-xl mx-auto">
                        The Contact Form can be used for internship messages, partnership requests, and general messages
                        on StuImpact. Thank you!
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-[#2A2A3A] p-8 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2 text-white" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2 text-white" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
                            placeholder="Your Email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2 text-white" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
                            placeholder="Your Message"
                            rows="4"
                            required
                        />
                    </div>
                    <button type="submit"
                            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded">
                        Send Message
                    </button>
                </form>
            </main>

            <footer className="bg-[#1A1A2E] py-10">
                <div className="container mx-auto px-4 text-center">
                    <p>© StuImpact All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default ContactPage;
