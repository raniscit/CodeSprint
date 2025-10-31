import React from "react";

const MinimalTemplate = ({ resume }) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#1f2937", // text-gray-900
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "700px",
        margin: "0 auto",
        borderRadius: "8px",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #d1d5db",
          paddingBottom: "16px",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#1f2937" }}>
          {resume?.name || "Your Name"}
        </h1>
        <p style={{ fontSize: "14px", color: "#4b5563", marginTop: "4px" }}>
          {resume?.email || "email@example.com"} | {resume?.phone || "123-456-7890"}
        </p>
        {(resume?.linkedin || resume?.github) && (
          <p style={{ fontSize: "14px", color: "#2563eb", marginTop: "6px" }}>
            {resume?.linkedin && (
              <a
                href={resume.linkedin}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "underline", marginRight: "10px", color: "#2563eb" }}
              >
                LinkedIn
              </a>
            )}
            {resume?.github && (
              <a
                href={resume.github}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "underline", color: "#2563eb" }}
              >
                GitHub
              </a>
            )}
          </p>
        )}
      </header>

      {/* Education */}
      <section style={{ marginBottom: "24px" }}>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "8px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          Education
        </h2>
        {Array.isArray(resume?.education) && resume.education.length > 0 ? (
          resume.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "500" }}>{edu?.degree || "Degree"}</span>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>
                  {edu?.duration || "Duration"}
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "#4b5563" }}>
                {edu?.school || "Institution Name"} — {edu?.location || "Location"}
              </p>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "13px", color: "#6b7280" }}>No education added yet.</p>
        )}
      </section>

      {/* Experience */}
      <section style={{ marginBottom: "24px" }}>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "8px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          Experience
        </h2>
        {Array.isArray(resume?.experience) && resume.experience.length > 0 ? (
          resume.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "500" }}>{exp?.role || "Role"}</p>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>
                  {exp?.duration || "Duration"}
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "#4b5563" }}>
                {exp?.company || "Company"} — {exp?.location || "Location"}
              </p>
              {Array.isArray(exp?.points) && exp.points.length > 0 && (
                <ul style={{ marginLeft: "20px", fontSize: "13px", color: "#374151" }}>
                  {exp.points.filter(Boolean).map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p style={{ fontSize: "13px", color: "#6b7280" }}>No experience added yet.</p>
        )}
      </section>

      {/* Projects */}
      <section style={{ marginBottom: "24px" }}>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "8px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          Projects
        </h2>
        {Array.isArray(resume?.projects) && resume.projects.length > 0 ? (
          resume.projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "500" }}>{proj?.title || "Project Title"}</p>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>
                  {proj?.duration || "Duration"}
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "#4b5563" }}>
                {proj?.tech || "Tech Stack"}
              </p>
              {Array.isArray(proj?.points) && proj.points.length > 0 && (
                <ul style={{ marginLeft: "20px", fontSize: "13px", color: "#374151" }}>
                  {proj.points.filter(Boolean).map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p style={{ fontSize: "13px", color: "#6b7280" }}>No projects added yet.</p>
        )}
      </section>

      {/* Skills */}
      <section>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "8px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          Skills
        </h2>
        {resume?.skills && Object.keys(resume.skills).length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {Object.entries(resume.skills)
              .filter(([_, v]) => v)
              .map(([key, value]) => (
                <span
                  key={key}
                  style={{
                    backgroundColor: "#dbeafe",
                    color: "#1d4ed8",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                >
                  {key}: {value}
                </span>
              ))}
          </div>
        ) : (
          <p style={{ fontSize: "13px", color: "#6b7280" }}>No skills added yet.</p>
        )}
      </section>
    </div>
  );
};

export default MinimalTemplate;
