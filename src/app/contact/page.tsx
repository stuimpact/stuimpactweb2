"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, X } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => (
	<button
		className={`w-full px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold tracking-wide transition-transform transform hover:scale-105 shadow-lg ${className}`}
		{...props}
	>
		{children}
	</button>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string;
}

const Input: React.FC<InputProps> = ({ className = "", ...props }) => (
	<input
		className={`w-full px-4 py-3 rounded-full border border-pink-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all ${className}`}
		{...props}
	/>
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	className?: string;
}

const Textarea: React.FC<TextareaProps> = ({ className = "", ...props }) => (
	<textarea
		className={`w-full px-4 py-3 rounded-lg border border-pink-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all ${className}`}
		{...props}
	/>
);

export default function ContactPage() {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [submitted, setSubmitted] = useState<boolean>(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await fetch("/api/contac", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, message }),
			});

			if (response.ok) {
				setSubmitted(true);
				setName("");
				setEmail("");
				setMessage("");
			} else {
				alert("Error: Message could not be sent.");
			}
		} catch {
			alert("An error occurred. Please try again.");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-r from-pink-50 via-purple-50 to-pink-100 text-gray-800">
			<header className="py-6">
				<div className="container mx-auto flex justify-between items-center">
					<Link href="/" className="text-3xl font-extrabold text-pink-600">
						<img src="stuimpactt.png" alt="StuImpact Logo" className="h-12"/>
					</Link>
					<nav className="hidden md:flex space-x-6">
						<Link
							href="/"
							className="text-sm hover:text-purple-600 transition-colors"
						>
							Our Mission
						</Link>
						<Link
							href="#services"
							className="text-sm hover:text-purple-600 transition-colors"
						>
							What We Do
						</Link>
						<Link
							href="/nonprofits"
							className="text-sm hover:text-purple-600 transition-colors"
						>
							Nonprofits
						</Link>
						<Link
							href="/team"
							className="text-sm hover:text-purple-600 transition-colors"
						>
							Our Team
						</Link>
						<Link
							href="/contact"
							className="text-sm hover:text-purple-600 transition-colors"
						>
							Contact
						</Link>
					</nav>
				</div>

			</header>

			<main className="container mx-auto px-8 py-16">
				<h1 className="text-5xl font-extrabold text-center text-purple-700 mb-6">
					Checkpoint for Opportunity Submission
				</h1>
				<p className="text-center text-lg text-gray-600 mb-12">
					This form is more than just a contact page—it's your gateway to internships, partnerships, or any
					special inquiries. Make your voice heard!
				</p>

				<form
					onSubmit={handleSubmit}
					className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-xl"
				>
					<div className="mb-8">
						<label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
							Your Name
						</label>
						<Input
							type="text"
							id="name"
							value={name}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
							placeholder="Enter your full name"
							required
						/>
					</div>
					<div className="mb-8">
						<label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
							Your Email
						</label>
						<Input
							type="email"
							id="email"
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
							placeholder="Enter your email address"
							required
						/>
					</div>
					<div className="mb-8">
						<label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
							Message or Request
						</label>
						<Textarea
							id="message"
							value={message}
							onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
							placeholder="Describe your request or message here..."
							rows={6}
							required
						/>
					</div>

					<Button type="submit">
						{submitted ? "Message Sent!" : "Send Your Message"}
					</Button>
				</form>
			</main>

			<footer className="text-center py-10">
				<div className="text-gray-600 space-y-4">
					<p className="flex justify-center items-center space-x-2">
						<Mail className="w-5 h-5 text-pink-600" />
						<span>inquiries@stuimpact.works</span>
					</p>
					<p className="flex justify-center items-center space-x-2">
						<Phone className="w-5 h-5 text-purple-600" />
						<span>+1-425-394-2112</span>
					</p>
				</div>
				<p className="mt-4 text-sm text-gray-500">© 2023 StuImpact | A 501(c)3 Nonprofit</p>
			</footer>
		</div>
	);
}
