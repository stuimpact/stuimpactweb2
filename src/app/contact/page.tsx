"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
    <button
        className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${className}`}
        {...props}
    >
        {children}
    </button>
);

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => (
    <input
        className={`w-full px-4 py-2 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
    />
);

// Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => (
    <textarea
        className={`w-full px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
    />
);

export default function ContactPage() {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => setMenuOpen(!menuOpen);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch("/api/contac", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, message }),
			});

			if (response.ok) {
				alert("Message sent successfully!");
				setName("");
				setEmail("");
				setMessage("");
			} else {
				const errorData = await response.json();
				alert(`Error: ${errorData.message}`);
			}
		} catch (error) {
			alert(`Error: ${error}`);
		}
	};

	return (
		<div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
			{/* Header and SVG Background */}
			<header className="sticky top-0 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-sm z-50">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<Link href="/" className="text-2xl font-bold text-blue-600">
						<img src="stuimpactt.png" alt="StuImpact Logo" className="h-10" />
					</Link>
					<nav className="hidden md:flex space-x-6">
						<Link href="/" className="text-sm hover:text-blue-600 transition-colors">
							Home
						</Link>
						<Link href="/nonprofits" className="text-sm hover:text-blue-600 transition-colors">
							Nonprofits
						</Link>
						<Link href="/contact" className="text-sm hover:text-blue-600 transition-colors">
							Contact
						</Link>
					</nav>
					<div className="flex items-center space-x-4">
						<Link href="/opportunities">
							<Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg">
								Find Opportunities
							</Button>
						</Link>
						<button
							onClick={toggleMenu}
							className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
						>
							{menuOpen ? <X /> : <Menu />}
						</button>
					</div>
				</div>
			</header>

			{/* Contact Form */}
			<main className="container mx-auto px-4 py-20 relative z-10">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold mb-4">Contact Us</h2>
					<p className="text-xl mb-4">Contact For Any Query</p>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						The Contact Form can be used for internship messages, partnership requests, and general messages on StuImpact. Thank you!
					</p>
				</div>
				<form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
					<div className="mb-6">
						<label className="block font-medium mb-2 text-md" htmlFor="name">
							Name
						</label>
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
						<label className="block text-md font-medium mb-2" htmlFor="email">
							Email
						</label>
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
						<label className="block text-md font-medium mb-2" htmlFor="message">
							Message
						</label>
						<Textarea
							id="message"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Your Message"
							rows={4}
							required
						/>
					</div>
					<Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg">
						Send Message
					</Button>
				</form>
			</main>

			{/* Footer */}
			<footer className="bg-gray-100 py-10 relative z-10">
				<div className="container mx-auto px-4 text-center">
					<p className="text-sm text-gray-600">© 2023 StuImpact. All Rights Reserved.</p>
					<p className="text-sm text-gray-600 mt-2">501(C)3 Non-profit (EIN:61-2122338)</p>
				</div>
			</footer>
		</div>
	);
}
