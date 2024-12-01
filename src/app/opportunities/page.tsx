'use client'

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import { X, Search, Menu, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Job {
  _id: string
  title: string
  description: string
  url: string
  tags: string[]
  prestige?: string
  type?: string
}

const GlowingOrb = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full bg-purple-300 opacity-70 blur-xl animate-pulse ${className}`} />
)

const GlowingLine = ({ className }: { className?: string }) => (
  <div className={`absolute bg-gradient-to-r from-pink-300 to-purple-300 opacity-30 blur-md ${className}`} />
)

export default function OpportunityFinder() {
  const [location, setLocation] = useState<string>("Washington")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedGrades, setSelectedGrades] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState(false)

  const clearJobsIfNewSearch = () => {
    const prevSearchParams = localStorage.getItem("searchParams")
    const currentSearchParams = JSON.stringify({
      interest: selectedSubjects.join(" "),
      grade: selectedGrades.join(","),
      location,
    })

    if (prevSearchParams !== currentSearchParams) {
      setJobs([])
      setCurrentPage(1)
      setHasMore(true)
      localStorage.removeItem("jobs")
    }

    localStorage.setItem("searchParams", currentSearchParams)
  }

  const fetchJobs = async (page: number) => {
    setLoading(true)
    clearJobsIfNewSearch()

    try {
      const response = await axios.post("/api/searchjobs", {
        interest: selectedSubjects.join(" "),
        grade: selectedGrades.join(","),
        location,
        page,
      })

      const { opportunities } = response.data
      if (Array.isArray(opportunities)) {
        const uniqueJobs = new Map(
          [...jobs, ...opportunities].map((job) => [job._id, job])
        )

        setJobs(Array.from(uniqueJobs.values()))
        setHasMore(opportunities.length > 0)
        setCurrentPage(page)
        localStorage.setItem("jobs", JSON.stringify(Array.from(uniqueJobs.values())))
      } else {
        console.error(
          "Expected an array of opportunities but got:",
          opportunities
        )
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs")
    const storedSearchParams = localStorage.getItem("searchParams")
    if (storedJobs && storedSearchParams) {
      try {
        const parsedJobs = JSON.parse(storedJobs)
        if (Array.isArray(parsedJobs)) {
          setJobs(parsedJobs)
        } else {
          console.error("Invalid stored job data:", parsedJobs)
        }
      } catch (error) {
        console.error("Error parsing stored job data:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (jobs.length === 0) {
      fetchJobs(currentPage)
    }
  }, [jobs])

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 2
    ) {
      if (hasMore && !loading) {
        fetchJobs(currentPage + 1)
      }
    }
    setScrolled(window.scrollY > 50)
  }, [currentPage, hasMore, loading])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const showJobDetails = (job: Job) => {
    setSelectedJob(job)
  }

  const closeOverlay = () => {
    setSelectedJob(null)
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeOverlay()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown)
    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [])

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const toggleFilters = () => setFiltersOpen(!filtersOpen)

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden relative">
      <GlowingOrb className="w-64 h-64 top-1/4 left-1/4 -z-10" />
      <GlowingOrb className="w-48 h-48 bottom-1/4 right-1/4 -z-10" />
      <GlowingLine className="w-full h-1 top-1/3 -rotate-12 -z-10" />
      <GlowingLine className="w-full h-1 bottom-1/3 rotate-12 -z-10" />

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
      <main className="container mx-auto px-4 py-24 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-purple-800">
          Opportunity Finder
        </h1>

        <div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-2xl shadow-xl mb-8">
          <button
            className="w-full sm:w-auto bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg px-6 py-3 rounded-full transition-all flex items-center justify-center"
            onClick={() => fetchJobs(1)}
          >
            <Search className="mr-2 h-5 w-5" />
            <span className="text-lg">Search Opportunities</span>
          </button>
        </div>

        {loading && (
          <div className="text-center text-purple-600 text-lg">
            Loading opportunities...
          </div>
        )}

        <div className="flex flex-col md:flex-row">
          <aside className="w-full md:w-1/4 pr-0 md:pr-8 mb-8 md:mb-0">
            <div className="md:hidden mb-4">
              <button
                className="w-full px-4 py-2 bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors"
                onClick={toggleFilters}
              >
                {filtersOpen ? (
                  <span className="flex items-center justify-center">
                    Hide Filters <ChevronUp className="ml-2 h-4 w-4" />
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Show Filters <ChevronDown className="ml-2 h-4 w-4" />
                  </span>
                )}
              </button>
            </div>
            <div className={`md:block ${filtersOpen ? "block" : "hidden"}`}>
              <h2 className="text-lg font-semibold mb-4 text-purple-800">Refine by Subject</h2>
              <h2 className="text-lg font-semibold mb-4 text-purple-800">              (Select ONLY one for each: Subject and Grade)
              </h2>

              <div className="space-y-2">
                {[
                  "BIOLOGY",
                  "COMPUTER SCIENCE",
                  "ENVIRONMENTAL SCIENCE",
                  "ENGINEERING",
                  "MEDICAL",
                  "CHEMISTRY",
                  "ARTS PERFORMANCE",
                  "MATHEMATICS",
                  "ENGLISH LITERATURE WRITING",
                  "GENERAL",
                  "PUBLIC ADMINISTRATION",
                  "DATA SCIENCE",
                  "POLITICAL SCIENCE",
                  "LAW",
                  "PHYSICS",
                  "BUSINESS",
                  "PSYCHOLOGY",
                  "KINESIOLOGY",
                  "PHILOSOPHY",
                ].map((subject) => (
                    <div key={subject} className="flex items-center">
                      <input
                          type="checkbox"
                          id={subject}
                          className="mr-2 form-checkbox text-purple-600 rounded focus:ring-purple-500"
                          checked={selectedSubjects.includes(subject)}
                          onChange={() => {
                            setSelectedSubjects((prev) =>
                                prev.includes(subject)
                                    ? prev.filter((s) => s !== subject)
                                    : [...prev, subject]
                            )
                          }}
                      />
                      <label htmlFor={subject} className="text-sm text-gray-700">
                        {subject}
                      </label>
                    </div>
                ))}
              </div>

              <h2 className="text-lg font-semibold mt-6 mb-4 text-purple-800">Refine by Grade</h2>
              <div className="space-y-2">
                {["FRESHMEN", "SOPHOMORES", "JUNIORS", "SENIORS"].map((grade) => (
                    <div key={grade} className="flex items-center">
                      <input
                          type="checkbox"
                          id={grade}
                          className="mr-2 form-checkbox text-purple-600 rounded focus:ring-purple-500"
                          checked={selectedGrades.includes(grade)}
                          onChange={() => {
                            setSelectedGrades((prev) =>
                                prev.includes(grade)
                                    ? prev.filter((g) => g !== grade)
                                    : [...prev, grade]
                            )
                          }}
                      />
                      <label htmlFor={grade} className="text-sm text-gray-700">
                        {grade}
                      </label>
                    </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="w-full md:w-3/4">
            {jobs.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job, index) => {
                  const gradeLevels = job.tags?.filter(tag =>
                    ["FRESHMEN", "SOPHOMORES", "JUNIORS", "SENIORS"].includes(tag)
                  ) || []
                  const types = job.tags?.filter(tag =>
                    !["FRESHMEN", "SOPHOMORES", "JUNIORS", "SENIORS"].includes(tag)
                  ) || []
                  const paragraphs = job.description.split(/(?<=\.)\s+/)

                  return (
                    <div
                      key={index}
                      className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
                      onClick={() => showJobDetails(job)}
                    >
                      <h3 className="text-xl font-bold mb-2 text-purple-800">{job.title}</h3>
                      <p className="text-gray-600 text-sm mb-1">
                        <strong>Type:</strong> {types.length > 0 ? types.join(", ") : "N/A"}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        <strong>Grades:</strong> {gradeLevels.length > 0 ? gradeLevels.join(", ") : "N/A"}
                      </p>
                      <p className="text-gray-700 text-sm line-clamp-3">
                        {paragraphs[0]}
                      </p>
                    </div>
                  )
                })}
              </div>
            ) : (
              !loading && (
                <div className="text-center text-gray-600 text-lg">
                  No opportunities found. Try adjusting your filters.
                </div>
              )
            )}
          </section>
        </div>

        {selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 max-h-[80vh] p-8 rounded-2xl shadow-2xl overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-purple-800">{selectedJob.title}</h2>
                <button onClick={closeOverlay} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>

              </div>
              <Image
                src="/background.jpg"
                alt={selectedJob.title}
                width={800}
                height={400}
                className="w-full h-48 object-cover mb-6 rounded-lg"
              />

              {selectedJob.type && (
                <p className="text-gray-700 mb-2">
                  <strong>Type:</strong> {selectedJob.type}
                </p>
              )}
              {selectedJob.prestige && (
                <p className="text-gray-700 mb-4">
                  <strong>Prestige:</strong> {selectedJob.prestige}
                </p>
              )}

              <div className="my-6 text-gray-700">
                {selectedJob.description.split(/(?<=\.)\s+/).map((para, i) => (
                  <p key={i} className="mb-3">{para}</p>
                ))}
              </div>

              <div className="w-full p-4 flex justify-center">
                <a
                  href={selectedJob.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-purple-600 text-white text-center rounded-full hover:bg-purple-700 transition-all text-lg font-medium"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-purple-900 text-white py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="mb-2">&copy; 2024 StuImpact. All rights reserved.</p>
          <p className="text-sm text-purple-300">Empowering students to make a difference.</p>
        </div>
      </footer>
    </div>
  )
}
