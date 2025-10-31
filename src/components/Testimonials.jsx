// Testimonials.jsx
import React, { useState, useEffect } from "react";
import Card from "./Card";
import ImageA from "../std1.webp"
import ImageB from "../std2.webp"
import ImageC from "../std3.webp"
import ImageD from "../std4.webp"


const Testimonials = () => {
  const stdInfo = [
    {
      title: "1.2 Crore per annum in HFT",
      description: "I started learning programming during the late summer of my pre-final college year. While there are many online resources for competitive programming, finding a structured data structures and algorithms course can be challenging due to scattered and disorganized content. AlgoZenith's methodical approach and the best DSA course curriculum accelerated my learning significantly. It's noteworthy that Vivek Gupta's teaching in the data structure course exhibits an exceptional level of expertise.",
      imageUrl: ImageC
    },
    {
      title: "Tier-3 College to 30+ LPA",
      description: "AlgoZenith took my coding skills to the next level. The live classes, the problem set and the mentorship, everything was top-notch. I was able to clear almost every online-assessment I sat for, thanks to AZ. Even though my college didn’t have that much support for placements, AlgoZenith helped me in the off-campus hunt and guided in every step possible. Must for anyone aiming high!",
      imageUrl: ImageA
    },
    {
      title: "Beginner to GOOGLE",
      description: "AlgoZenith's well-structured data structures and algorithms course, featuring bi-weekly contests and efficient doubt-solving sessions, significantly boosted my preparation. The live classes, especially for difficult topics, were a game-changer, allowing real-time clarification of doubts. A heartfelt thanks to the AlgoZenith team for their exceptional guidance and teachings in the best data structures and algorithms course, which played a pivotal role in landing me a position at my dream company.",
      imageUrl: ImageB
    },
    {
      title: "Non-CS to product based",
      description: "Before joining AlgoZenith, coding rounds were a major concern for me. Enrolling in AZ-Premium boosted my confidence immensely. The course is meticulously designed, offering a comprehensive DSA syllabus. The interactive live sessions, part of this data structure course, were instrumental in enhancing my problem-solving skills. With a willingness to learn, AlgoZenith ensures significant returns on your educational investment. A must have for everyone.",
      imageUrl: ImageD
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stdInfo.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="text-center mb-1">
        <p className="text-black text-3xl font-bold mask-radial-from-neutral-700">
          Stories from those shaping the future with us.
        </p>
      </div>
      <div className="flex justify-center bg-white p-8 mb-30 transition-all duration-500 ">

        <Card
          title={stdInfo[currentIndex].title}
          description={stdInfo[currentIndex].description}
          imageUrl={stdInfo[currentIndex].imageUrl}
        />
      </div>
    </>
  );
};

export default Testimonials;
