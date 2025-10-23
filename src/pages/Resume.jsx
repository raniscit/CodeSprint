// import React, { useState, useEffect, useRef } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// export default function Resume() {
//     const [resumes, setResumes] = useState([]); // all resumes
//     const [selectedResume, setSelectedResume] = useState(null);
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         PhoneNumber: "",
//         LinkedinLink: "",
//         GithubLink: "",
//         education: "",
//         experience: "",
//         projects: "",
//         skills: "",
//     });

//     const resumeRef = useRef();

//     // Load resumes from localStorage on mount
//     useEffect(() => {
//         const stored = localStorage.getItem("resumes");
//         if (stored) {
//             setResumes(JSON.parse(stored));
//         }
//     }, []); // ✅ Load only once on mount


//     // Save resumes to localStorage whenever they change
//     useEffect(() => {
//         if (resumes.length > 0) {
//             localStorage.setItem("resumes", JSON.stringify(resumes));
//         }
//     }, [resumes]);
//     // ✅ Save only when resumes is updated later


//     // handle form change
//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     // handle form submit
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const newResume = {
//             id: Date.now(),
//             ...form,
//             createdAt: new Date().toLocaleString(),
//         };

//         setResumes([newResume, ...resumes]); // add new resume at top
//         setForm({
//             name: "",
//             email: "",
//             PhoneNumber: "",
//             LinkedinLink: "",
//             GithubLink: "",
//             education: "",
//             experience: "",
//             projects: "",
//             skills: "",
//         });
//     };

//     const handlePreview = (resume) => {
//         setSelectedResume(resume);
//     };

//     // download resume as PDF
//     const handleDownload = async (resume) => {
//         setSelectedResume(resume);
//         await new Promise((r) => setTimeout(r, 100)); // wait for DOM to update

//         if (!resumeRef.current) return;
//         const canvas = await html2canvas(resumeRef.current, { scale: 2 });
//         const imgData = canvas.toDataURL("image/png");

//         const pdf = new jsPDF("p", "px", [canvas.width, canvas.height]); // canvas size
//         pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
//         pdf.save(`${resume.name}_resume.pdf`);
//     };




//     return (
//         <div className="p-6 flex flex-col md:flex-row gap-6 bg-gray-100 min-h-screen">
//             {/* LEFT SIDE — Resume list */}
//             <div className="md:w-1/3 bg-white shadow-lg rounded-2xl p-4">
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Resumes</h2>

//                 {resumes.length === 0 ? (
//                     <p className="text-gray-500">No resumes created yet.</p>
//                 ) : (
//                     <ul className="space-y-3">
//                         {resumes.map((r) => (
//                             <li
//                                 key={r.id}
//                                 className={`p-3 rounded-xl border cursor-pointer ${selectedResume?.id === r.id ? "bg-blue-100" : "hover:bg-gray-50"
//                                     }`}
//                                 onClick={() => handlePreview(r)}
//                             >
//                                 <div className="flex justify-between items-center">
//                                     <div>
//                                         <h3 className="font-semibold">{r.name}</h3>
//                                         <p className="text-sm text-gray-500">{r.createdAt}</p>
//                                     </div>
//                                     <button
//                                         type="button"
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             handleDownload(r);

//                                         }}
//                                         className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-950"
//                                     >
//                                         Download
//                                     </button>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 )}

//                 {/* FORM SECTION */}
//                 <h3 className="text-xl font-bold mt-6 mb-2 text-gray-700">Create New Resume</h3>
//                 <form onSubmit={handleSubmit} className="space-y-2">
//                     <input
//                         name="name"
//                         value={form.name}
//                         onChange={handleChange}
//                         placeholder="Name"
//                         className="w-full p-2 border rounded"
//                         required
//                     />
//                     <input
//                         name="email"
//                         value={form.email}
//                         onChange={handleChange}
//                         placeholder="Email"
//                         className="w-full p-2 border rounded"
//                         required
//                     />
//                     <input
//                         name="PhoneNumber"
//                         value={form.PhoneNumber}
//                         onChange={handleChange}
//                         placeholder="PhoneNumber"
//                         className="w-full p-2 border rounded"
//                         required
//                     />
//                     <input
//                         name="LinkedinLink"
//                         value={form.LinkedinLink}
//                         onChange={handleChange}
//                         placeholder="LinkedinLink"
//                         className="w-full p-2 border rounded"
//                         required
//                     />
//                     <input
//                         name="GithubLink"
//                         value={form.GithubLink}
//                         onChange={handleChange}
//                         placeholder="GithubLink"
//                         className="w-full p-2 border rounded"
//                         required
//                     />
//                     <input
//                         name="education"
//                         value={form.education}
//                         onChange={handleChange}
//                         placeholder="Education"
//                         className="w-full p-2 border rounded"
//                         required
//                     />
//                     <textarea
//                         name="experience"
//                         value={form.experience}
//                         onChange={handleChange}
//                         placeholder="Experience"
//                         className="w-full p-2 border rounded"
//                         required
//                     />
//                     <textarea
//                         name="projects"
//                         value={form.projects}
//                         onChange={handleChange}
//                         placeholder="projects"
//                         className="w-full p-2 border rounded"
//                         required
//                     />
//                     <input
//                         name="skills"
//                         value={form.skills}
//                         onChange={handleChange}
//                         placeholder="Skills"
//                         className="w-full p-2 border rounded"
//                         required
//                     />
//                     <button
//                         type="submit"
//                         className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold"
//                     >
//                         Save Resume
//                     </button>
//                 </form>
//             </div>

//             {/* RIGHT SIDE — Resume Preview */}
//             <div className="md:w-2/3 bg-white shadow-lg rounded-2xl p-6">
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Preview</h2>

//                 {selectedResume ? (
//                     <div
//                         id="resume-preview"
//                         ref={resumeRef}
//                         style={{
//                             width: "210mm", // A4 width
//                             minHeight: "297mm", // A4 height
//                             margin: "0 auto",
//                             backgroundColor: "white",
//                             padding: "20mm",
//                             boxShadow: "0 0 5mm rgba(0,0,0,0.1)",
//                             fontFamily: "'Times New Roman', serif",
//                             color: "#222",
//                             lineHeight: 1.5,
//                         }}
//                     >
//                         {/* HEADER */}
//                         <header style={{ textAlign: "center", borderBottom: "2px solid #000", paddingBottom: "5mm", marginBottom: "6mm" }}>
//                             <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "2mm" }}>{selectedResume.name}</h1>
//                             <p style={{ fontSize: "14px" }}>
//                                 {selectedResume.email} | {selectedResume.PhoneNumber}
//                             </p>
//                             <p style={{ fontSize: "13px" }}>
//                                 <a href={selectedResume.LinkedinLink} target="_blank" rel="noreferrer">LinkedIn</a> |{" "}
//                                 <a href={selectedResume.GithubLink} target="_blank" rel="noreferrer">GitHub</a>
//                             </p>
//                         </header>


//                         <section style={{ marginBottom: "8mm" }}>
//                             <div style={{ borderBottom: "1px solid #000", marginBottom: "4mm" }}>
//                                 <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "2mm" }}>
//                                     Education
//                                 </h2>
//                             </div>
//                             <ul style={{ marginLeft: "5mm", listStyleType: "disc" }}>
//                                 {selectedResume.education.split("\n").map((edu, i) => (
//                                     <li key={i}>{edu.trim()}</li>
//                                 ))}
//                             </ul>
//                         </section>


//                         {/* EXPERIENCE */}
//                         <section style={{ marginBottom: "8mm" }}>
//                             <div style={{ borderBottom: "1px solid #000", marginBottom: "4mm" }}>
//                                 <h2
//                                     style={{
//                                         fontSize: "18px",
//                                         fontWeight: "bold",
//                                         marginBottom: "2mm",
//                                     }}
//                                 >
//                                     Experience
//                                 </h2>
//                             </div>
//                             <ul style={{ marginLeft: "5mm", listStyleType: "disc" }}>
//                                 {selectedResume.experience
//                                     .split("\n")
//                                     .filter((exp) => exp.trim() !== "")
//                                     .map((exp, index) => (
//                                         <li key={index}>{exp.trim()}</li>
//                                     ))}
//                             </ul>
//                         </section>

//                         {/* SKILLS */}
//                         <section style={{ marginBottom: "8mm" }}>
//                             <div style={{ borderBottom: "1px solid #000", marginBottom: "4mm" }}>
//                                 <h2
//                                     style={{
//                                         fontSize: "18px",
//                                         fontWeight: "bold",
//                                         marginBottom: "2mm",
//                                     }}
//                                 >
//                                     Skills
//                                 </h2>
//                             </div>
//                             <ul style={{ marginLeft: "5mm", listStyleType: "circle", columns: 2 }}>
//                                 {selectedResume.skills
//                                     .split(/[,;\n]/)
//                                     .filter((skill) => skill.trim() !== "")
//                                     .map((skill, index) => (
//                                         <li key={index}>{skill.trim()}</li>
//                                     ))}
//                             </ul>
//                         </section>
//                     </div>
//                 ) : (
//                     <p className="text-gray-500">Select a resume to preview.</p>
//                 )}



//             </div>
//         </div>
//     );
// }



import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Resume() {
    const [resumes, setResumes] = useState([]);
    const [selectedResume, setSelectedResume] = useState(null);

    // Structured form state
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        education: [{ school: "", degree: "", location: "", duration: "" }],
        experience: [{ role: "", company: "", location: "", duration: "", points: [""] }],
        projects: [{ title: "", tech: "", duration: "", points: [""] }],
        skills: {
            Languages: "",
            Frameworks: "",
            Tools: "",
            Libraries: "",
        },
    });

    const resumeRef = useRef();

    // Load resumes from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("resumes");
        if (stored) setResumes(JSON.parse(stored));
    }, []);

    // Save to localStorage when resumes change
    useEffect(() => {
        if (resumes.length > 0) {
            localStorage.setItem("resumes", JSON.stringify(resumes));
        }
    }, [resumes]);

    // Generic input handler
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle nested field changes (education, experience, projects)
    const handleNestedChange = (section, index, field, value) => {
        const updated = [...form[section]];
        updated[index][field] = value;
        setForm({ ...form, [section]: updated });
    };

    // Handle points (array of bullet points)
    const handlePointChange = (section, index, pointIndex, value) => {
        const updated = [...form[section]];
        updated[index].points[pointIndex] = value;
        setForm({ ...form, [section]: updated });
    };

    // Add new education/experience/project
    const addItem = (section) => {
        const emptyItem =
            section === "education"
                ? { school: "", degree: "", location: "", duration: "" }
                : section === "experience"
                    ? { role: "", company: "", location: "", duration: "", points: [""] }
                    : { title: "", tech: "", duration: "", points: [""] };

        setForm({ ...form, [section]: [...form[section], emptyItem] });
    };

    // Add new bullet point
    const addPoint = (section, index) => {
        const updated = [...form[section]];
        updated[index].points.push("");
        setForm({ ...form, [section]: updated });
    };

    // Save resume
    const handleSubmit = (e) => {
        e.preventDefault();
        const newResume = { id: Date.now(), ...form, createdAt: new Date().toLocaleString() };
        setResumes([newResume, ...resumes]);
        setForm({
            name: "",
            email: "",
            phone: "",
            linkedin: "",
            github: "",
            education: [{ school: "", degree: "", location: "", duration: "" }],
            experience: [{ role: "", company: "", location: "", duration: "", points: [""] }],
            projects: [{ title: "", tech: "", duration: "", points: [""] }],
            skills: { Languages: "", Frameworks: "", Tools: "", Libraries: "" },
        });
    };

    const handlePreview = (resume) => setSelectedResume(resume);

    const handleDownload = async (resume) => {
        setSelectedResume(resume);
        await new Promise((r) => setTimeout(r, 300)); // wait DOM update
        const canvas = await html2canvas(resumeRef.current, { scale: 2 });
        const pdf = new jsPDF("p", "mm", "a4");
        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = 210;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${resume.name}_resume.pdf`);
    };

    return (
        <div className="p-6 flex flex-col md:flex-row gap-6 bg-gray-100 min-h-screen">
            {/* LEFT SIDE */}
            <div className="md:w-1/3 bg-white shadow-lg rounded-2xl p-4 overflow-y-auto max-h-screen">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Resumes</h2>

                {resumes.length === 0 ? (
                    <p className="text-gray-500">No resumes yet.</p>
                ) : (
                    <ul className="space-y-3 mb-4">
                        {resumes.map((r) => (
                            <li
                                key={r.id}
                                className={`p-3 rounded-xl border cursor-pointer ${selectedResume?.id === r.id ? "bg-blue-100" : "hover:bg-gray-50"
                                    }`}
                                onClick={() => handlePreview(r)}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold">{r.name}</h3>
                                        <p className="text-sm text-gray-500">{r.createdAt}</p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDownload(r);
                                        }}
                                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-900"
                                    >
                                        Download
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {/* FORM */}
                <h3 className="text-xl font-bold mt-6 mb-2 text-gray-700">Create New Resume</h3>
                <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
                    <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded" required />
                    <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn URL" className="w-full p-2 border rounded" />
                    <input name="github" value={form.github} onChange={handleChange} placeholder="GitHub URL" className="w-full p-2 border rounded" />

                    {/* Education */}
                    <h4 className="font-semibold mt-4">Education</h4>
                    {form.education.map((edu, i) => (
                        <div key={i} className="border p-2 rounded space-y-1">
                            <input placeholder="School" value={edu.school} onChange={(e) => handleNestedChange("education", i, "school", e.target.value)} className="w-full border p-1 rounded" />
                            <input placeholder="Degree" value={edu.degree} onChange={(e) => handleNestedChange("education", i, "degree", e.target.value)} className="w-full border p-1 rounded" />
                            <input placeholder="Location" value={edu.location} onChange={(e) => handleNestedChange("education", i, "location", e.target.value)} className="w-full border p-1 rounded" />
                            <input placeholder="Duration" value={edu.duration} onChange={(e) => handleNestedChange("education", i, "duration", e.target.value)} className="w-full border p-1 rounded" />
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem("education")} className="text-blue-600 underline">
                        + Add Education
                    </button>

                    {/* Experience */}
                    <h4 className="font-semibold mt-4">Experience</h4>
                    {form.experience.map((exp, i) => (
                        <div key={i} className="border p-2 rounded space-y-1">
                            <input placeholder="Role" value={exp.role} onChange={(e) => handleNestedChange("experience", i, "role", e.target.value)} className="w-full border p-1 rounded" />
                            <input placeholder="Company" value={exp.company} onChange={(e) => handleNestedChange("experience", i, "company", e.target.value)} className="w-full border p-1 rounded" />
                            <input placeholder="Location" value={exp.location} onChange={(e) => handleNestedChange("experience", i, "location", e.target.value)} className="w-full border p-1 rounded" />
                            <input placeholder="Duration" value={exp.duration} onChange={(e) => handleNestedChange("experience", i, "duration", e.target.value)} className="w-full border p-1 rounded" />
                            {exp.points.map((p, j) => (
                                <input key={j} placeholder="Bullet point" value={p} onChange={(e) => handlePointChange("experience", i, j, e.target.value)} className="w-full border p-1 rounded" />
                            ))}
                            <button type="button" onClick={() => addPoint("experience", i)} className="text-blue-600 underline">
                                + Add Point
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem("experience")} className="text-blue-600 underline">
                        + Add Experience
                    </button>

                    {/* Projects */}
                    <h4 className="font-semibold mt-4">Projects</h4>
                    {form.projects.map((proj, i) => (
                        <div key={i} className="border p-2 rounded space-y-1">
                            <input placeholder="Title" value={proj.title} onChange={(e) => handleNestedChange("projects", i, "title", e.target.value)} className="w-full border p-1 rounded" />
                            <input placeholder="Tech Used" value={proj.tech} onChange={(e) => handleNestedChange("projects", i, "tech", e.target.value)} className="w-full border p-1 rounded" />
                            <input placeholder="Duration" value={proj.duration} onChange={(e) => handleNestedChange("projects", i, "duration", e.target.value)} className="w-full border p-1 rounded" />
                            {proj.points.map((p, j) => (
                                <input key={j} placeholder="Bullet point" value={p} onChange={(e) => handlePointChange("projects", i, j, e.target.value)} className="w-full border p-1 rounded" />
                            ))}
                            <button type="button" onClick={() => addPoint("projects", i)} className="text-blue-600 underline">
                                + Add Point
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem("projects")} className="text-blue-600 underline">
                        + Add Project
                    </button>

                    {/* Skills */}
                    <h4 className="font-semibold mt-4">Skills</h4>
                    {Object.keys(form.skills).map((key) => (
                        <input key={key} placeholder={key} value={form.skills[key]} onChange={(e) => setForm({ ...form, skills: { ...form.skills, [key]: e.target.value } })} className="w-full border p-1 rounded" />
                    ))}

                    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold">
                        Save Resume
                    </button>
                </form>
            </div>

            {/* RIGHT SIDE PREVIEW */}
            <div className="md:w-2/3 bg-white shadow-lg rounded-2xl p-6 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Preview</h2>
                {selectedResume ? (
                    <div
                        ref={resumeRef}
                        style={{
                            width: "210mm",
                            minHeight: "297mm",
                            background: "#fff",
                            padding: "15mm",
                            fontFamily: "Georgia, serif",
                            color: "#000",
                        }}
                    >
                        <header style={{ textAlign: "center", marginBottom: "8mm" }}>
                            <h1 style={{ fontSize: "22px", fontWeight: "bold" }}>{selectedResume.name}</h1>
                            <p>{selectedResume.email} | {selectedResume.phone}</p>
                            <p>
                                <a href={selectedResume.linkedin}>LinkedIn</a> |{" "}
                                <a href={selectedResume.github}>GitHub</a>
                            </p>
                        </header>

                        {/* Education */}
                        <section style={{ marginBottom: "8mm" }}>
                            <h2
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    marginBottom: "2mm",
                                    letterSpacing: "0.5px",
                                }}
                            >
                                Education
                            </h2>
                            <div style={{ height: "1px", backgroundColor: "#000", marginBottom: "3mm" }}></div>
                            {(Array.isArray(selectedResume.education) ? selectedResume.education : []).map((edu, i) => (
                                <div key={i} style={{ marginTop: "3mm" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <strong>{edu.school}</strong>
                                        <span>{edu.location}</span>
                                    </div>
                                    <i>{edu.degree}</i>
                                    <div>{edu.duration}</div>
                                </div>
                            ))}
                        </section>

                        {/* Experience */}
                        <section style={{ marginBottom: "8mm" }}>
                            <h2
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    marginBottom: "2mm",
                                    letterSpacing: "0.5px",
                                }}
                            >
                                Experience
                            </h2>
                            <div style={{ height: "1px", backgroundColor: "#000", marginBottom: "3mm" }}></div>
                            {(Array.isArray(selectedResume.experience) ? selectedResume.experience : []).map((exp, i) => (
                                <div key={i} style={{ marginTop: "3mm" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <strong>{exp.role}</strong>
                                        <span>{exp.duration}</span>
                                    </div>
                                    <i>{exp.company}</i>, {exp.location}
                                    <ul style={{ marginLeft: "5mm", marginTop: "2mm" }}>
                                        {(Array.isArray(exp.points) ? exp.points : [])
                                            .filter(Boolean)
                                            .map((p, j) => (
                                                <li key={j}>{p}</li>
                                            ))}
                                    </ul>
                                </div>
                            ))}
                        </section>

                        {/* Projects */}
                        <section style={{ marginBottom: "8mm" }}>
                            <h2
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    marginBottom: "2mm",
                                    letterSpacing: "0.5px",
                                }}
                            >
                                Projects
                            </h2>
                            <div style={{ height: "1px", backgroundColor: "#000", marginBottom: "3mm" }}></div>
                            {(Array.isArray(selectedResume.projects) ? selectedResume.projects : []).map((proj, i) => (
                                <div key={i} style={{ marginTop: "3mm" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <strong>{proj.title}</strong>
                                        <span>{proj.duration}</span>
                                    </div>
                                    <i>{proj.tech}</i>
                                    <ul style={{ marginLeft: "5mm", marginTop: "2mm" }}>
                                        {(Array.isArray(proj.points) ? proj.points : [])
                                            .filter(Boolean)
                                            .map((p, j) => (
                                                <li key={j}>{p}</li>
                                            ))}
                                    </ul>
                                </div>
                            ))}
                        </section>

                        {/* Skills */}
                        <section>
                            <h2
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    marginBottom: "2mm",
                                    letterSpacing: "0.5px",
                                }}
                            >
                                Technical Skills
                            </h2>
                            <div style={{ height: "1px", backgroundColor: "#000", marginBottom: "3mm" }}></div>
                            {Object.entries(selectedResume.skills || {}).map(
                                ([category, value], i) =>
                                    value && (
                                        <p key={i} style={{ marginBottom: "2mm" }}>
                                            <strong>{category}:</strong> {value}
                                        </p>
                                    )
                            )}
                        </section>

                    </div>
                ) : (
                    <p className="text-gray-500">Select a resume to preview.</p>
                )}
            </div>
        </div>
    );
}
