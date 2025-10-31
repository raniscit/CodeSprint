import React from "react";

const ClassicTemplate = ({ resume }) => {
  const sectionTitle = {
    fontSize: "15px",
    fontWeight: "bold",
    letterSpacing: "1px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "4px",
    marginBottom: "8px",
    textTransform: "uppercase",
    color: "#444",
  };

  const infoText = { fontSize: "13px", lineHeight: "1.6", color: "#444" };

  return (
    <div
      style={{
        fontFamily: "'Georgia', serif",
        backgroundColor: "#ffffff",
        color: "#222",
        width: "800px",
        margin: "0 auto",
        padding: "40px",
        border: "1px solid #ddd",
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "24px",
          borderBottom: "3px solid #d8d8d8",
          paddingBottom: "12px",
          paddingTop: "15px",
          backgroundColor: "slategray",
          height: "130px"
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            letterSpacing: "1px",
            margin: "0",
            color: "#444",
          }}
        >
          {resume?.name || "Your Name"}
        </h1>
        <p
          style={{
            fontSize: "15px",
            textTransform: "uppercase",
            color: "#111111",
            letterSpacing: "2px",
            margin: "4px 0 0",
            paddingTop: "15px"
          }}
        >
          {resume?.role || "Your Position"}
        </p>
      </div>

      <div style={{ display: "flex", gap: "40px" }}>
        {/* LEFT COLUMN */}
        <div style={{ width: "35%" }}>
          {/* Contact */}
          <section style={{ marginBottom: "20px" }}>
            <h2 style={sectionTitle}>Contact</h2>
            <ul style={{ ...infoText, listStyle: "none", padding: 0, margin: 0 }}>
              {resume?.phone && <li>📞 {resume.phone}</li>}
              {resume?.email && <li>✉️ {resume.email}</li>}
              {resume?.location && <li>📍 {resume.location}</li>}
              {resume?.linkedin && <li>🔗 {resume.linkedin}</li>}
              {resume?.github && <li>💻 {resume.github}</li>}
              {resume?.website && <li>🌐 {resume.website}</li>}
            </ul>
          </section>

          {/* Skills */}
          <section style={{ marginBottom: "20px" }}>
            <h2 style={sectionTitle}>Skills</h2>
            {resume?.skills && Object.keys(resume.skills).length > 0 ? (
              <ul
                style={{
                  ...infoText,
                  listStyle: "none",
                  paddingLeft: "0",
                  lineHeight: "1.8",
                }}
              >
                {Object.entries(resume.skills)
                  .filter(([_, v]) => v)
                  .map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}: </strong>
                      {value}
                    </li>
                  ))}
              </ul>
            ) : (
              <p style={infoText}>No skills added.</p>
            )}
          </section>

          {/* Education */}
          <section style={{ marginBottom: "20px" }}>
            <h2 style={sectionTitle}>Education</h2>
            {Array.isArray(resume?.education) && resume.education.length > 0 ? (
              resume.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "12px" }}>
                  <p style={{ ...infoText, fontWeight: "bold" }}>
                    {edu.degree || "Degree"}
                  </p>
                  <p style={infoText}>{edu.school || "Institution"}</p>
                  <p style={{ ...infoText, color: "#777" }}>
                    {edu.duration || ""}
                  </p>
                </div>
              ))
            ) : (
              <p style={infoText}>No education added.</p>
            )}
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ width: "65%" }}>
          {/* Profile */}
          <section style={{ marginBottom: "20px" }}>
            <h2 style={sectionTitle}>Profile</h2>
            <p style={infoText}>
              {resume?.summary ||
                "A short professional summary describing your background, skills, and goals."}
            </p>
          </section>

          {/* Experience */}
          <section style={{ marginBottom: "20px" }}>
            <h2 style={sectionTitle}>Professional Experience</h2>
            {Array.isArray(resume?.experience) && resume.experience.length > 0 ? (
              resume.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: "16px" }}>
                  <p style={{ ...infoText, fontWeight: "bold" }}>
                    {exp.role || "Job Title"}
                  </p>
                  <p style={{ ...infoText, color: "#666" }}>
                    {exp.company || "Company"}{" "}
                    {exp.duration ? `| ${exp.duration}` : ""}
                  </p>
                  {Array.isArray(exp.points) && exp.points.length > 0 && (
                    <ul
                      style={{
                        ...infoText,
                        paddingLeft: "20px",
                        listStyleType: "disc",
                      }}
                    >
                      {exp.points.filter(Boolean).map((p, j) => (
                        <li key={j}>{p}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p style={infoText}>No experience added.</p>
            )}
          </section>

          {/* Projects */}
          <section>
            <h2 style={sectionTitle}>Projects</h2>
            {Array.isArray(resume?.projects) && resume.projects.length > 0 ? (
              resume.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: "16px" }}>
                  <p style={{ ...infoText, fontWeight: "bold" }}>
                    {proj.title || "Project Title"}
                  </p>
                  <p style={{ ...infoText, color: "#666" }}>
                    {proj.tech ? `Tech Used: ${proj.tech}` : ""}
                  </p>
                  {Array.isArray(proj.points) && proj.points.length > 0 && (
                    <ul
                      style={{
                        ...infoText,
                        paddingLeft: "20px",
                        listStyleType: "disc",
                      }}
                    >
                      {proj.points.filter(Boolean).map((p, j) => (
                        <li key={j}>{p}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p style={infoText}>No projects added.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClassicTemplate;
