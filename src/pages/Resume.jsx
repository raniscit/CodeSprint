import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";

export default function Resume() {
    const { templateId } = useParams();
    const [resumes, setResumes] = useState([]);
    const [selectedResume, setSelectedResume] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);


    const [form, setForm] = useState({
        name: "",
        role: "",
        email: "",
        phone: "",
        website: "",
        linkedin: "",
        github: "",
        location: "",
        photo: "",
        summary: "",
        yearStart: "",
        yearEnd: "",
        education: [{ school: "", degree: "", location: "", duration: "" }],
        experience: [{ role: "", company: "", duration: "", points: [""] }],
        projects: [{ title: "", tech: "", duration: "", points: [""] }],
        skills: {
            Languages: "",
            Frameworks: "",
            Tools: "",
            Libraries: "",
        },
    });

    const resumeRef = useRef(null);

    useEffect(() => {
        const stored = localStorage.getItem("resumes");
        if (stored) setResumes(JSON.parse(stored));
    }, []);

    useEffect(() => {
        if (resumes.length > 0) {
            localStorage.setItem("resumes", JSON.stringify(resumes));
        }
    }, [resumes]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this resume?")) {
            const updated = resumes.filter((r) => r.id !== id);
            setResumes(updated);
            localStorage.setItem("resumes", JSON.stringify(updated));
            if (selectedResume?.id === id) setSelectedResume(null);
        }
    };

    const handleNestedChange = (section, index, field, value) => {
        const updated = [...form[section]];
        updated[index][field] = value;
        setForm({ ...form, [section]: updated });
    };

    const handlePointChange = (section, index, pointIndex, value) => {
        const updated = [...form[section]];
        updated[index].points[pointIndex] = value;
        setForm({ ...form, [section]: updated });
    };

    const addItem = (section) => {
        const emptyItem =
            section === "education"
                ? { school: "", degree: "", location: "", duration: "" }
                : section === "experience"
                    ? { role: "", company: "", duration: "", points: [""] }
                    : { title: "", tech: "", duration: "", points: [""] };
        setForm({ ...form, [section]: [...form[section], emptyItem] });
    };

    const addPoint = (section, index) => {
        const updated = [...form[section]];
        updated[index].points.push("");
        setForm({ ...form, [section]: updated });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setForm({ ...form, photo: reader.result });
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const handleClickOutside = () => {
            if (openMenuId !== null) setOpenMenuId(null);
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [openMenuId]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const newResume = {
            id: Date.now(),
            ...form,
            createdAt: new Date().toLocaleString(),
        };
        setResumes([newResume, ...resumes]);
        setForm({
            name: "",
            role: "",
            email: "",
            phone: "",
            website: "",
            linkedin: "",
            github: "",
            location: "",
            photo: "",
            summary: "",
            yearStart: "",
            yearEnd: "",
            education: [{ school: "", degree: "", location: "", duration: "" }],
            experience: [{ role: "", company: "", duration: "", points: [""] }],
            projects: [{ title: "", tech: "", duration: "", points: [""] }],
            skills: { Languages: "", Frameworks: "", Tools: "", Libraries: "" },
        });
    };

    const handlePreview = (resume) => setSelectedResume(resume);

    const handleDownload = async (resume) => {
        setSelectedResume(resume);
        await new Promise((r) => setTimeout(r, 300));

        const input = resumeRef.current;
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = 210;
        const pdfHeight = 297;
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pdfWidth;
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

        let heightLeft = imgHeight;
        let position = 0;

        while (heightLeft > 0) {
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
            position -= pdfHeight;
            if (heightLeft > 0) pdf.addPage();
        }

        pdf.save(`${resume.name}_resume.pdf`);
    };


    const handleEdit = (id) => {
        const resumeToEdit = resumes.find((r) => r.id === id);
        if (!resumeToEdit) return;

        // Populate form fields with existing resume data
        setForm({
            name: resumeToEdit.name || "",
            role: resumeToEdit.role || "",
            email: resumeToEdit.email || "",
            phone: resumeToEdit.phone || "",
            website: resumeToEdit.website || "",
            linkedin: resumeToEdit.linkedin || "",
            github: resumeToEdit.github || "",
            location: resumeToEdit.location || "",
            photo: resumeToEdit.photo || "",
            summary: resumeToEdit.summary || "",
            yearStart: resumeToEdit.yearStart || "",
            yearEnd: resumeToEdit.yearEnd || "",
            education: resumeToEdit.education || [{ school: "", degree: "", location: "", duration: "" }],
            experience: resumeToEdit.experience || [{ role: "", company: "", duration: "", points: [""] }],
            projects: resumeToEdit.projects || [{ title: "", tech: "", duration: "", points: [""] }],
            skills: resumeToEdit.skills || { Languages: "", Frameworks: "", Tools: "", Libraries: "" },
        });

        // Set this resume as currently selected for editing
        setSelectedResume(resumeToEdit);

        // Optional: scroll or highlight the form section for visibility
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    return (
        <div className="p-6 flex flex-col md:flex-row gap-6 bg-gray-100 min-h-screen w-7xl">
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
                                className={`p-3 rounded-xl border cursor-pointer ${selectedResume?.id === r.id
                                    ? "bg-blue-100"
                                    : "hover:bg-gray-50"
                                    }`}
                                onClick={() => handlePreview(r)}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold">{r.name}</h3>
                                        <p className="text-sm text-gray-500">{r.createdAt}</p>
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenuId(openMenuId === r.id ? null : r.id);
                                            }}
                                            className="text-gray-700 text-xl font-bold px-2"
                                        >
                                            ⋮
                                        </button>

                                        {openMenuId === r.id && (
                                            <div
                                                className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg z-10 flex flex-col"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <button
                                                    onClick={() => handleDownload(r)}
                                                    className="text-sm text-blue-600 hover:bg-blue-50 px-4 py-2 text-left"
                                                >
                                                    Download
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(r.id)}
                                                    className="text-sm text-red-600 hover:bg-red-50 px-4 py-2 text-left"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(r.id)}
                                                    className="text-sm text-green-600 hover:bg-green-50 px-4 py-2 text-left"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </li>
                        ))}
                    </ul>
                )}



                {/* FORM */}
                <style>
                    {`
                        input, textarea {
                            color: #000; /* typed text color */
                        }

                        input::placeholder,
                        textarea::placeholder {
                            color: #888; /* placeholder color */
                            opacity: 1; /* make sure grey color shows properly */
                        }
                    `}
                </style>


                <h3 className="text-xl font-bold mt-6 mb-2 text-gray-700">
                    Create New Resume
                </h3>
                <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        placeholder="Role / Position"
                        className="w-full p-2 border rounded"
                    />
                    <textarea
                        name="summary"
                        value={form.summary}
                        onChange={handleChange}
                        placeholder="Professional Summary"
                        className="w-full p-2 border rounded"
                    />

                    <input
                        name="photo"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="w-full border p-1 rounded"
                    />

                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                        placeholder="Website"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        name="linkedin"
                        value={form.linkedin}
                        onChange={handleChange}
                        placeholder="LinkedIn URL"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        name="github"
                        value={form.github}
                        onChange={handleChange}
                        placeholder="GitHub URL"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Location"
                        className="w-full p-2 border rounded"
                    />
                    <div className="flex gap-2">
                        <input
                            name="yearStart"
                            value={form.yearStart}
                            onChange={handleChange}
                            placeholder="Start Year"
                            className="w-1/2 p-2 border rounded"
                        />
                        <input
                            name="yearEnd"
                            value={form.yearEnd}
                            onChange={handleChange}
                            placeholder="End Year"
                            className="w-1/2 p-2 border rounded"
                        />
                    </div>

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

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold"
                    >
                        Save Resume
                    </button>
                </form>
            </div>

            <div style={{ colorScheme: "light", width: "1000px" }}>
                <ResumePreview
                    resume={selectedResume}
                    template={templateId}
                    ref={resumeRef}
                />
            </div>
        </div>
    );
}
