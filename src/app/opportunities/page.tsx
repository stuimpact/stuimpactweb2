"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { X, Search, Menu, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Job {
	_id: string;
	title: string;
	description: string;
	url: string;
	tags?: string[];
	imgSrc?: string;
}

const Button = ({ children, className, ...props }) => (
	<button
		className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${className}`}
		{...props}
	>
		{children}
	</button>
);

export default function OpportunityFinder() {
	const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
	const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [jobs, setJobs] = useState<Job[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [selectedJob, setSelectedJob] = useState<Job | null>(null);

	const fetchJobs = async (page: number = 1) => {
		setLoading(true);
		try {
			const response = await axios.post("/api/searchjobs", {
				interest: selectedSubject,
				grade: selectedGrade,
				page: page,
			});

			const { opportunities } = response.data;
			if (opportunities && Array.isArray(opportunities)) {
				setJobs((prevJobs) => [...prevJobs, ...opportunities]);
				setHasMore(opportunities.length > 0);
				setCurrentPage(page);
			}
		} catch (error) {
			console.error("Error fetching jobs:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchJobs();
	}, [selectedSubject, selectedGrade]);

	const handleScroll = useCallback(() => {
		const bottom =
			window.innerHeight + document.documentElement.scrollTop >=
			document.documentElement.offsetHeight - 50;

		if (bottom && hasMore && !loading) {
			fetchJobs(currentPage + 1);
		}
	}, [currentPage, hasMore, loading]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	const showJobDetails = (job: Job) => setSelectedJob(job);
	const closeOverlay = () => setSelectedJob(null);

	return (
		<div className="min-h-screen bg-white text-gray-800">
			<header className="sticky top-0 bg-white shadow-sm z-50">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<Link href="/" className="text-2xl font-bold text-blue-600">
						<img src="stuimpactt.png" alt="StuImpact Logo" className="h-10" />
					</Link>
					<Button
						className="bg-blue-600 text-white hover:bg-blue-700"
						onClick={() => fetchJobs(1)}
					>
						<Search className="mr-2 h-5 w-5" /> Search Jobs
					</Button>
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				<h1 className="text-4xl font-bold text-center mb-8">Opportunity Finder</h1>

				<div className="flex justify-center space-x-8 mb-8">
					<div>
						<h2 className="text-lg font-semibold mb-4">Select Subject</h2>
						<select
							className="w-full p-2 border rounded"
							onChange={(e) => setSelectedSubject(e.target.value)}
						>
							<option value="">All Subjects</option>
							{[
								"BIOLOGY",
								"COMPUTER SCIENCE",
								"ENGINEERING",
								"ARTS PERFORMANCE",
								"MATHEMATICS",
							].map((subject) => (
								<option key={subject} value={subject}>
									{subject}
								</option>
							))}
						</select>
					</div>

					<div>
						<h2 className="text-lg font-semibold mb-4">Select Grade</h2>
						<select
							className="w-full p-2 border rounded"
							onChange={(e) => setSelectedGrade(e.target.value)}
						>
							<option value="">All Grades</option>
							{["FRESHMEN", "SOPHOMORES", "JUNIORS", "SENIORS"].map((grade) => (
								<option key={grade} value={grade}>
									{grade}
								</option>
							))}
						</select>
					</div>
				</div>

				{loading && <div className="text-center">Loading jobs...</div>}

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{jobs.map((job) => (
						<div
							key={job._id}
							className="bg-white p-4 shadow rounded cursor-pointer"
							onClick={() => showJobDetails(job)}
						>
							<img
								src={job.imgSrc || "/placeholder.png"}
								alt={job.title}
								className="w-full h-40 object-cover rounded mb-4"
							/>
							<h3 className="font-semibold text-lg">{job.title}</h3>
							<p className="text-gray-600 mt-2 line-clamp-3">{job.description}</p>
						</div>
					))}
				</div>

				{selectedJob && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
						<div className="bg-white p-6 rounded shadow-lg max-w-lg">
							<button onClick={closeOverlay} className="absolute top-2 right-2">
								<X />
							</button>
							<h2 className="text-2xl font-bold mb-4">{selectedJob.title}</h2>
							<p>{selectedJob.description}</p>
							<a
								href={selectedJob.url}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-4 block text-center bg-blue-600 text-white py-2 rounded"
							>
								Apply Now <ChevronRight />
							</a>
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
