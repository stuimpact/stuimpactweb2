"use client"
import { useState } from 'react'

import Link from 'next/link'
import { Menu, User, Briefcase, Users, Award, Handshake, Globe, Headphones, Code, Calendar, GraduationCap, School } from 'lucide-react'

const Button = ({ children, className, ...props }) => (
    <button
        className={`px-4 py-2 rounded font-bold text-white ${className} shadow-md hover:shadow-lg transition-shadow`}
        {...props}
    >
        {children}
    </button>
)

const Input = ({ className, ...props }) => (
    <input
        className={`px-3 py-2 border rounded bg-[#3B3B4C] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
    />
)


// Simple Avatar component
const Avatar = ({ src, alt, fallback }) => (
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
        {src ? (
            <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
            <span className="text-gray-600">{fallback}</span>
        )}
    </div>
)
const Card = ({ children, className, ...props }) => (
    <div className={`rounded-lg shadow-xl transition-transform transform hover:scale-105 ${className}`} {...props}>
        {children}
    </div>
)


export default function Component() {
    const [email, setEmail] = useState('')

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Background design elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,0 L100,0 L100,100 Q50,80 0,100 Z" fill="#3B82F6" opacity="0.1"/>
                        <path d="M0,0 Q50,20 100,0 L100,100 L0,100 Z" fill="#EC4899" opacity="0.1"/>
                    </svg>
                </div>
                <div
                    className="absolute top-1/4 right-0 w-72 h-72 bg-gradient-to-bl from-pink-500 to-red-500 rounded-full filter blur-3xl opacity-25 animate-pulse"></div>
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

            <main className="relative z-10">
                <section className="container mx-auto px-4 py-20 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">The Nonprofit Empowering Student Voice
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">Providing events and resources enabling student led change in local communities across Washington.</p>
                    <Button className="bg-blue-500 hover:bg-blue-600 transition-colors">The Good Kind Of Student Voice</Button>
                </section>

                <section id="about" className="container mx-auto px-4 py-20">
                    <h3 className="text-3xl font-bold mb-8 text-center">About Us</h3>
                    <p className="text-lg mb-12 text-center max-w-3xl mx-auto">
                        At StuImpact, our mission is to empower the next generation of leaders by fostering a culture of service, learning, and community engagement. We are dedicated to providing high school and middle school students with meaningful volunteering and internship opportunities that not only enrich their educational experience but also inspire a lifelong commitment to social responsibility. Through StuImpact, students discover their potential to make a positive impact on the world around them.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div
                            className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 rounded-lg transform hover:scale-105 transition-transform">
                            <h4 className="text-4xl font-bold">2</h4>
                            <p>Years Experience</p>
                        </div>
                        <div
                            className="bg-gradient-to-br from-pink-500 to-red-500 p-6 rounded-lg transform hover:scale-105 transition-transform">
                            <h4 className="text-4xl font-bold">23</h4>
                            <p>Team Members</p>
                        </div>
                        <div
                            className="bg-gradient-to-br from-green-500 to-teal-500 p-6 rounded-lg transform hover:scale-105 transition-transform">
                            <h4 className="text-4xl font-bold">200+</h4>
                            <p>Students Reached</p>
                        </div>
                        <div
                            className="bg-gradient-to-br from-yellow-500 to-orange-500 p-6 rounded-lg transform hover:scale-105 transition-transform">
                            <h4 className="text-4xl font-bold">2</h4>
                            <p>Nonprofit Partners</p>
                        </div>
                    </div>
                </section>

                <section id="services" className="container mx-auto px-4 py-20">
                    <h3 className="text-3xl font-bold mb-12 text-center">Our Services</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card
                            className="bg-gradient-to-br from-blue-900 to-purple-900 text-white hover:shadow-lg transition-all">
                            <div className="p-6">
                                <Briefcase className="h-12 w-12 mb-4 text-blue-400"/>
                                <h4 className="text-xl font-bold mb-2">Mentor Guided Mentorships</h4>
                                <p>Connect students with professionals in STEM fields and more to foster interest,
                                    provide guidance, and inspire future careers in these disciplines.</p>
                            </div>
                        </Card>
                        <Card
                            className="bg-gradient-to-br from-pink-900 to-red-900 text-white hover:shadow-lg transition-all">
                            <div className="p-6">
                                <Users className="h-12 w-12 mb-4 text-pink-400"/>
                                <h4 className="text-xl font-bold mb-2">Nonprofit Internships</h4>
                                <p>Offer middle and high school students internships focused on enhancing soft skills,
                                    such as communication, teamwork, and time management.</p>
                            </div>
                        </Card>
                        <Card
                            className="bg-gradient-to-br from-green-900 to-teal-900 text-white hover:shadow-lg transition-all">
                            <div className="p-6">
                                <Award className="h-12 w-12 mb-4 text-green-400"/>
                                <h4 className="text-xl font-bold mb-2">Sponsoring Events/Hackathons</h4>
                                <p>StuImpact sponsors events and hackathons by amplifying their reach through targeted
                                    marketing, aligned with our mission to empower students.</p>
                            </div>
                        </Card>
                        <Card
                            className="bg-gradient-to-br from-yellow-900 to-orange-900 text-white hover:shadow-lg transition-all">
                            <div className="p-6">
                                <Handshake className="h-12 w-12 mb-4 text-yellow-400"/>
                                <h4 className="text-xl font-bold mb-2">Nonprofit Partnerships</h4>
                                <p>StuImpact builds partnerships with Washington State nonprofits that share our
                                    mission, amplifying our efforts to empower students and create lasting community
                                    impact.</p>
                            </div>
                        </Card>
                    </div>
                </section>

                <section id="projects" className="container mx-auto px-4 py-20">
                    <h3 className="text-3xl font-bold mb-12 text-center">Our Projects</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Link href="https://univgarage.web.app/" className="block">
                            <Card
                                className="bg-gradient-to-br from-blue-800 to-purple-800 text-white hover:shadow-lg transition-all">
                                <div className="p-6">
                                    <Globe className="h-12 w-12 mb-4 text-blue-400"/>
                                    <h4 className="text-xl font-bold mb-2">UniSOP</h4>
                                    <p>A strong partnership, providing voice for overseas education.</p>
                                </div>
                            </Card>
                        </Link>
                        <Link href="https://jasper-rail-901.notion.site/StuImpact-Mentorships-Info-Signup-bf5f2f241a84432b8fecf0a9f5e2efbd" className="block">
                            <Card
                                className="bg-gradient-to-br from-pink-800 to-red-800 text-white hover:shadow-lg transition-all">
                                <div className="p-6">
                                    <Headphones className="h-12 w-12 mb-4 text-pink-400"/>
                                    <h4 className="text-xl font-bold mb-2">Mentorships</h4>
                                    <p>Connecting professionals and students</p>
                                </div>
                            </Card>
                        </Link>
                        <Link href="https://www.waforge.org/" className="block">
                            <Card
                                className="bg-gradient-to-br from-green-800 to-teal-800 text-white hover:shadow-lg transition-all">
                                <div className="p-6">
                                    <Code className="h-12 w-12 mb-4 text-green-400"/>
                                    <h4 className="text-xl font-bold mb-2">WaForge</h4>
                                    <p>A hackathon partner, sponsoring future events</p>
                                </div>
                            </Card>
                        </Link>
                        <Link href="https://jasper-rail-901.notion.site/Upcoming-StuImpact-Events-001c76a084f34c1684f625615a8915be" className="block">
                            <Card
                                className="bg-gradient-to-br from-yellow-800 to-orange-800 text-white hover:shadow-lg transition-all">
                                <div className="p-6">
                                    <Calendar className="h-12 w-12 mb-4 text-yellow-400"/>
                                    <h4 className="text-xl font-bold mb-2">Upcoming Events</h4>
                                    <p>Upcoming community events StuImpact is a part of</p>
                                </div>
                            </Card>
                        </Link>
                        <Link href="https://jasper-rail-901.notion.site/StuImpact-Student-Opportunities-list-8d398c5d995b4ef6b140b512c92d8b3d" className="block">
                            <Card
                                className="bg-gradient-to-br from-purple-800 to-indigo-800 text-white hover:shadow-lg transition-all">
                                <div className="p-6">
                                    <GraduationCap className="h-12 w-12 mb-4 text-purple-400"/>
                                    <h4 className="text-xl font-bold mb-2">Internships</h4>
                                    <p>Fostering a list of opportunities across Washington State</p>
                                </div>
                            </Card>
                        </Link>
                        <Link href="https://jasper-rail-901.notion.site/Stuimpact-Launches-Initiative-to-Support-Nonprofits-in-Educating-Young-Individuals-a2681718d75442cabbc3f43571a0b83f" className="block">
                            <Card
                                className="bg-gradient-to-br from-blue-800 to-cyan-800 text-white hover:shadow-lg transition-all">
                                <div className="p-6">
                                    <School className="h-12 w-12 mb-4 text-blue-400"/>
                                    <h4 className="text-xl font-bold mb-2">Education</h4>
                                    <p>Focused on fostering nonprofit opportunities in education.</p>
                                </div>
                            </Card>
                        </Link>
                    </div>
                </section>

                <section id="testimonials" className="container mx-auto px-4 py-20">
                    <h3 className="text-3xl font-bold mb-12 text-center">Testimonials</h3>
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <Card
                            className="bg-gradient-to-br from-blue-900 to-purple-900 text-white hover:shadow-lg transition-all">
                            <div className="p-6">
                                <Avatar fallback="JS"/>
                                <h4 className="text-xl font-bold mb-2 text-center">Jake Hutchinson</h4>
                                <p className="text-sm mb-4 text-center">11th Grade Student, WA</p>
                                <p className="text-center">"StuImpact opened doors to opportunities I never knew
                                    existed. It's been helpful in my future career prospects and what I want to do in college."</p>
                            </div>
                        </Card>
                        <Card
                            className="bg-gradient-to-br from-pink-900 to-red-900 text-white hover:shadow-lg transition-all">
                            <div className="p-6">
                                <Avatar fallback="EJ"/>
                                <h4 className="text-xl font-bold mb-2 text-center">Emily Johnson</h4>
                                <p className="text-sm mb-4 text-center">12th Grade Student, WA</p>
                                <p className="text-center">"Thanks to StuImpact, I found an internship that aligns
                                     with my career goals. The experience has been important."</p>
                            </div>
                        </Card>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card
                            className="bg-gradient-to-br from-green-900 to-teal-900 text-white hover:shadow-lg transition-all">
                            <div className="p-6 flex items-center">
                                <img src="https://unisop.in/static/media/unisoplogo.72dea753f1b88b85e893.png" alt="Nonprofit Partner 1"
                                     className="w-20 h-20 mr-6"/>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">UniSop</h4>
                                    <p>"StuImpact has been an incredible partner in our mission to empower youth. Their
                                        dedication to connecting students with meaningful opportunities is truly
                                        commendable."</p>
                                </div>
                            </div>
                        </Card>
                        <Card
                            className="bg-gradient-to-br from-yellow-900 to-orange-900 text-white hover:shadow-lg transition-all">
                            <div className="p-6 flex items-center">
                                <img src="https://www.waforge.org/assets/BiggerLogo-_4aaQ6I7.svg" alt="Nonprofit Partner 2"
                                     className="w-20 h-20 mr-6"/>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">WaForge</h4>
                                    <p>"Our partnership with StuImpact has significantly expanded our reach and impact.
                                        Together, we're inspiring the next generation of STEM leaders."</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>

                <section id="contact" className="container mx-auto px-4 py-20 text-center">
                    <h3 className="text-3xl font-bold mb-4">Always Stay In Touch</h3>
                    <p className="mb-6 max-w-2xl mx-auto">Empowering Tomorrow's Leaders: Stay Connected with StuImpact's
                        Latest News and Opportunities!</p>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        console.log('Submitted:', email);
                    }} className="flex max-w-md mx-auto">
                        <Input
                            type="email"
                            placeholder="Enter Your Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-grow mr-2 bg-white/10 border-white/20 text-white placeholder-white/50"
                        />
                        <Button type="submit"
                                className="bg-blue-500 hover:bg-blue-600 transition-colors">Subscribe</Button>
                    </form>
                </section>
            </main>

            <footer className="bg-[#2A2A3A] py-10 relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <p>2018 156th Ave NE Bellevue, Washington, 98007</p>
                    <p>+1-425-394-2112</p>
                    <p>stuimpactofficial@gmail.com</p>
                    <p className="mt-4">© StuImpact All Rights Reserved. Designed By: Mrithunjay26</p>
                    <p>501(C)3 Non-profit (EIN:61-2122338)</p>
                </div>
            </footer>
        </div>
    )
}