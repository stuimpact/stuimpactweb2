"use client";
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronRight, Mail, Phone, MapPin, Target, Briefcase, Users, Award, Handshake } from 'lucide-react'

const Button = ({ children, className, ...props }) => (
    <button
        className={`px-6 py-3 rounded-full font-medium text-sm transition-all ${className}`}
        {...props}
    >
        {children}
    </button>
)

const Input = ({ className, ...props }) => (
    <input
        className={`px-4 py-2 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
    />
)

export default function Component() {
    const [email, setEmail] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => setMenuOpen(!menuOpen)

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
                        <img src="/placeholder.svg?height=40&width=120" alt="StuImpact Logo" className="h-10" />
                    </Link>
                    <nav className="hidden md:flex space-x-6">
                        <Link href="#mission" className="text-sm hover:text-blue-600 transition-colors">Our Mission</Link>
                        <Link href="#services" className="text-sm hover:text-blue-600 transition-colors">What We Do</Link>
                        <Link href="/nonprofits" className="text-sm hover:text-blue-600 transition-colors">Nonprofits</Link>
                        <Link href="/contact" className="text-sm hover:text-blue-600 transition-colors">Contact</Link>
                    </nav>
                    <button onClick={toggleMenu} className="md:hidden text-gray-600 hover:text-blue-600 transition-colors">
                        {menuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </header>

            {menuOpen && (
                <div className="fixed inset-0 bg-white z-40 md:hidden">
                    <div className="container mx-auto px-4 py-8">
                        <button onClick={toggleMenu} className="absolute top-4 right-4 text-gray-600 hover:text-blue-600 transition-colors">
                            <X />
                        </button>
                        <nav className="flex flex-col space-y-6">
                            <Link href="#mission" className="text-lg hover:text-blue-600 transition-colors" onClick={toggleMenu}>Our Mission</Link>
                            <Link href="#services" className="text-lg hover:text-blue-600 transition-colors" onClick={toggleMenu}>What We Do</Link>
                            <Link href="/nonprofits" className="text-lg hover:text-blue-600 transition-colors" onClick={toggleMenu}>Nonprofits</Link>
                            <Link href="/contact" className="text-lg hover:text-blue-600 transition-colors" onClick={toggleMenu}>Contact</Link>

                        </nav>
                    </div>
                </div>
            )}

            <main>
                <section className="container mx-auto px-4 py-20 text-center relative">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Driving Student-Led Change to Shape Future Innovators</h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">High School Internship and Volunteer Opportunities Curated on a Single Platform</p>
                    <Link href="/opportunities">
                        <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                            Explore Opportunities
                        </Button>
                    </Link>
                </section>

                <section id="mission" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <Target className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                            <p className="text-lg text-center max-w-4xl mx-auto">
                                At StuImpact, our mission is to empower the next generation of leaders by fostering a culture of service, learning, and community engagement. We are dedicated to providing high school and middle school students with meaningful volunteering and internship opportunities that not only enrich their educational experience but also inspire a lifelong commitment to social responsibility. Through StuImpact, students discover their potential to make a positive impact on the world around them.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="services" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">What We Are Doing</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                                <Briefcase className="w-12 h-12 text-blue-600 mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-blue-600">Mentor Guided Mentorships</h3>
                                <p>Connect students with professionals in science, technology, engineering, and mathematics (STEM) fields and more to foster interest, provide guidance, and inspire future careers in these disciplines.</p>
                            </div>
                            <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                                <Users className="w-12 h-12 text-pink-600 mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-pink-600">Nonprofit Internships</h3>
                                <p>Offer middle and high school students internships focused on enhancing soft skills, such as communication, teamwork, and time management. StuImpact personally hires interns, to apply utilize the contact form.</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                                <Award className="w-12 h-12 text-green-600 mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-green-600">Sponsoring Events/Hackathons</h3>
                                <p>StuImpact sponsors events and hackathons by amplifying their reach through targeted marketing, aligned with our mission to empower students. We co-brand and promote these events to inspire the next generation of leaders and drive meaningful engagement from our student community.</p>
                            </div>
                            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                                <Handshake className="w-12 h-12 text-yellow-600 mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-yellow-600">Nonprofit Partnerships</h3>
                                <p>StuImpact builds partnerships with Washington State nonprofits that share our mission, amplifying our efforts to empower students and create lasting community impact.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="projects" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">Our Projects</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: "UniSOP", description: "Voice for overseas education", color: "blue" },
                                { title: "Mentorships", description: "Connecting professionals and students", color: "pink" },
                                { title: "WaForge", description: "Hackathon sponsorship", color: "green" },
                                { title: "Upcoming Events", description: "Community events calendar", color: "yellow" },
                                { title: "Internships", description: "Opportunities across Washington State", color: "purple" },
                                { title: "Education", description: "Nonprofit opportunities in education", color: "indigo" }
                            ].map((project, index) => (
                                <Link href={`/projects/${project.title.toLowerCase()}`} key={index} className="block group">
                                    <div className={`p-6 rounded-lg bg-${project.color}-50 shadow-md group-hover:shadow-xl transition-all transform group-hover:-translate-y-1`}>
                                        <h3 className={`text-xl font-bold mb-2 text-${project.color}-600 group-hover:text-${project.color}-700`}>{project.title}</h3>
                                        <p className="mb-4">{project.description}</p>
                                        <span className={`text-${project.color}-600 group-hover:text-${project.color}-700 transition-colors inline-flex items-center`}>
                      Learn more <ChevronRight className="ml-1 w-4 h-4" />
                    </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="contact" className="py-20 bg-gradient-to-br from-yellow-50 to-red-50">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-8">Stay Connected</h2>
                        <p className="mb-8 max-w-2xl mx-auto">Join our newsletter for the latest opportunities and updates!</p>
                        <form onSubmit={(e) => { e.preventDefault(); console.log('Submitted:', email); }} className="flex max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-grow mr-2"
                                required
                            />
                            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg">Subscribe</Button>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-100 py-10">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
                        <a href="mailto:stuimpactofficial@gmail.com" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                            <Mail className="w-5 h-5 mr-2" />
                            stuimpactofficial@gmail.com
                        </a>
                        <a href="tel:+14253942112" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                            <Phone className="w-5 h-5 mr-2" />
                            +1-425-394-2112
                        </a>
                        <span className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              2018 156th Ave NE Bellevue, WA 98007
            </span>
                    </div>
                    <p className="text-sm text-gray-600">© 2023 StuImpact. All Rights Reserved.</p>
                    <p className="text-sm text-gray-600 mt-2">501(C)3 Non-profit (EIN:61-2122338)</p>
                </div>
            </footer>
        </div>
    )
}