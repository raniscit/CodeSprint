import React, { useState } from "react";

export default function SkillGap() {
  const [result, setResult] = useState(null);

  function handleAnalyze() {
    setResult({
      strengths: ["Data Structures", "OOP"],
      weaknesses: ["Aptitude", "DBMS"],
      readiness: 67,
      msg: "Your DS Algo is strong. Focus on Aptitude & DBMS to improve your placement index."
    });
  }

  return (
    <div>
      <h2>Skill Gap Analyzer</h2>
      <button onClick={handleAnalyze} style={{margin: "20px 0", padding: 10, fontWeight: 'bold'}}>Take AI Assessment</button>
      {result && (
        <div style={{marginTop: 16, background: "#fffbe6", padding: 16, borderRadius: 8}}>
          <div>Strengths: {result.strengths.join(", ")}</div>
          <div>Needs Improvement: {result.weaknesses.join(", ")}</div>
          <div style={{fontWeight: 'bold'}}>Placement Index: {result.readiness}%</div>
          <p>{result.msg}</p>
        </div>
      )}
    </div>
  );
}
