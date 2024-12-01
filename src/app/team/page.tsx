"use client"

import { useState, useEffect } from "react";
import { Mail, Linkedin, Twitter, Menu, X } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";

const GlowingOrb = ({ className }: { className?: string }) => (
    <div className={`absolute rounded-full bg-gradient-to-r from-purple-300 to-pink-300 opacity-30 blur-2xl ${className}`} />
);

const GlowingStick = ({ className }: { className?: string }) => (
    <div className={`absolute bg-gradient-to-b from-purple-400 to-pink-400 opacity-20 blur-md ${className}`} />
);

const GlowingLine = ({ className }: { className?: string }) => (
    <div className={`absolute bg-gradient-to-r from-pink-300 to-purple-300 opacity-30 blur-md ${className}`} />
);

const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        className={`px-4 py-2 rounded-md font-medium transition-colors ${className}`}
        {...props}
    >
        {children}
    </button>
);

const Card = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
        {...props}
    >
        {children}
    </div>
);

const teamMembers = [
    {
        name: "Mitu",
        role: "President",
        image: "/prezie.PNG?height=400&width=400",
        bio: "Tells em what to do 😎",
        linkedin: "https://linkedin.com/in/atharv",
        twitter: "https://twitter.com/atharv"
    },
    {
        name: "Aasrith",
        role: "Marketing Lead",
        image: "/Aasrith.PNG?height=400&width=400",
        bio: "Aasrith leads our outreach efforts and manages communication channels, ensuring StuImpact's message reaches far and wide.",
        linkedin: "https://linkedin.com/in/aasrith",
        twitter: "https://twitter.com/aasrith"
    },
    {
        name: "Tanush",
        role: "Vice President",
        image: "/tanush.PNG?height=400&width=400",
        bio: "Tanush oversees the recruitment and training of Student Impact Ambassadors, fostering the next generation of leaders.",
        linkedin: "https://linkedin.com/in/tanush",
        twitter: "https://twitter.com/tanush"
    },
    {
        name: "Sai",
        role: "Vice President",
        image: "/sai.jpeg?height=400&width=400",
        bio: "Sai facilitates club collaborations and provides ongoing mentorship to our network of student leaders.",
        linkedin: "https://linkedin.com/in/sai",
        twitter: "https://twitter.com/sai"
    },

];

export default function TeamPage() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    const toggleMenu = () => setMenuOpen(!menuOpen)

    const handleScroll = () => {
        setScrolled(window.scrollY > 50)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <GlowingOrb className="w-72 h-72 top-1/4 right-0" />
                <GlowingOrb className="w-72 h-72 bottom-0 left-1/4" />
                <GlowingOrb className="w-48 h-48 top-3/4 right-1/4" />
                <GlowingLine className="w-full h-1 top-1/3 -rotate-12" />
                <GlowingLine className="w-full h-1 bottom-1/3 rotate-12" />
            </div>

            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        <img
                            src="stuimpactt.png"
                            alt="StuImpact Logo"
                            className="h-10"
                        />
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

                    <button onClick={toggleMenu} className="md:hidden text-gray-600 hover:text-purple-600 transition-colors z-10">
                        {menuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </header>

            {menuOpen && (
                <div className="fixed inset-0 bg-white z-40 md:hidden">
                    <div className="container mx-auto px-4 py-8">
                        <button onClick={toggleMenu} className="absolute top-4 right-4 text-gray-600 hover:text-purple-600 transition-colors">
                            <X />
                        </button>
                        <nav className="flex flex-col space-y-6">
                            {[
                                { name: "Our Mission", href: "/" },
                                { name: "What We Do", href: "#services" },
                                { name: "Nonprofits", href: "/nonprofits" },
                                { name: "Our Team", href: "/team" },
                                { name: "Contact", href: "/contact" }
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-lg hover:text-purple-600 transition-colors"
                                    onClick={toggleMenu}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            <main className="pt-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-900">
                        Meet Our Board
                    </h1>
                    <p className="text-xl mb-12 max-w-3xl mx-auto text-center text-gray-600">
                        The passionate individuals behind StuImpact, working tirelessly to empower the next generation of leaders and change-makers.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                                <div className="p-6">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={400}
                                        height={400}
                                        className="rounded-full mx-auto mb-4"
                                    />
                                    <h2 className="text-2xl font-bold text-center mb-2">{member.name}</h2>
                                    <p className="text-center text-purple-600 font-semibold mb-4">{member.role}</p>
                                    <p className="text-gray-600 text-center mb-6">{member.bio}</p>
                                    <div className="flex justify-center space-x-4">
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s LinkedIn profile`}>
                                            <Linkedin className="w-6 h-6 text-gray-600 hover:text-purple-600" />
                                        </a>
                                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s Twitter profile`}>
                                            <Twitter className="w-6 h-6 text-gray-600 hover:text-purple-600" />
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">Join Our Team</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
                            Are you passionate about empowering youth and making a difference in your community? We're always looking for talented individuals to join our mission.
                        </p>
                        <Link href="/contact">
                            <button
                                className="px-8 py-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                Join Us!
                            </button>
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t border-gray-200 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <Image src="/stuimpactt.png" alt="StuImpact Logo" width={40} height={40} />
                            <span className="text-xl font-bold text-gray-900">StuImpact</span>
                        </div>
                        <nav className="flex space-x-8 mt-4 md:mt-0">
                            <Link href="/" className="text-gray-500 hover:text-gray-900">Home</Link>
                            <Link href="/nonprofits" className="text-gray-500 hover:text-gray-900">Nonprofits</Link>
                            <Link href="/team" className="text-gray-900 font-semibold">Our Team</Link>
                            <Link href="/contact" className="text-gray-500 hover:text-gray-900">Contact</Link>
                        </nav>
                    </div>
                    <div className="mt-8 flex justify-center space-x-6">
                        <a href="mailto:inquiries@stuimpact.works" className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Email</span>
                            <Mail className="h-6 w-6" />
                        </a>
                        <a href="https://linkedin.com/company/stuimpact" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">LinkedIn</span>
                            <Linkedin className="h-6 w-6" />
                        </a>
                        <a href="https://twitter.com/stuimpact" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Twitter</span>
                            <Twitter className="h-6 w-6" />
                        </a>
                    </div>
                    <p className="mt-8 text-center text-gray-500 text-sm">
                        &copy; 2023 StuImpact. All rights reserved. 501(C)3 Non-profit (EIN:61-2122338)
                    </p>
                </div>
            </footer>
        </div>
    );
}

