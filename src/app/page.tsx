"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight, Mail, Phone, MapPin, Target, Briefcase, Users, Award, Handshake } from "lucide-react";

const GlowingOrb = ({ className }: { className?: string }) => (
	<div className={`absolute rounded-full bg-purple-300 opacity-70 blur-xl animate-pulse ${className}`} />
);

const GlowingLine = ({ className }: { className?: string }) => (
	<div className={`absolute bg-gradient-to-r from-pink-300 to-purple-300 opacity-30 blur-md ${className}`} />
);

export default function Component() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const toggleMenu = () => setMenuOpen(!menuOpen);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
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
								{ name: "Contact", href: "/contact" },
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

			<main>
				<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-200 opacity-50" />
					<GlowingOrb className="w-64 h-64 top-1/4 left-1/4" />
					<GlowingOrb className="w-48 h-48 bottom-1/4 right-1/4" />
					<GlowingLine className="w-full h-1 top-1/3 -rotate-12" />
					<GlowingLine className="w-full h-1 bottom-1/3 rotate-12" />
					<div className="container mx-auto px-4 text-center relative z-10">
						<h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-800">
							The Nonprofit Empowering Student Voice
						</h1>
						<p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
							Providing events and resources enabling student led change in local communities across Washington.
						</p>
						<Link href="/opportunities">
							<button className="px-8 py-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
								Explore Opportunities
							</button>
						</Link>
					</div>
				</section>

				<section id="our-mission" className="py-20 relative overflow-hidden">
					<GlowingOrb className="w-96 h-96 -top-48 -left-48" />
					<div className="container mx-auto px-4 relative z-10">
						<h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Mission</h2>
						<div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-xl">
							<Target className="w-16 h-16 text-purple-600 mx-auto mb-6" />
							<p className="text-xl text-center max-w-4xl mx-auto text-gray-600">
								At StuImpact, our mission is to empower the next generation of leaders by fostering a culture of
								service, learning, and community engagement. We are dedicated to providing high school and
								middle school students with meaningful volunteering and internship opportunities that
								not only enrich their educational experience but also inspire a lifelong commitment to social
								responsibility. Through StuImpact, students discover their potential to make a positive
								impact on the world around them.
							</p>
						</div>
					</div>
				</section>

				<section id="what-we-do" className="py-20 relative overflow-hidden">
					<GlowingLine className="w-1 h-full top-0 left-1/4" />
					<GlowingLine className="w-1 h-full top-0 right-1/4" />
					<div className="container mx-auto px-4 relative z-10">
						<h2 className="text-4xl font-bold mb-12 text-center text-gray-800">What We Are Doing</h2>
						<div className="grid md:grid-cols-2 gap-8">
							{[
								{ icon: Briefcase, title: "Mentor Guided Mentorships", description: "Connect students with professionals in science, technology, engineering, and mathematics (STEM) fields and more to foster interest, provide guidance, and inspire future careers in these disciplines." },
								{ icon: Users, title: "Nonprofit Internships", description: "Offer middle and high school students internships focused on enhancing soft skills, such as communication, teamwork, and time management. StuImpact personally hires interns, to apply utilize the contact form." },
								{ icon: Award, title: "Sponsoring Events/Hackathons", description: "StuImpact sponsors events and hackathons by amplifying their reach through targeted marketing, aligned with our mission to empower students. We co-brand and promote these events to inspire the next generation of leaders and drive meaningful engagement from our student community." },
								{ icon: Handshake, title: "Nonprofit Partnerships", description: "StuImpact builds partnerships with Washington State nonprofits that share our mission, amplifying our efforts to empower students and create lasting community impact." },
							].map((item, index) => (
								<div key={index} className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
									<item.icon className="w-12 h-12 text-purple-600 mb-4" />
									<h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
									<p className="text-gray-600">{item.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section id="about" className="py-20 relative overflow-hidden">
					<GlowingOrb className="w-64 h-64 bottom-0 right-0" />
					<div className="container mx-auto px-4 relative z-10">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
							{[
								{ number: "2", text: "Years Experience" },
								{ number: "23", text: "Team Members" },
								{ number: "200+", text: "Students Reached" },
								{ number: "2", text: "Nonprofit Partners" },
							].map((item, index) => (
								<div key={index} className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-center">
									<h3 className="text-4xl font-bold text-purple-600">{item.number}</h3>
									<p className="text-gray-600">{item.text}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section id="projects" className="py-20 relative overflow-hidden">
					<GlowingLine className="w-full h-1 top-1/2 -rotate-6" />
					<div className="container mx-auto px-4 relative z-10">
						<h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Our Projects</h2>
						<div className="grid md:grid-cols-3 gap-8">
							{[
								{ title: "UniSOP", description: "Voice for overseas education", url: "https://unisop.in/" },
								{ title: "Mentorships", description: "Connecting professionals and students", url: "https://jasper-rail-901.notion.site/StuImpact-Mentorships-Info-Signup-bf5f2f241a84432b8fecf0a9f5e2efbd" },
								{ title: "WaForge", description: "Hackathon sponsorship", url: "https://www.waforge.org/" },
								{ title: "Upcoming Events", description: "Community events calendar", url: "https://jasper-rail-901.notion.site/Upoming-StuImpact-Events-001c76a084f34c1684f625615a8915be" },
								{ title: "Internships", description: "Opportunities across Washington State", url: "https://jasper-rail-901.notion.site/StuImpact-Student-Opportunities-list-8d398c5d995b4ef6b140b512c92d8b3d" },
								{ title: "Education", description: "Nonprofit opportunities in education", url: "https://jasper-rail-901.notion.site/Stuimpact-Launches-Initiative-to-Support-Nonprofits-in-Educating-Young-Individuals-a2681718d75442cabbc3f43571a0b83f" },
							].map((project, index) => (
								<a key={index} href={project.url} target="_blank" rel="noopener noreferrer" className="block group">
									<div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all transform group-hover:-translate-y-1">
										<h3 className="text-2xl font-bold mb-2 text-purple-600 group-hover:text-purple-700">{project.title}</h3>
										<p className="mb-4 text-gray-600">{project.description}</p>
										<span className="text-purple-600 group-hover:text-purple-700 transition-colors inline-flex items-center text-lg">
											Learn more <ChevronRight className="ml-1 w-4 h-4" />
										</span>
									</div>
								</a>
							))}
						</div>
					</div>
				</section>
			</main>


			<footer className="bg-white py-10 relative overflow-hidden">
				<GlowingOrb className="w-48 h-48 bottom-0 left-0" />
				<div className="container mx-auto px-4 text-center relative z-10">
					<div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
						<a href="mailto:inquiries@stuimpact.works" className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
							<Mail className="w-5 h-5 mr-2" />
							inquiries@stuimpact.works
						</a>
						<a href="tel:+14253942112" className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
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
	);
}
