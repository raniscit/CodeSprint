import React, { useState } from "react";

const roadmaps = {
  "SDE": ["Complete DSA Course", "JavaScript Algorithms", "System Design Basics", "100 Coding Problems", "Mock Interview"],
  "Data Analyst": ["Excel & SQL", "Python for Data Analysis", "Statistics", "Mini Projects", "Case Studies"],
  "Cloud": ["Linux Basics", "AWS Fundamentals", "Cloud Project", "Containers & DevOps", "Certification Prep"]
};

export default function Roadmap() {
  const [role, setRole] = useState("");
  return (
    <div>
      <h2>Personalized Roadmap</h2>
      <select onChange={(e) => setRole(e.target.value)} style={{margin: "16px 0"}}>
        <option value="">--Select Career Role--</option>
        {Object.keys(roadmaps).map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      {role && (
        <ol>
          {roadmaps[role].map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      )}
    </div>
  );
}
