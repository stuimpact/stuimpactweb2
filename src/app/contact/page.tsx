'use client'

import { useState, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Send } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	className?: string
}

const Button = ({ children, className = '', ...props }: ButtonProps) => (
	<button
		className={`px-6 py-3 rounded-full font-medium text-sm transition-all ${className}`}
		{...props}
	>
		{children}
	</button>
)

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string
}

const Input = ({ className = '', ...props }: InputProps) => (
	<input
		className={`w-full px-4 py-3 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg ${className}`}
		{...props}
	/>
)

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	className?: string
}

const Textarea = ({ className = '', ...props }: TextareaProps) => (
	<textarea
		className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg ${className}`}
		{...props}
	/>
)

const GlowingOrb = ({ className }: { className?: string }) => (
	<div className={`absolute rounded-full bg-purple-300 opacity-70 blur-xl animate-pulse ${className}`} />
)

const GlowingLine = ({ className }: { className?: string }) => (
	<div className={`absolute bg-gradient-to-r from-pink-300 to-purple-300 opacity-30 blur-md ${className}`} />
)

export default function ContactPage() {
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [menuOpen, setMenuOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)

	const toggleMenu = () => setMenuOpen(!menuOpen)

	const handleScroll = () => {
		setScrolled(window.scrollY > 50)
	}

	useState(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			const response = await fetch('/api/contac', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, email, message }),
			})

			if (response.ok) {
				alert('Message sent successfully!')
				setName('')
				setEmail('')
				setMessage('')
			} else {
				const errorData = await response.json()
				alert(`Error: ${errorData.message}`)
			}
		} catch (error) {
			alert(`Error: ${error}`)
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 text-gray-800 overflow-x-hidden">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<GlowingOrb className="w-72 h-72 top-1/4 left-1/4" />
				<GlowingOrb className="w-96 h-96 bottom-1/4 right-1/4" />
				<GlowingLine className="w-full h-1 top-1/3 -rotate-12" />
				<GlowingLine className="w-full h-1 bottom-1/3 rotate-12" />
			</div>

			<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<Link href="/" className="text-2xl font-bold text-purple-600 z-10">
						<Image src="/stuimpactt.png" alt="StuImpact Logo" width={120} height={40} />
					</Link>
					<nav className="hidden md:flex space-x-6 z-10">
						{["Home", "Nonprofits", "Contact"].map((item) => (
							<Link key={item} href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="text-sm hover:text-purple-600 transition-colors">
								{item}
							</Link>
						))}
					</nav>
					<div className="flex items-center space-x-4 z-10">
						<Link href="/opportunities">
							<Button className="bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
								Find Opportunities
							</Button>
						</Link>
						<button onClick={toggleMenu} className="md:hidden text-gray-600 hover:text-purple-600 transition-colors">
							{menuOpen ? <X /> : <Menu />}
						</button>
					</div>
				</div>
			</header>

			{menuOpen && (
				<div className="fixed inset-0 bg-white z-40 md:hidden">
					<div className="container mx-auto px-4 py-8">
						<button onClick={toggleMenu} className="absolute top-4 right-4 text-gray-600 hover:text-purple-600 transition-colors">
							<X />
						</button>
						<nav className="flex flex-col space-y-6">
							<Link href="/" className="text-lg hover:text-purple-600 transition-colors" onClick={toggleMenu}>Home</Link>
							<Link href="/nonprofits" className="text-lg hover:text-purple-600 transition-colors" onClick={toggleMenu}>Nonprofits</Link>
							<Link href="/contact" className="text-lg hover:text-purple-600 transition-colors" onClick={toggleMenu}>Contact</Link>
							<Link href="/opportunities" onClick={toggleMenu}>
								<Button className="w-full bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg">Find Opportunities</Button>
							</Link>
						</nav>
					</div>
				</div>
			)}

			<main className="container mx-auto px-4 py-24 relative z-10">
				<div className="text-center mb-12">
					<h2 className="text-4xl md:text-5xl font-bold mb-4 text-purple-800">Contact Us</h2>
					<p className="text-xl mb-4 text-purple-600">Contact For Any Query</p>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						The Contact Form can be used for internship messages, partnership requests, and general messages on StuImpact. Thank you!
					</p>
				</div>
				<form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-xl">
					<div className="mb-6">
						<label className="block font-medium mb-2 text-md text-purple-700" htmlFor="name">
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
						<label className="block text-md font-medium mb-2 text-purple-700" htmlFor="email">
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
						<label className="block text-md font-medium mb-2 text-purple-700" htmlFor="message">
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
					<Button type="submit" className="w-full bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center">
						<Send className="mr-2 h-5 w-5" />
						Send Message
					</Button>
				</form>
			</main>

			<footer className="bg-purple-900 text-white py-10 relative z-10">
				<div className="container mx-auto px-4 text-center">
					<p className="mb-2">&copy; 2023 StuImpact. All Rights Reserved.</p>
					<p className="text-sm text-purple-300">501(C)3 Non-profit (EIN:61-2122338)</p>
				</div>
			</footer>
		</div>
	)
}
