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

export default function Nonprofits() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

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
                <h2 className="text-4xl font-bold mb-8 text-center">Nonprofit Partnership</h2>
                <p className="text-xl mb-12 text-center max-w-2xl mx-auto">An outline on how partnerships work with StuImpact</p>

                <section className="mb-20">
                    <h3 className="text-3xl font-bold mb-8 text-center">What We Provide</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Co-Branding Opportunities",
                                description: "Joint branding on events and promotional materials to enhance visibility and credibility for both organizations.",
                                color: "bg-blue-50 text-blue-800",
                            },
                            {
                                title: "Student Network Access",
                                description: "Connect with a network of motivated students for volunteering, internships, and other collaborative opportunities.",
                                color: "bg-purple-50 text-purple-800",
                            },
                            {
                                title: "Social Media Collaboration",
                                description: "Collaborate on social media campaigns to boost awareness and engagement for both organizations.",
                                color: "bg-green-50 text-green-800",
                            },
                            {
                                title: "Marketing Support",
                                description: "Amplify your nonprofit's reach through our established channels, including social media, newsletters, and community events.",
                                color: "bg-orange-50 text-orange-800",
                            },
                            {
                                title: "Event Sponsorship",
                                description: "Support and sponsor events such as hackathons and workshops, increasing engagement and impact.",
                                color: "bg-red-50 text-red-800",
                            },
                            {
                                title: "Teaching Platform Access",
                                description: "Provide access to our customizable teaching platform to support your educational initiatives and remote classes.",
                                color: "bg-teal-50 text-teal-800",
                            },
                        ].map(({title, description, color}) => (
                            <div key={title} className={`${color} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow`}>
                                <h4 className="text-xl font-bold mb-2">{title}</h4>
                                <p>{description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-3xl font-bold mb-8 text-center">In Return</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Expertise Sharing",
                                description: "Offer valuable insights and knowledge in your field to enhance our educational resources and programs.",
                                color: "bg-yellow-50 text-yellow-800",
                            },
                            {
                                title: "Curriculum Development",
                                description: "Contribute to or help shape curriculum and educational content that aligns with both organizations' missions.",
                                color: "bg-indigo-50 text-indigo-800",
                            },
                            {
                                title: "Social Media Promotion",
                                description: "Promote StuImpact's initiatives through your social media channels to increase visibility and engagement.",
                                color: "bg-pink-50 text-pink-800",
                            },
                            {
                                title: "Professional Networking",
                                description: "Introduce us to your network of professionals and partners for potential collaborations and expanded opportunities.",
                                color: "bg-lime-50 text-lime-800",
                            },
                            {
                                title: "Event Participation",
                                description: "Actively participate in co-branded events and workshops, contributing your expertise and resources to maximize impact.",
                                color: "bg-cyan-50 text-cyan-800",
                            },
                            {
                                title: "Mentorship and Guidance",
                                description: "Provide mentorship and guidance to students and staff, sharing your experience to help them achieve their goals.",
                                color: "bg-gray-50 text-gray-800",
                            },
                        ].map(({title, description, color}) => (
                            <div key={title} className={`${color} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow`}>
                                <h4 className="text-xl font-bold mb-2">{title}</h4>
                                <p>{description}</p>
                            </div>
                        ))}
                    </div>
                </section>
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
