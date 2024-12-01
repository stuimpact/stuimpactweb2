"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Calendar, Mic, ChevronRight, ChevronLeft, Mail, Phone, MapPin, Target, Briefcase, Users, Award, Handshake } from "lucide-react";


const GlowingStick = ({ className }: { className?: string }) => (
	<div className={`absolute w-2 bg-gradient-to-b from-purple-400 to-pink-400 opacity-50 blur-sm animate-pulse ${className}`} />
);

const GlowingOrb = ({ className }: { className?: string }) => (
	<div className={`absolute rounded-full bg-purple-300 opacity-70 blur-xl animate-pulse ${className}`} />
);

const GlowingLine = ({ className }: { className?: string }) => (
	<div className={`absolute bg-gradient-to-r from-pink-300 to-purple-300 opacity-30 blur-md ${className}`} />
);

export default function Component() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);
	const toggleMenu = () => setMenuOpen(!menuOpen);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const slides = [
		{
			title: "Leadership: Upgraded.",
			content: "Why settle for just one club when we empower *all* of them? From Game Design Club to Chess Club, we’re here to make leaders who actually lead—and look good doing it.",
			image: "/dramaclub.jpg?height=300&width=800"
		},
		{
			title: "Volunteer Opportunities? We’ve Got Range.",
			content: "Whether it’s organizing charity drives or decorating for prom, we’re turning ‘mandatory hours’ into ‘memorable moments’ for every club, not just the usual suspects.",
			image: "/community.jpg?height=300&width=800"
		},
		{
			title: "Hour Tracking That Doesn’t Suck.",
			content: "No more scribbling on random papers or awkward Google Sheets. We’ve got a system so smooth even your club treasurer will approve.",
			image: "/volunteer.png?height=300&width=800"
		},
		{
			title: "Impact? We’re Making Waves.",
			content: "Big events. Bigger change. Whether you're baking cookies or hosting a blood drive, we’ll help you go from small fish to clubbing legends.",
			image: "/empowerment.jpg?height=300&width=800"
		}
	];


	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

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

			<main>
				<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-200 opacity-50"/>
					<GlowingOrb className="w-64 h-64 top-1/4 left-1/4"/>
					<GlowingOrb className="w-48 h-48 bottom-1/4 right-1/4"/>
					<GlowingLine className="w-full h-1 top-1/3 -rotate-12"/>
					<GlowingLine className="w-full h-1 bottom-1/3 rotate-12"/>
					<div className="container mx-auto px-4 text-center relative z-10">
						<h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-800">
							The Nonprofit Empowering Student Voice
						</h1>
						<p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
							Providing events and resources enabling student led change in local communities across
							Washington.
						</p>
						<Link href="/opportunities">
							<button
								className="px-8 py-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
								Explore Opportunities
							</button>
						</Link>
					</div>
				</section>
				<section id="about" className="py-20 relative overflow-hidden">
					<GlowingOrb className="w-64 h-64 bottom-0 right-0"/>
					<div className="container mx-auto px-4 relative z-10">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
							{[
								{number: "2", text: "Years of Experience"},
								{number: "23", text: "Team Members"},
								{number: "800+", text: "Students Reached"},
								{number: "2", text: "Nonprofit Partners"},
							].map((item, index) => (
								<div key={index}
									 className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-center">
									<h3 className="text-4xl font-bold text-purple-600">{item.number}</h3>
									<p className="text-gray-600">{item.text}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section id="our-mission" className="py-20 relative overflow-hidden">
					<GlowingOrb className="w-96 h-96 -top-48 -left-48"/>
					<div className="container mx-auto px-4 relative z-10">
						<h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Mission</h2>
						<div
							className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-xl">
							<Target className="w-16 h-16 text-purple-600 mx-auto mb-6"/>
							<p className="text-xl text-center max-w-4xl mx-auto text-gray-600">
								At StuImpact, our mission is to empower the next generation of leaders by fostering a
								culture of
								service, learning, and community engagement. We are dedicated to providing high school
								and
								middle school students with meaningful volunteering and internship opportunities that
								not only enrich their educational experience but also inspire a lifelong commitment to
								social
								responsibility. Through StuImpact, students discover their potential to make a positive
								impact on the world around them.
							</p>
						</div>
					</div>
					<GlowingOrb className="w-64 h-64 top-1/4 left-1/4"/>
					<GlowingOrb className="w-48 h-48 bottom-1/4 right-1/4"/>
					<GlowingLine className="w-full h-1 top-1/3 -rotate-12"/>
					<GlowingLine className="w-full h-1 bottom-1/3 rotate-12"/>
					<GlowingLine className="w-full h-1 top-1/3 rotate-12"/>
					<GlowingLine className="w-full h-1 left-1/3 rotate-12"/>

				</section>
				<section id="club-project" className="py-20 relative overflow-hidden">
					<GlowingOrb className="w-64 h-64 top-1/4 right-1/4"/>
					<GlowingStick className="h-32 bottom-1/4 left-1/3 -rotate-45"/>
					<div className="container mx-auto px-4 relative z-10">
						<h2 className="text-5xl font-bold mb-12 text-center text-gray-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
               Why follow Key Club when you can lead with StuImpact? No contest.
              </span>
						</h2>
						<div
							className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-xl mb-12">
							<p className="text-xl text-center mb-8 text-gray-600">
								Our club project is revolutionizing the way student clubs operate and make an impact.
								We're partnering with clubs, to create a network of Student Impact
								Ambassadors who will have access to our exclusive ambassador portal. This portal
								provides resources, event planning assistance, and a system to track and provide hours
								for members through member meetings, and stuimpact-based events.
							</p>
							<div className="grid md:grid-cols-2 gap-8">
								<div>
									<h3 className="text-2xl font-bold mb-4 text-purple-600">What We Offer Clubs</h3>
									<ul className="list-disc list-inside text-gray-600 space-y-2">
										<li>Access to our ambassador portal with exclusive resources</li>
										<li>Event planning assistance and co-branding opportunities</li>
										<li>Volunteer hour tracking and verification system</li>
										<li>Expanded network of volunteer opportunities</li>
										<li>Leadership development for club ambassadors</li>
									</ul>
								</div>
								<div>
									<h3 className="text-2xl font-bold mb-4 text-purple-600">Benefits for Students</h3>
									<ul className="list-disc list-inside text-gray-600 space-y-2">
										<li>More diverse and impactful volunteer opportunities</li>
										<li>Simplified hour tracking and verification process</li>
										<li>Enhanced leadership and organizational skills</li>
										<li>Stronger connection to local and global causes</li>
										<li>Increased visibility for college applications and scholarships</li>
									</ul>
								</div>
							</div>
							<div className="mt-8 text-center">
								<Link href="/contact">
									<button
										className="px-8 py-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
										Check it out!
									</button>
								</Link>
							</div>
						</div>
						<div className="relative">
							<div className="overflow-hidden rounded-2xl shadow-xl">
								<div className="flex transition-transform ease-in-out duration-500"
									 style={{transform: `translateX(-${currentSlide * 100}%)`}}>
									{slides.map((slide, index) => (
										<div key={index} className="w-full flex-shrink-0">
											<div className="bg-white p-8">
												<Image src={slide.image} alt={slide.title} width={400} height={300}
													   className="mx-auto mb-4 rounded-lg"/>
												<h3 className="text-2xl font-bold mb-2 text-purple-600">{slide.title}</h3>
												<p className="text-gray-600">{slide.content}</p>
											</div>
										</div>
									))}
								</div>
							</div>
							<button onClick={prevSlide}
									className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
								<ChevronLeft className="w-6 h-6 text-purple-600"/>
							</button>
							<button onClick={nextSlide}
									className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
								<ChevronRight className="w-6 h-6 text-purple-600"/>
							</button>
						</div>
					</div>
				</section>

				<section id="services" className="py-20 relative overflow-hidden">
					<GlowingLine className="w-1 h-full top-0 left-1/4"/>
					<GlowingLine className="w-1 h-full top-0 right-1/4"/>
					<GlowingStick className="h-48 bottom-1/4 left-1/3 rotate-45"/>
					<div className="container mx-auto px-4 relative z-10">
						<h2 className="text-4xl font-bold mb-12 text-center text-gray-800">What We Are Doing</h2>
						<div className="grid md:grid-cols-3 gap-8">
							{[
								{
									icon: Briefcase,
									title: "Mentor Guided Mentorships",
									description: "Connect students with professionals in STEM fields and more to foster interest and provide guidance."
								},
								{
									icon: Users,
									title: "Nonprofit Internships",
									description: "Offer students internships focused on enhancing soft skills. Apply through our contact form."
								},
								{
									icon: Award,
									title: "Sponsoring Events/Hackathons",
									description: "Amplify reach through targeted marketing, inspiring the next generation of leaders."
								},
								{
									icon: Handshake,
									title: "Nonprofit Partnerships",
									description: "Build partnerships with Washington State nonprofits to create lasting community impact."
								},
								{
									icon: Briefcase,
									title: "School Club Connections",
									description: "Connect with school clubs to expand our reach and provide volunteer opportunities."
								},
								{
									icon: Award,
									title: "Student Impact Ambassadors",
									description: "Each partnered club has an ambassador to expand our reach and facilitate events."
								},
								{
									icon: Handshake,
									title: "Volunteer Hour Tracking",
									description: "Provide a system for tracking and verifying volunteer hours for all clubs."
								},
								{
									icon: Handshake,
									title: "Semester Opportunity List",
									description: "Send out a curated list of 250+ opportunities to schools each semester."
								},
								{
									icon: Users,
									title: " Annual Youth Community Forum",
									description: "an annual forum where students, educators, and community leaders come together to discuss social issues, brainstorm initiatives, and plan community service projects.\n"
								}
							].map((item, index) => (
								<div key={index}
									 className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
									<item.icon className="w-12 h-12 text-purple-600 mb-4"/>
									<h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
									<p className="text-gray-600">{item.description}</p>
								</div>
							))}
						</div>
					</div>
					<GlowingStick className="h-48 top-1/4 left-1/3 rotate-45"/>
					<GlowingStick className="h-48 top-1/4 right-1/3 rotate-900"/>

				</section>


				<section id="school-connections" className="py-20 relative overflow-hidden">
					<GlowingOrb className="w-64 h-64 bottom-1/4 left-1/4"/>
					<GlowingStick className="h-48 top-1/4 right-1/3 rotate-12"/>
					<div className="container mx-auto px-4 relative z-10">
						<h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Making Schools Our Partners
							in Crime (The Good Kind)</h2>
						<div
							className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-xl">
							<p className="text-xl text-center mb-8 text-gray-600">
								We’re not just here to help students—oh no, we’re teaming up with school admins and
								counselors to revolutionize opportunity access.
								With over 250 curated ways for students to shine each semester, we’re turning
								*potential* into *unstoppable*.
							</p>
							<div className="grid md:grid-cols-2 gap-8">
								<div>
									<h3 className="text-2xl font-bold mb-4 text-purple-600">Why Schools Love Us</h3>
									<ul className="list-disc list-inside text-gray-600 space-y-2">
										<li>250+ handpicked opportunities every semester—no dumpster diving required.
										</li>
										<li>Real, human support for admins and counselors (yes, we answer emails!).</li>
										<li>Volunteer tracking that won’t make you cry into your spreadsheets.</li>
										<li>Co-branded events that make your school shine brighter than your rival's
											football team.
										</li>
										<li>Leadership programs that actually develop leaders, not just club presidents
											on paper.
										</li>
									</ul>
								</div>
								<div>
									<h3 className="text-2xl font-bold mb-4 text-purple-600">Why Students Win Big</h3>
									<ul className="list-disc list-inside text-gray-600 space-y-2">
										<li>Opportunities that aren’t boring or irrelevant—yes, they exist.</li>
										<li>Less time hunting for programs, more time actually doing cool stuff.</li>
										<li>Tools and support that make personal growth look effortless (but we know the
											grind).
										</li>
										<li>Bridging academics with real-world experiences, because theory is
											overrated.
										</li>
										<li>Boosted college and career readiness—your future self will thank us.</li>
									</ul>
								</div>
							</div>
							<div className="mt-8 text-center">
								<Link href="/contact">
									<button
										className="px-8 py-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
										Let’s Team Up
									</button>
								</Link>
							</div>
						</div>
					</div>
				</section>
				<section id="annual-forum" className="py-20 relative overflow-hidden">
					<GlowingOrb className="w-64 h-64 top-1/4 right-1/4"/>
					<GlowingStick className="h-48 bottom-1/4 left-1/3 rotate-12"/>
					<div className="container mx-auto px-4 relative z-10">
						<h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Annual Youth Community
							Forum</h2>
						<div
							className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-xl">
							<p className="text-xl text-center mb-8 text-gray-600">
								Join us for our annual forum where students, educators, and community leaders come
								together to discuss social issues, brainstorm initiatives, and plan community service
								projects.
							</p>
							<div
								className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-xl">
								<p className="text-xl text-center mb-8 text-gray-600">
									Welcome to the annual **Student Leadership Forum**, where students, educators, and
									community leaders get together to do more than just talk.
									This is where real ideas take shape, action plans are born, and everyone leaves
									feeling a little more inspired—and a lot more motivated.
								</p>
								<div className="grid md:grid-cols-2 gap-8 mb-8">
									<div>
										<h3 className="text-2xl font-bold mb-4 text-purple-600">What the Event
											Offers</h3>
										<ul className="list-disc list-inside text-gray-600 space-y-2">
											<li>Discussions on today’s most pressing social issues</li>
											<li>Brainstorming sessions to develop impactful initiatives</li>
											<li>Opportunities to collaborate on community service projects</li>
											<li>Networking with educators, leaders, and other students</li>
											<li>Inspiring guest speakers who walk the talk</li>
											<li>A chance to showcase your ideas and earn recognition</li>
										</ul>
									</div>
									<div>
										<h3 className="text-2xl font-bold mb-4 text-purple-600">Who Should Join and
											Why</h3>
										<ul className="list-disc list-inside text-gray-600 space-y-2">
											<li><strong>Students:</strong> Bring your ideas and passion to make a
												difference.
											</li>
											<li><strong>Parents/Admins:</strong> See firsthand how leadership skills
												develop in action.
											</li>
											<li><strong>Educators:</strong> Engage with students as they tackle
												real-world challenges.
											</li>
											<li>Everyone leaves with actionable plans—and probably a few new friends.
											</li>
										</ul>
									</div>
								</div>

							</div>

							<div className="bg-purple-100 p-6 rounded-xl mb-8">
								<h3 className="text-2xl font-bold mb-4 text-purple-600">Next Forum</h3>
								<p className="text-gray-700">Our next Annual Youth Community Forum will take place
									between June and August 2025. Exact dates and details will be announced soon. Stay
									tuned for more information!</p>
							</div>
							<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
								{[
									{
										icon: Calendar,
										title: "Event Planning - Current",
										description: "Overseeing logistics and manage partnerships"
									},
									{
										icon: Users,
										title: "Promotion - Soon",
										description: "Designing visuals and managing social media"
									},
									{
										icon: Mic,
										title: "Communication - Soon",
										description: "Handling outreach to students and schools"
									},
									{
										icon: Award,
										title: "Technology - Soon",
										description: "Building registration and event day platforms"
									},
								].map((item, index) => (
									<div key={index} className="bg-white p-6 rounded-xl shadow-md">
										<item.icon className="w-12 h-12 text-purple-600 mb-4"/>
										<h4 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h4>
										<p className="text-gray-600">{item.description}</p>
									</div>
								))}
							</div>
							<div className="mt-12 text-center">
								<Link href="/contact">
									<button
										className="px-8 py-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
										Get Involved
									</button>
								</Link>
							</div>
						</div>
					</div>
				</section>


				<section id="projects" className="py-20 relative overflow-hidden">
					<GlowingLine className="w-full h-1 top-1/2 -rotate-6"/>
					<div className="container mx-auto px-4 relative z-10">
						<h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Our Projects</h2>
						<div className="grid md:grid-cols-3 gap-8">
							{[
								{
									title: "UniSOP",
									description: "Voice for overseas education",
									url: "https://unisop.in/"
								},
								{
									title: "Mentorships",
									description: "Connecting professionals and students",
									url: "https://jasper-rail-901.notion.site/StuImpact-Mentorships-Info-Signup-bf5f2f241a84432b8fecf0a9f5e2efbd"
								},
								{
									title: "WaForge",
									description: "Hackathon sponsorship",
									url: "https://www.waforge.org/"
								},
								{
									title: "Upcoming Events",
									description: "Community events calendar",
									url: "https://jasper-rail-901.notion.site/Upoming-StuImpact-Events-001c76a084f34c1684f625615a8915be"
								},
								{
									title: "Internships",
									description: "Opportunities across Washington State",
									url: "https://jasper-rail-901.notion.site/StuImpact-Student-Opportunities-list-8d398c5d995b4ef6b140b512c92d8b3d"
								},
								{
									title: "Education",
									description: "Nonprofit opportunities in education",
									url: "https://jasper-rail-901.notion.site/Stuimpact-Launches-Initiative-to-Support-Nonprofits-in-Educating-Young-Individuals-a2681718d75442cabbc3f43571a0b83f"
								},
							].map((project, index) => (
								<a key={index} href={project.url} target="_blank" rel="noopener noreferrer"
								   className="block group">
									<div
										className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all transform group-hover:-translate-y-1">
										<h3 className="text-2xl font-bold mb-2 text-purple-600 group-hover:text-purple-700">{project.title}</h3>
										<p className="mb-4 text-gray-600">{project.description}</p>
										<span
											className="text-purple-600 group-hover:text-purple-700 transition-colors inline-flex items-center text-lg">
											Learn more <ChevronRight className="ml-1 w-4 h-4"/>
										</span>
									</div>
								</a>
							))}
						</div>
					</div>
				</section>
			</main>


			<footer className="bg-white py-10 relative overflow-hidden">
				<GlowingOrb className="w-48 h-48 bottom-0 left-0"/>
				<div className="container mx-auto px-4 text-center relative z-10">
					<div
						className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
						<a href="mailto:inquiries@stuimpact.works"
						   className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
							<Mail className="w-5 h-5 mr-2"/>
							inquiries@stuimpact.works
						</a>
						<a href="tel:+14253942112"
						   className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
							<Phone className="w-5 h-5 mr-2"/>
							+1-425-394-2112
						</a>
						<span className="flex items-center text-gray-600">
							<MapPin className="w-5 h-5 mr-2"/>
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
