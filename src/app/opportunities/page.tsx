"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { X, Search, Menu } from "lucide-react";
import Link from "next/link";

interface Job {
    _id: string; // Include _id to uniquely identify jobs
    title: string;
    description: string;
    url: string;
    image: string;
    type?: string;
    prestige?: string;
    gradeLevels?: string[];
    tags?: string[];
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${className}`}
    {...props}
  >
    {children}
  </button>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className = "", ...props }) => (
  <input
    className={`px-4 py-2 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

export default function OpportunityFinder() {
	const [location, setLocation] = useState<string>("Washington");
	const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
	const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [jobs, setJobs] = useState<Job[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [selectedJob, setSelectedJob] = useState<Job | null>(null);
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

	const clearJobsIfNewSearch = () => {
		const prevSearchParams = localStorage.getItem("searchParams");
		const currentSearchParams = JSON.stringify({
			interest: selectedSubjects.join(" "),
			grade: selectedGrades.join(","),
			location,
		});

		if (prevSearchParams !== currentSearchParams) {
			setJobs([]);
			setCurrentPage(1);
			setHasMore(true);
			localStorage.removeItem("jobs");
		}

		localStorage.setItem("searchParams", currentSearchParams);
	};

	const fetchJobs = async (page: number) => {
		setLoading(true);
		clearJobsIfNewSearch();

		try {
			const response = await axios.post("/api/searchjobs", {
				interest: selectedSubjects.join(" "),
				grade: selectedGrades.join(","),
				location: location,
				page: page,
			});

			const { opportunities } = response.data;
			if (opportunities && Array.isArray(opportunities)) {
				const uniqueJobs = new Map(
					[...jobs, ...opportunities].map((job) => [job._id, job])
				);

				setJobs(Array.from(uniqueJobs.values()));
				setHasMore(opportunities.length > 0);
				setCurrentPage(page);
				localStorage.setItem("jobs", JSON.stringify(Array.from(uniqueJobs.values())));
			} else {
				console.error(
					"Expected an array of opportunities but got:",
					opportunities
				);
			}
		} catch (error) {
			console.error("Error fetching jobs:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const storedJobs = localStorage.getItem("jobs");
		const storedSearchParams = localStorage.getItem("searchParams");
		if (storedJobs && storedSearchParams) {
			try {
				const parsedJobs = JSON.parse(storedJobs);
				if (Array.isArray(parsedJobs)) {
					setJobs(parsedJobs);
				} else {
					console.error("Invalid stored job data:", parsedJobs);
				}
			} catch (error) {
				console.error("Error parsing stored job data:", error);
			}
		}
	}, []);

	useEffect(() => {
		if (jobs.length === 0) {
			fetchJobs(currentPage);
		}
	}, [jobs]);

	const handleScroll = useCallback(() => {
		if (
			window.innerHeight + document.documentElement.scrollTop >=
			document.documentElement.offsetHeight - 2
		) {
			if (hasMore && !loading) {
				fetchJobs(currentPage + 1);
			}
		}
	}, [currentPage, hasMore, loading]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	const formatJobDescription = (description: string) => {
		return description
			.replace(/•\s*/g, "\n• ")
			.replace(/(?:\r\n|\r|\n){2,}/g, "\n\n")
			.split("\n")
			.map((line, index) => (
				<p
					key={index}
					className={line.startsWith("•") ? "list-item" : ""}
				>
					{line}
				</p>
			));
	};

	const showJobDetails = (job: Job) => {
		setSelectedJob(job);
	};

	const closeOverlay = () => {
		setSelectedJob(null);
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			closeOverlay();
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeydown);
		return () => {
			document.removeEventListener("keydown", handleKeydown);
		};
	}, []);

	const toggleMenu = () => setMenuOpen(!menuOpen);
	const toggleFilters = () => setFiltersOpen(!filtersOpen);
	return (
		<div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
			<header className="sticky top-0 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-sm z-50">
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
							className="text-sm hover:text-blue-600 transition-colors"
						>
							Home
						</Link>
						<Link
							href="/nonprofits"
							className="text-sm hover:text-blue-600 transition-colors"
						>
							Nonprofits
						</Link>
						<Link
							href="/contact"
							className="text-sm hover:text-blue-600 transition-colors"
						>
							Contact
						</Link>
					</nav>

					<div className="flex items-center space-x-4">
						<Link href="/opportunities">
							<Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
								Explore Opportunities
							</Button>
						</Link>
						<button
							onClick={toggleMenu}
							className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
						>
							<Menu />
						</button>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-4 py-8 relative z-10">
				<h1 className="text-4xl font-bold mb-8 text-center left-10 relative">
					Opportunity Finder
				</h1>

				<div className="bg-gray-100 p-4 rounded-lg mb-8">
					<Button
						className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg px-5"
						onClick={() => fetchJobs(1)}
					>
						<div className="flex flex-row">
							<Search className="mr-2 h-5 w-5 mt-1" />
							<p className="text-lg">Search Jobs</p>
						</div>
					</Button>
				</div>

				{loading && <div className="text-center">Loading jobs...</div>}

				<div className="flex flex-col md:flex-row">
					<aside className="w-full md:w-1/4 pr-0 md:pr-8 mb-8 md:mb-0">
						<div className="md:hidden mb-4">
							<Button
								className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300"
								onClick={toggleFilters}
							>
								{filtersOpen ? "Hide Filters" : "Show Filters"}
							</Button>
						</div>
						<div
							className={`md:block ${filtersOpen ? "block" : "hidden"} bg-gray-200 p-4 rounded-lg`}
						>
							<h2 className="text-lg font-semibold mb-4">Filters</h2>
							<label className="block mb-2">
								Subjects:
								<select
									multiple
									className="mt-2 w-full border border-gray-300 rounded p-2"
									value={selectedSubjects}
									onChange={(e) =>
										setSelectedSubjects(
											Array.from(e.target.selectedOptions, (option) => option.value)
										)
									}
								>
									<option value="STEM">STEM</option>
									<option value="ARTS">Arts</option>
									<option value="HUMANITIES">Humanities</option>
								</select>
							</label>
							<label className="block mb-2">
								Grades:
								<select
									multiple
									className="mt-2 w-full border border-gray-300 rounded p-2"
									value={selectedGrades}
									onChange={(e) =>
										setSelectedGrades(
											Array.from(e.target.selectedOptions, (option) => option.value)
										)
									}
								>
									<option value="FRESHMEN">Freshmen</option>
									<option value="SOPHOMORES">Sophomores</option>
									<option value="JUNIORS">Juniors</option>
									<option value="SENIORS">Seniors</option>
								</select>
							</label>
						</div>
					</aside>

					<section className="w-full md:w-3/4">
						{jobs.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{jobs.map((job) => (
									<div
										key={job._id}
										className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 transition-transform hover:scale-105 cursor-pointer"
										onClick={() => showJobDetails(job)}
									>
										<img
											src={job.image}
											alt={job.title}
											className="w-full h-32 object-cover"
										/>
										<div className="p-4">
											<h3 className="text-xl font-semibold">{job.title}</h3>
											<p className="text-gray-600 text-sm">
												{job.prestige} | {job.type}
											</p>
											<p className="text-gray-800 mt-2">
												{formatJobDescription(job.description)}
											</p>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center">No jobs found.</div>
						)}

						{loading && <div className="text-center">Loading more jobs...</div>}
					</section>
				</div>

				{selectedJob && (
					<div
						className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
						onClick={closeOverlay}
					>
						<div className="bg-white rounded-lg overflow-hidden w-11/12 md:w-1/2">
							<div className="p-4 border-b">
								<h2 className="text-2xl font-semibold">{selectedJob.title}</h2>
								<p className="text-gray-600 text-sm">
									{selectedJob.prestige} | {selectedJob.type}
								</p>
							</div>
							<div className="p-4">{formatJobDescription(selectedJob.description)}</div>
							<div className="flex justify-end p-4 border-t">
								<Button className="bg-blue-600 text-white" onClick={() => window.open(selectedJob.url, "_blank")}>
									Apply Now
								</Button>
								<Button className="ml-2" onClick={closeOverlay}>
									<X />
								</Button>
							</div>
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
