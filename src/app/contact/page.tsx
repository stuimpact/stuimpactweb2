'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const Button = ({ children, className, ...props }) => (
    <button
        className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${className}`}
        {...props}
    >
        {children}
    </button>
)

const Input = ({ className, ...props }) => (
    <input
        className={`w-full px-4 py-2 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
    />
)

const Textarea = ({ className, ...props }) => (
    <textarea
        className={`w-full px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
    />
)

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', { name, email, message });
        // Handle form submission logic here
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,0 L100,0 L100,100 Q50,80 0,100 Z" fill="#3B82F6" opacity="0.1" />
                    <path d="M0,0 Q50,20 100,0 L100,100 L0,100 Z" fill="#EC4899" opacity="0.1" />
                </svg>
                <div className="absolute top-1/4 right-0 w-72 h-72 bg-gradient-to-bl from-pink-200 to-red-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-tr from-green-200 to-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-tl from-yellow-200 to-orange-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            </div>

            <header className="sticky top-0 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-sm z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        <img src="stuimpactt.png" alt="StuImpact Logo" className="h-10" />
                    </Link>
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/" className="text-sm hover:text-blue-600 transition-colors">Home</Link>
                        <Link href="/nonprofits" className="text-sm hover:text-blue-600 transition-colors">Nonprofits</Link>
                        <Link href="/contact" className="text-sm hover:text-blue-600 transition-colors">Contact</Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <Link href="/opportunities">
                            <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg">Find Opportunities</Button>
                        </Link>
                        <button onClick={toggleMenu} className="md:hidden text-gray-600 hover:text-blue-600 transition-colors">
                            {menuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </header>

            {menuOpen && (
                <div className="fixed inset-0 bg-white z-40 md:hidden">
                    <div className="container mx-auto px-4 py-8">
                        <button onClick={toggleMenu} className="absolute top-4 right-4 text-gray-600 hover:text-blue-600 transition-colors">
                            <X />
                        </button>
                        <nav className="flex flex-col space-y-6">
                            <Link href="/" className="text-lg hover:text-blue-600 transition-colors" onClick={toggleMenu}>Home</Link>
                            <Link href="/nonprofits" className="text-lg hover:text-blue-600 transition-colors" onClick={toggleMenu}>Nonprofits</Link>
                            <Link href="/contact" className="text-lg hover:text-blue-600 transition-colors" onClick={toggleMenu}>Contact</Link>
                            <Link href="/opportunities" onClick={toggleMenu}>
                                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg">Find Opportunities</Button>
                            </Link>
                        </nav>
                    </div>
                </div>
            )}

            <main className="container mx-auto px-4 py-20 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
                    <p className="text-xl mb-4">Contact For Any Query</p>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        The Contact Form can be used for internship messages, partnership requests, and general messages
                        on StuImpact. Thank you!
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
                        <Input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" htmlFor="message">Message</label>
                        <Textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Your Message"
                            rows="4"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg">
                        Send Message
                    </Button>
                </form>
            </main>

            <footer className="bg-gray-100 py-10 relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm text-gray-600">© 2023 StuImpact. All Rights Reserved.</p>
                    <p className="text-sm text-gray-600 mt-2">501(C)3 Non-profit (EIN:61-2122338)</p>
                </div>
            </footer>
        </div>
    );
}
