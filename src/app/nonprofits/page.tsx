'use client'

import { useState, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

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

const GlowingOrb = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full bg-purple-300 opacity-70 blur-xl animate-pulse ${className}`} />
)

const GlowingLine = ({ className }: { className?: string }) => (
  <div className={`absolute bg-gradient-to-r from-pink-300 to-purple-300 opacity-30 blur-md ${className}`} />
)

export default function Nonprofits() {
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
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-purple-800">Nonprofit Partnership</h2>
        <p className="text-xl mb-12 text-center max-w-2xl mx-auto text-gray-600">An outline on how partnerships work with StuImpact</p>

        <section className="mb-20">
          <h3 className="text-3xl font-bold mb-12 text-center text-purple-700">What We Provide</h3>
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
                color: "bg-pink-50 text-pink-800",
              },
              {
                title: "Event Sponsorship",
                description: "Support and sponsor events such as hackathons and workshops, increasing engagement and impact.",
                color: "bg-yellow-50 text-yellow-800",
              },
              {
                title: "Teaching Platform Access",
                description: "Provide access to our customizable teaching platform to support your educational initiatives and remote classes.",
                color: "bg-indigo-50 text-indigo-800",
              },
            ].map(({title, description, color}) => (
              <div key={title} className={`${color} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 backdrop-filter backdrop-blur-lg bg-opacity-80`}>
                <h4 className="text-2xl font-bold mb-4">{title}</h4>
                <p className="text-lg">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-3xl font-bold mb-12 text-center text-purple-700">In Return</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Expertise Sharing",
                description: "Offer valuable insights and knowledge in your field to enhance our educational resources and programs.",
                color: "bg-orange-50 text-orange-800",
              },
              {
                title: "Curriculum Development",
                description: "Contribute to or help shape curriculum and educational content that aligns with both organizations' missions.",
                color: "bg-teal-50 text-teal-800",
              },
              {
                title: "Social Media Promotion",
                description: "Promote StuImpact's initiatives through your social media channels to increase visibility and engagement.",
                color: "bg-red-50 text-red-800",
              },
              {
                title: "Professional Networking",
                description: "Introduce us to your network of professionals and partners for potential collaborations and expanded opportunities.",
                color: "bg-cyan-50 text-cyan-800",
              },
              {
                title: "Event Participation",
                description: "Actively participate in co-branded events and workshops, contributing your expertise and resources to maximize impact.",
                color: "bg-lime-50 text-lime-800",
              },
              {
                title: "Mentorship and Guidance",
                description: "Provide mentorship and guidance to students and staff, sharing your experience to help them achieve their goals.",
                color: "bg-gray-50 text-gray-800",
              },
            ].map(({title, description, color}) => (
              <div key={title} className={`${color} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 backdrop-filter backdrop-blur-lg bg-opacity-80`}>
                <h4 className="text-2xl font-bold mb-4">{title}</h4>
                <p className="text-lg">{description}</p>
              </div>
            ))}
          </div>
        </section>
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
