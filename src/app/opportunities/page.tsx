"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { X, Search, Menu, ChevronRight } from "lucide-react"; // Import ChevronRight here
import Link from "next/link";

interface Job {
	_id: string;
	title: string;
	description: string;
	url: string;
}

const Button = ({ children, className, ...props }) => (
	<button
		className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${className}`}
		{...props}
	>
		{children}
	</button>
);

// Removed the unused Input component

export default function OpportunityFinder() {
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
				page: page,
			});

			const { opportunities } = response.data;
			if (opportunities && Array.isArray(opportunities)) {
				const newJobs = [...jobs, ...opportunities];
				setJobs(newJobs);
				setHasMore(opportunities.length > 0);
				setCurrentPage(page);
				localStorage.setItem("jobs", JSON.stringify(newJobs));
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
		const bottom =
			window.innerHeight + document.documentElement.scrollTop ===
			document.documentElement.offsetHeight;
		if (bottom && hasMore && !loading) {
			fetchJobs(currentPage + 1);
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
							className={`md:block ${
								filtersOpen ? "block" : "hidden"
							}`}
						>
							<h2 className="text-lg font-semibold mb-4">
								Refine by Subject
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
									<div
										key={subject}
										className="flex items-center"
									>
										<input
											type="checkbox"
											id={subject}
											className="mr-2"
											checked={selectedSubjects.includes(
												subject
											)}
											onChange={() => {
												setSelectedSubjects((prev) =>
													prev.includes(subject)
														? prev.filter(
																(s) =>
																	s !==
																	subject
														  )
														: [...prev, subject]
												);
											}}
										/>
										<label
											htmlFor={subject}
											className="text-sm font-medium leading-none cursor-pointer"
										>
											{subject}
										</label>
									</div>
								))}
							</div>
							<h2 className="text-lg font-semibold mt-8 mb-4">
								Grade Level
							</h2>
							<div className="space-y-2">
								{[
									"FRESHMEN",
									"SOPHOMORES",
									"JUNIORS",
									"SENIORS",
								].map((grade) => (
									<div
										key={grade}
										className="flex items-center"
									>
										<input
											type="checkbox"
											id={grade}
											className="mr-2"
											checked={selectedGrades.includes(
												grade
											)}
											onChange={() => {
												setSelectedGrades((prev) =>
													prev.includes(grade)
														? prev.filter(
																(g) =>
																	g !== grade
														  )
														: [...prev, grade]
												);
											}}
										/>
										<label
											htmlFor={grade}
											className="text-sm font-medium leading-none cursor-pointer"
										>
											{grade.charAt(0).toUpperCase() +
												grade.slice(1).toLowerCase()}
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
									// Extract grade levels and types from the description or tags
									const gradeLevels = job.tags?.filter(
										(tag) =>
											[
												"FRESHMEN",
												"SOPHOMORES",
												"JUNIORS",
												"SENIORS",
											].includes(tag)
									);
									const types = job.tags?.filter(
										(tag) =>
											![
												"FRESHMEN",
												"SOPHOMORES",
												"JUNIORS",
												"SENIORS",
											].includes(tag)
									);

									// Split description into paragraphs
									const paragraphs =
										job.description.split(/(?<=\.)\s+/);

									return (
										<div
											key={index}
											className="bg-white p-6 shadow-md rounded-md cursor-pointer hover:shadow-lg transition-shadow"
											onClick={() => showJobDetails(job)}
										>
											<img
												src={job.imgSrc}
												alt={job.title}
												className="w-full h-40 object-cover mb-4 rounded-md"
											/>
											<h3 className="font-semibold text-lg mb-2">
												{job.title}
											</h3>
											<p className="text-gray-600 text-sm mb-1">
												<strong>Type:</strong>{" "}
												{types?.join(", ")}
											</p>
											<p className="text-gray-600 text-sm mb-1">
												<strong>Grades:</strong>{" "}
												{gradeLevels?.join(", ")}
											</p>
											<p className="text-gray-600 text-sm line-clamp-3">
												{paragraphs[0]}
											</p>
										</div>
									);
								})}
							</div>
						) : (
							!loading && (
								<div className="text-center">
									No jobs found.
								</div>
							)
						)}
					</section>
				</div>

				{selectedJob && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 max-h-[80vh] p-6 rounded-lg shadow-lg overflow-y-auto">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-2xl font-bold">
									{selectedJob.title}
								</h2>
								<button
									onClick={closeOverlay}
									className="text-gray-500 hover:text-gray-700"
								>
									<X />
								</button>
							</div>
							<img
								src={selectedJob.imgSrc}
								alt={selectedJob.title}
								className="w-full h-48 object-cover mb-4 rounded-md"
							/>

							{/* Display grade levels and type if available */}
							{selectedJob.gradeLevels && (
								<p>
									<strong>Grade Levels:</strong>{" "}
									{selectedJob.gradeLevels.join(", ")}
								</p>
							)}
							{selectedJob.type && (
								<p>
									<strong>Type:</strong> {selectedJob.type}
								</p>
							)}

							{/* Display formatted job description */}
							<div className="my-4">
								{formatJobDescription(selectedJob.description)}
							</div>

							<div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-inner flex justify-center">
								<a
									href={selectedJob.url}
									target="_blank"
									rel="noopener noreferrer"
									className="w-full px-6 py-3 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-all"
								>
									Apply Now
									<ChevronRight className="inline ml-2" />
								</a>
							</div>
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
