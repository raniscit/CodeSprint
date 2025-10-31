import React from 'react'
import Image from "../maang2.webp"
import { useAuth0 } from "@auth0/auth0-react";
import FeatureCard from "../components/FeatureCard";
import Img from "../mapImage.png"

const HeroSection = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();

    const features = [
        { title: "AI Interview Simulator", desc: "Practice mock interviews", path: "/ai-interview" },
        { title: "Personalized Roadmaps", desc: "Plan your tech journey", path: "/roadmap" },
        { title: "Resume Builder", desc: "Create ATS-proof resumes", path: "/templates" },
        { title: "Aptitude knowledge", desc: "Improve your aptitude knowledge", path: "/aptitude" },
        { title: "DSA and CP", desc: "Learn DSA and CP", path: "/dsaAndcp" },
        { title: "Skill gap", desc: "Check your knowledge level", path: "/skillgap" }
    ];

    const handleClick = (path) => {
        if (isAuthenticated) {
            window.location.href = path;
        } else {
            loginWithRedirect({ appState: { returnTo: path } });
        }
    };
    return (
        <div>
            <div className='bg-[#22223b] text-[#c9ada7] rounded-2xl mb-14 p-10 flex justify-between'>

                <div className='pt-7 pl-5'>
                    <p className='pb-6  text-xl font-bold'>“Why aim for average when you can aim for the best? Start your journey to MAANG <p>careers today!”</p></p>

                    {isAuthenticated ? "" : <button

                        className="text-[#22223b] bg-white text-lg px-5 py-2  rounded-xl hover:bg-[#c9ada7] hover:text-[#22223b]  transition-all"
                        onClick={() => loginWithRedirect()}
                    >
                        Join CodeSprint Today
                    </button>}

                </div>

                <div>
                    <img className='w-xl pr-5' src={Image} alt="Maang Logo" />
                </div>

            </div>

            <div className="flex flex-col items-center justify-center text-center py-16 px-6">
                <h1 className='text-center text-4xl md:text-5xl font-extrabold text-gray-900 mb-8'>Tired of Generic Interview Prep?</h1>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
                    CodeSprint is Different!
                </h1>
                <p className='text-center mb-8 font-semibold'>Landing a tech role requires more than just coding—it demands skill, strategy, and a strong resume. CodeSprint covers every angle with focused, effective preparation tools designed to eliminate your weaknesses and fast-track your success.</p>
                <p className='text-blue-950 font-semibold text-lg '>Explore the key features that power your tech journey:</p>
                
            </div>


            {/* Features */}
            <section className="flex justify-center gap-8 px-8 pb-16">
                {features.map((f, i) => (
                    <FeatureCard key={i} {...f} onClick={() => handleClick(f.path)} />
                ))}
            </section>
        </div>
    )
}

export default HeroSection