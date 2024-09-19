'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { MapPin, X } from 'lucide-react';

interface Job {
    title: string;
    description: string;
    url: string;
    imgSrc: string;
}

export default function OpportunityFinder() {
    const [location, setLocation] = useState<string>('United States');
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
    const [selectedModes, setSelectedModes] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    // Function to clear previous jobs if a new search is detected
    const clearJobsIfNewSearch = () => {
        const prevSearchParams = localStorage.getItem('searchParams');
        const currentSearchParams = JSON.stringify({
            interest: selectedSubjects.join(' '),
            grade: selectedGrades.join(','),
            mode: selectedModes.join(','),
            location,
        });

        // If the current search parameters are different from the last search, clear the jobs
        if (prevSearchParams !== currentSearchParams) {
            setJobs([]);
            setCurrentPage(1);
            setHasMore(true);
            localStorage.removeItem('jobs');  // Clear saved jobs
        }

        // Save the new search parameters
        localStorage.setItem('searchParams', currentSearchParams);
    };

    const fetchJobs = async (page: number) => {
        setLoading(true);
        clearJobsIfNewSearch();  // Clear jobs if a new search is being made

        try {
            const response = await axios.post('/api/searchjobs', {
                interest: selectedSubjects.join(' '),
                grade: selectedGrades.join(','),
                mode: selectedModes.join(','),
                location: location,
                page: page,
            });

            const { articles, nextPage } = response.data;
            if (articles && Array.isArray(articles)) {
                const newJobs = [...jobs, ...articles];
                setJobs(newJobs);
                setHasMore(nextPage !== null);
                setCurrentPage(page);
                localStorage.setItem('jobs', JSON.stringify(newJobs));  // Save to local storage
            } else {
                console.error('Expected an array of articles but got:', articles);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Load jobs from localStorage if they exist on initial mount
        const storedJobs = localStorage.getItem('jobs');
        const storedSearchParams = localStorage.getItem('searchParams');
        if (storedJobs && storedSearchParams) {
            try {
                const parsedJobs = JSON.parse(storedJobs);
                if (Array.isArray(parsedJobs)) {
                    setJobs(parsedJobs);
                } else {
                    console.error('Invalid stored job data:', parsedJobs);
                }
            } catch (error) {
                console.error('Error parsing stored job data:', error);
            }
        }
    }, []);

    useEffect(() => {
        if (jobs.length === 0) {
            fetchJobs(currentPage);
        }
    }, [jobs]);

    const handleScroll = useCallback(() => {
        const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
        if (bottom && hasMore && !loading) {
            fetchJobs(currentPage + 1);
        }
    }, [currentPage, hasMore, loading]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const formatJobDescription = (description: string) => {
        return description
            .replace(/•\s*/g, '\n• ')
            .replace(/(?:\r\n|\r|\n){2,}/g, '\n\n')
            .split('\n').map((line, index) => (
                <p key={index} className={line.startsWith('•') ? 'list-item' : ''}>
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
        if (event.key === 'Escape') {
            closeOverlay();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, []);


return (
        <div className="min-h-screen bg-[#1c1c2e] text-white">
            <header className="flex justify-between items-center p-4">
                <div className="flex items-center space-x-2">
                    <img src="/StuImpact.png?height=32&width=32" alt="STUimpact Logo" className="h-8 w-8" />
                    <span className="text-xl font-bold">STUimpact</span>
                </div>
                <nav className="flex items-center space-x-4">
                    <a href="#" className="text-gray-300 hover:text-white">About</a>
                    <a href="#" className="text-gray-300 hover:text-white">FAQs</a>
                    <a href="#" className="text-gray-300 hover:text-white">Contact Us</a>
                    <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-md text-white" onClick={() => fetchJobs(1)}>
                        Find Opportunities
                    </button>
                    <img src="../guy.PNG?height=32&width=32" alt="User Avatar" className="h-8 w-8 rounded-full" />
                </nav>
            </header>

            <main className="p-8">
                <h1 className="text-4xl font-bold mb-6">Opportunity Finder</h1>

                <div className="bg-[#2a2a3d] p-2 rounded-full mb-8 flex flex-wrap items-center space-x-2">
                    <div className="flex-1 min-w-[200px] flex items-center bg-[#1c1c2e] rounded-full p-2 m-1">
                        <MapPin className="text-gray-400 mr-2 h-5 w-5" />
                        <input
                            placeholder="Location"
                            className="bg-transparent border-none text-white placeholder-gray-400 flex-1 focus:outline-none"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-[#5b5bf7] rounded-full px-8 py-2 m-1 text-white"
                        onClick={() => fetchJobs(1)}
                    >
                        Search Jobs
                    </button>
                </div>

                {loading && <div className="text-center">Loading jobs...</div>}

                <div className="flex flex-col md:flex-row">
                    <aside className="w-full md:w-1/4 pr-0 md:pr-8 mb-8 md:mb-0">
                        <h2 className="text-lg font-semibold mb-4">REFINE BY SUBJECT</h2>
                        <div className="space-y-2">
                            {['Arts', 'Business', 'Computer Science', 'Engineering', 'Medicine', 'Government', 'Law/Advocacy'].map((subject) => (
                                <div key={subject} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={subject}
                                        className="mr-2"
                                        checked={selectedSubjects.includes(subject)}
                                        onChange={() => {
                                            setSelectedSubjects(prev =>
                                                prev.includes(subject)
                                                    ? prev.filter(s => s !== subject)
                                                    : [...prev, subject]
                                            );
                                        }}
                                    />
                                    <label htmlFor={subject} className="text-sm font-medium leading-none cursor-pointer">
                                        {subject}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <h2 className="text-lg font-semibold mt-8 mb-4">GRADE LEVEL</h2>
                        <div className="space-y-2">
                            {['Freshman', 'Sophomore', 'Junior', 'Senior'].map((grade) => (
                                <div key={grade} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={grade}
                                        className="mr-2"
                                        checked={selectedGrades.includes(grade)}
                                        onChange={() => {
                                            setSelectedGrades(prev =>
                                                prev.includes(grade)
                                                    ? prev.filter(g => g !== grade)
                                                    : [...prev, grade]
                                            );
                                        }}
                                    />
                                    <label htmlFor={grade} className="text-sm font-medium leading-none cursor-pointer">
                                        {grade}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <h2 className="text-lg font-semibold mt-8 mb-4">JOB MODE</h2>
                        <div className="space-y-2">
                            {['Remote', 'On site', 'Hybrid'].map((mode) => (
                                <div key={mode} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={mode}
                                        className="mr-2"
                                        checked={selectedModes.includes(mode)}
                                        onChange={() => {
                                            setSelectedModes(prev =>
                                                prev.includes(mode)
                                                    ? prev.filter(m => m !== mode)
                                                    : [...prev, mode]
                                            );
                                        }}
                                    />
                                    <label htmlFor={mode} className="text-sm font-medium leading-none cursor-pointer">
                                        {mode}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </aside>

                    <section className="w-full md:w-3/4">
                        <div className="flex flex-wrap -m-4">
                            {jobs.map((job, index) => (
                                <div key={index} className="p-4 w-full md:w-1/2 lg:w-1/3">
                                    <div
                                        className="bg-[#2a2a3d] p-4 rounded-lg shadow-lg cursor-pointer h-64 overflow-hidden flex flex-col justify-between"
                                        onClick={() => showJobDetails(job)}
                                    >
                                        <img
                                            src={job.imgSrc || '/path/to/placeholder-image.png'}
                                            alt={job.title}
                                            className="w-full h-32 object-cover rounded-lg mb-2"
                                        />
                                        <h3 className="text-xl font-semibold">{job.title}</h3>
                                        <p className="text-gray-400 overflow-hidden text-ellipsis">{job.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            {selectedJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#2a2a3d] p-8 rounded-lg max-w-4xl mx-4 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            onClick={closeOverlay}
                        >
                        <X className="h-6 w-6" />
                        </button>
                        <h2 className="text-2xl font-semibold mb-4">{selectedJob.title}</h2>
                        <p className="text-gray-400 mb-2">Description:</p>
                        <div className="text-gray-300 mb-4">{formatJobDescription(selectedJob.description)}</div>
                        <a href={selectedJob.url} className="text-blue-400" target="_blank" rel="noopener noreferrer">Apply Now</a>
                    </div>
                </div>
            )}
        </div>
    );
}
