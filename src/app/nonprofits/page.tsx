"use client"
import Link from 'next/link';
import {Menu, User} from "lucide-react";

export default function Nonprofits() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Glowing balls background */}
                <div
                    className="absolute top-1/4 right-0 w-72 h-72 bg-gradient-to-bl from-pink-500 to-red-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
                <div
                    className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-tr from-green-500 to-teal-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
                <div
                    className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-tl from-yellow-500 to-orange-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
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

            <main className="container mx-auto px-4 py-20 relative z-10">
                <h2 className="text-3xl font-bold mb-8 text-center">Nonprofit Partnership</h2>
                <p className="text-lg mb-12 text-center">An outline on how partnerships work with StuImpact</p>

                <section className="mb-20">
                    <h3 className="text-2xl font-bold mb-4 text-center">What We Provide</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Co-Branding Opportunities",
                                description: "Joint branding on events and promotional materials to enhance visibility and credibility for both organizations.",
                                color: "bg-gradient-to-r from-blue-500 to-blue-800",
                            },
                            {
                                title: "Student Network Access",
                                description: "Connect with a network of motivated students for volunteering, internships, and other collaborative opportunities.",
                                color: "bg-gradient-to-r from-purple-500 to-purple-800",
                            },
                            {
                                title: "Social Media Collaboration",
                                description: "Collaborate on social media campaigns to boost awareness and engagement for both organizations.",
                                color: "bg-gradient-to-r from-green-500 to-green-800",
                            },
                            {
                                title: "Marketing Support",
                                description: "Amplify your nonprofit's reach through our established channels, including social media, newsletters, and community events.",
                                color: "bg-gradient-to-r from-orange-500 to-orange-800",
                            },
                            {
                                title: "Event Sponsorship",
                                description: "Support and sponsor events such as hackathons and workshops, increasing engagement and impact.",
                                color: "bg-gradient-to-r from-red-500 to-red-800",
                            },
                            {
                                title: "Teaching Platform Access",
                                description: "Provide access to our customizable teaching platform to support your educational initiatives and remote classes.",
                                color: "bg-gradient-to-r from-teal-500 to-teal-800",
                            },
                        ].map(({title, description, color}) => (
                            <div key={title} className={`${color} p-6 rounded-lg shadow-lg`}>
                                <h4 className="text-xl font-bold mb-2">{title}</h4>
                                <p>{description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-2xl font-bold mb-4 text-center">In Return</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Expertise Sharing",
                                description: "Offer valuable insights and knowledge in your field to enhance our educational resources and programs.",
                                color: "bg-gradient-to-r from-yellow-500 to-yellow-800",
                            },
                            {
                                title: "Curriculum Development",
                                description: "Contribute to or help shape curriculum and educational content that aligns with both organizations' missions.",
                                color: "bg-gradient-to-r from-indigo-500 to-indigo-800",
                            },
                            {
                                title: "Social Media Promotion",
                                description: "Promote StuImpact’s initiatives through your social media channels to increase visibility and engagement.",
                                color: "bg-gradient-to-r from-pink-500 to-pink-800",
                            },
                            {
                                title: "Professional Networking",
                                description: "Introduce us to your network of professionals and partners for potential collaborations and expanded opportunities.",
                                color: "bg-gradient-to-r from-lime-500 to-lime-800",
                            },
                            {
                                title: "Event Participation",
                                description: "Actively participate in co-branded events and workshops, contributing your expertise and resources to maximize impact.",
                                color: "bg-gradient-to-r from-cyan-500 to-cyan-800",
                            },
                            {
                                title: "Mentorship and Guidance",
                                description: "Provide mentorship and guidance to students and staff, sharing your experience to help them achieve their goals.",
                                color: "bg-gradient-to-r from-gray-500 to-gray-800",
                            },
                        ].map(({title, description, color}) => (
                            <div key={title} className={`${color} p-6 rounded-lg shadow-lg`}>
                                <h4 className="text-xl font-bold mb-2">{title}</h4>
                                <p>{description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
