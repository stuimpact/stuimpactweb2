import React from 'react';
import Image from 'next/image';
import { User } from 'firebase/auth';
import { Bell, Heart, LogOut, User as UserIcon, FileText, Clock } from 'lucide-react';

interface DashboardProps {
    user: User;
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
    return (
        <div className="min-h-screen bg-[#1E1E2E] text-white">
            <header className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Image src="/logo.png" alt="STUHmpact Logo" width={40} height={40} />
                    <span className="ml-2 text-2xl font-bold">STUHmpact</span>
                </div>
                <nav>
                    <a href="#" className="mx-2 text-sm">About</a>
                    <a href="#" className="mx-2 text-sm">FAQs</a>
                    <a href="#" className="mx-2 text-sm">Contact Us</a>
                    <button className="bg-gradient-to-r from-[#FF4081] to-[#FFA000] text-white px-4 py-2 rounded-full text-sm">Find Opportunities</button>
                </nav>
            </header>
            <main className="p-8 flex gap-8">
                <aside className="w-1/4">
                    <div className="bg-[#2A2A3C] rounded-lg p-6 mb-6">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <Image
                                src={user.photoURL || '/placeholder-user.jpg'}
                                alt={user.displayName || 'User'}
                                layout="fill"
                                className="rounded-full"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-center mb-2">{user.displayName || 'User'}</h2>
                        <p className="text-sm text-center text-gray-400">Member since 2024</p>
                        <button className="w-full bg-[#3D5AFE] text-white py-2 rounded-full mt-4 text-sm">Edit Profile</button>
                    </div>
                    <nav className="space-y-2">
                        <button className="w-full bg-[#2A2A3C] text-left px-4 py-3 rounded-lg flex items-center">
                            <UserIcon className="mr-3" size={18} />
                            Profile
                        </button>
                        <button className="w-full bg-[#2A2A3C] text-left px-4 py-3 rounded-lg flex items-center">
                            <Heart className="mr-3" size={18} />
                            Favorites
                        </button>
                        <button className="w-full bg-[#2A2A3C] text-left px-4 py-3 rounded-lg flex items-center">
                            <FileText className="mr-3" size={18} />
                            Recommended
                        </button>
                        <button className="w-full bg-[#2A2A3C] text-left px-4 py-3 rounded-lg flex items-center">
                            <Clock className="mr-3" size={18} />
                            Volunteer Log
                        </button>
                        <button onClick={onLogout} className="w-full bg-[#2A2A3C] text-left px-4 py-3 rounded-lg flex items-center text-red-500">
                            <LogOut className="mr-3" size={18} />
                            Logout
                        </button>
                    </nav>
                </aside>
                <section className="w-1/2">
                    <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
                    <div className="bg-[#2A2A3C] rounded-lg p-6 mb-6">
                        <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-semibold mb-2">Causes</h4>
                                <ul className="list-disc list-inside text-sm">
                                    <li>Cause 1</li>
                                    <li>Cause 2</li>
                                    <li>Cause 3</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-2">Skills</h4>
                                <ul className="list-disc list-inside text-sm">
                                    <li>HTML/CSS/JS</li>
                                    <li>Figma</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-2">Location</h4>
                                <p className="text-sm">90210</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-2">Account</h4>
                                <p className="text-sm">Email: {user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Your Favorites</h3>
                        <div className="space-y-4">
                            {['ABC Organization Volunteer', 'XYZ Foundation Intern'].map((org, index) => (
                                <div key={index} className="bg-[#2A2A3C] rounded-lg p-6">
                                    <h4 className="text-lg font-semibold mb-2">{org}</h4>
                                    <p className="text-sm mb-4">Here is a description of what the intern will need to do and the company values.</p>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <button className="bg-[#3D5AFE] text-white px-4 py-2 rounded-full text-sm mr-2">Learn More</button>
                                            <button className="bg-[#7C4DFF] text-white px-4 py-2 rounded-full text-sm">Apply Now</button>
                                        </div>
                                        <Heart className="text-red-500" size={24} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <aside className="w-1/4">
                    <div className="bg-[#2A2A3C] rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <Bell className="mr-2" size={18} />
                            Notifications
                        </h3>
                        <div className="space-y-4">
                            {[
                                'ABC Nonprofit posted a new volunteering opportunity',
                                'Update on your XYZ Organization Internship application',
                                'Submitted application to XYZ Organization internship',
                                'Submitted application to ABC Organization internship',
                                'You set up your professional profile!',
                                'You created a STUHmpact Account'
                            ].map((notification, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                                    <p className="text-sm">{notification}</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full bg-[#3D5AFE] text-white py-2 rounded-full mt-4 text-sm">View All</button>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default Dashboard;