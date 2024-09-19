"use client"
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import Image from 'next/image';

const Page: React.FC = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (isSignIn) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            setError('Authentication failed. Please try again.');
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
        try {
            let authProvider;
            switch (provider) {
                case 'google':
                    authProvider = new GoogleAuthProvider();
                    break;
                case 'facebook':
                    authProvider = new FacebookAuthProvider();
                    break;
                case 'apple':
                    authProvider = new OAuthProvider('apple.com');
                    break;
            }
            await signInWithPopup(auth, authProvider);
        } catch (error) {
            setError('Social login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#1E1E2E] text-white flex flex-col">
            <header className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Image src="/logo.png" alt="STUHmpact Logo" width={40} height={40} />
                    <span className="ml-2 text-2xl font-bold">STUHmpact</span>
                </div>
                <nav>
                    <a href="#" className="mx-2 text-sm">About</a>
                    <a href="#" className="mx-2 text-sm">FAQs</a>
                    <a href="#" className="mx-2 text-sm">Contact Us</a>
                    <button className="bg-[#FF4081] text-white px-4 py-2 rounded-full text-sm">Find Opportunities</button>
                </nav>
            </header>
            <main className="flex-grow flex">
                <div className="w-1/2 relative overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-50"></div>
                    <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-green-300 to-blue-500 opacity-50"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-orange-400 to-pink-500 opacity-50"></div>
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <div className="w-full max-w-md p-8">
                        <h1 className="text-4xl font-bold mb-8">Welcome</h1>
                        <div className="flex mb-6 bg-[#2A2A3C] rounded-full p-1">
                            <button
                                className={`flex-1 py-2 rounded-full text-sm transition-all duration-300 ${isSignIn ? 'bg-[#3D5AFE] text-white' : 'text-gray-400'}`}
                                onClick={() => setIsSignIn(true)}
                            >
                                SIGN IN
                            </button>
                            <button
                                className={`flex-1 py-2 rounded-full text-sm transition-all duration-300 ${!isSignIn ? 'bg-[#3D5AFE] text-white' : 'text-gray-400'}`}
                                onClick={() => setIsSignIn(false)}
                            >
                                SIGN UP
                            </button>
                        </div>
                        <form onSubmit={handleAuth} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Username or email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#2A2A3C] p-3 pl-10 rounded-full text-sm"
                                />
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#2A2A3C] p-3 pl-10 rounded-full text-sm"
                                />
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <div className="text-right">
                                <a href="#" className="text-xs text-[#3D5AFE]">Forgot Password?</a>
                            </div>
                            <button type="submit" className="w-full bg-[#7C4DFF] py-3 rounded-full text-sm hover:bg-[#6C3FEF] transition-colors duration-300">
                                {isSignIn ? 'Log In' : 'Sign Up'}
                            </button>
                        </form>
                        <div className="mt-4 flex justify-center space-x-4">
                            <button onClick={() => handleSocialLogin('google')} className="p-2 bg-transparent">
                                <Image src="/google-icon.png" alt="Google" width={24} height={24} />
                            </button>
                            <button onClick={() => handleSocialLogin('facebook')} className="p-2 bg-transparent">
                                <Image src="/facebook-icon.png" alt="Facebook" width={24} height={24} />
                            </button>
                            <button onClick={() => handleSocialLogin('apple')} className="p-2 bg-transparent">
                                <Image src="/apple-icon.png" alt="Apple" width={24} height={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Page;