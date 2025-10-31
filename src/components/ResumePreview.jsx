import React, { forwardRef } from "react";
import MinimalTemplate from "../Templates/MinimalTemplate";
import ModernTemplate from "../Templates/ModernTemplate";
import ClassicTemplate from "../Templates/ClassicTemplate";

const ResumePreview = forwardRef(({ resume, template }, ref) => {
    if (!resume) {
        return (
            <div ref={ref} className="flex items-center justify-center h-full text-gray-500">
                No resume selected.
            </div>
        );
    }

    return (
        <div ref={ref} className="bg-white shadow-xl p-6 rounded-xl w-full">
            {template === "modern" && <ModernTemplate resume={resume} ref={ref}/>}
            {template === "classic" && <ClassicTemplate resume={resume} />}
            {template === "minimal" && <MinimalTemplate resume={resume} />}
        </div>


    );
});

export default ResumePreview;
