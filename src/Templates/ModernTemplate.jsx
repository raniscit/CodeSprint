import React from "react";

const ModernTemplate = ({ resume }) => {
  return (
    <div
      className="flex w-full max-w-4xl mx-auto overflow-hidden"
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#ffffff",
        color: "#222222",
        border: "1px solid #ddd",
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: "35%",
          backgroundColor: "#1a1a1a",
          color: "#f5f5f5",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Photo */}
        {resume?.photo ? (
          <img
            src={resume.photo}
            alt="Profile"
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "16px",
            }}
          />
        ) : (
          <div
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              backgroundColor: "#444",
              marginBottom: "16px",
            }}
          ></div>
        )}

        {/* Years */}
        <p
          style={{
            fontSize: "12px",
            backgroundColor: "#2a2a2a",
            padding: "4px 10px",
            borderRadius: "20px",
            marginBottom: "24px",
          }}
        >
          Estd. {resume?.yearStart || "2024"} to {resume?.yearEnd || "2028"}
        </p>

        {/* Contacts */}
        <div style={{ width: "100%", marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderBottom: "1px solid #444",
              marginBottom: "8px",
              paddingBottom: "4px",
            }}
          >
            Contacts
          </h2>
          <ul style={{ fontSize: "13px", lineHeight: "1.6" }}>
            <li>{resume?.phone || " "}</li>
            <li>{resume?.email || " "}</li>
            <li>{resume?.website || " "}</li>
            <li>{resume?.location || " "}</li>
            <li>{resume?.linkedin || " "}</li>
            <li>{resume?.github || " "}</li>
          </ul>
        </div>

        {/* Skills */}
        <div style={{ width: "100%", marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderBottom: "1px solid #444",
              marginBottom: "8px",
              paddingBottom: "4px",
            }}
          >
            Skills
          </h2>
          {resume?.skills && Object.keys(resume.skills).length > 0 ? (
            <ul
              style={{
                fontSize: "13px",
                lineHeight: "1.6",
                listStyleType: "disc",
                paddingLeft: "20px",
              }}
            >
              {Object.entries(resume.skills)
                .filter(([_, v]) => v)
                .map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
            </ul>
          ) : (
            <p style={{ color: "#888", fontSize: "13px" }}>No skills added.</p>
          )}
        </div>

        {/* Education */}
        <div style={{ width: "100%" }}>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderBottom: "1px solid #444",
              marginBottom: "8px",
              paddingBottom: "4px",
            }}
          >
            Education
          </h2>
          {Array.isArray(resume?.education) && resume.education.length > 0 ? (
            resume.education.map((edu, i) => (
              <div key={i} style={{ fontSize: "13px", marginBottom: "12px" }}>
                <p style={{ fontWeight: "600" }}>{edu.degree || "Degree"}</p>
                <p>{edu.school || "College / University"}</p>
                <p style={{ color: "#aaa" }}>{edu.duration || ""}</p>
              </div>
            ))
          ) : (
            <p style={{ color: "#888", fontSize: "13px" }}>No education added.</p>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div
        style={{
          width: "65%",
          backgroundColor: "#ffffff",
          padding: "32px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              textTransform: "uppercase",
              color: "#222",
            }}
          >
            {resume?.name || "Your Name"}
          </h1>
          <p
            style={{
              color: "#d4af37",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {resume?.role || "Program Administrator"}
          </p>
        </div>

        {/* Profile */}
        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              borderBottom: "2px solid #d4af37",
              display: "inline-block",
              marginBottom: "8px",
            }}
          >
            Profile
          </h2>
          <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#333" }}>
            {resume?.summary ||
              "A short professional summary describing your background, achievements, and goals."}
          </p>
        </section>

        {/* Experience */}
        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              borderBottom: "2px solid #d4af37",
              display: "inline-block",
              marginBottom: "12px",
            }}
          >
            Experience
          </h2>
          {Array.isArray(resume?.experience) && resume.experience.length > 0 ? (
            resume.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3 style={{ fontWeight: "600", fontSize: "15px" }}>
                    {exp?.role || "Job Title"}
                  </h3>
                  <span style={{ fontSize: "12px", color: "#666" }}>
                    {exp?.duration || ""}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#555", marginBottom: "6px" }}>
                  {exp?.company || "Company Name"}
                </p>
                {Array.isArray(exp?.points) && exp.points.length > 0 && (
                  <ul
                    style={{
                      fontSize: "13px",
                      color: "#333",
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
            <p style={{ fontSize: "13px", color: "#666" }}>No experience added.</p>
          )}
        </section>

        {/* Projects Section */}
        <section>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              borderBottom: "2px solid #d4af37",
              display: "inline-block",
              marginBottom: "12px",
            }}
          >
            Projects
          </h2>
          {Array.isArray(resume?.projects) && resume.projects.length > 0 ? (
            resume.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: "16px" }}>
                <h3 style={{ fontWeight: "600", fontSize: "15px", color: "#222" }}>
                  {proj?.title || "Project Title"}
                </h3>
                <p style={{ fontSize: "13px", color: "#555", marginBottom: "6px" }}>
                  {proj?.tech ? `Tech Used: ${proj.tech}` : ""}
                </p>
                {Array.isArray(proj?.points) && proj.points.length > 0 && (
                  <ul
                    style={{
                      fontSize: "13px",
                      color: "#333",
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
            <p style={{ fontSize: "13px", color: "#666" }}>No projects added.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ModernTemplate;
