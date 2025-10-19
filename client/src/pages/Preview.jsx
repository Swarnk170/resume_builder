import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import ResumePreview from "../components/ResumePreview";
import Loader from "../components/Loader";
import { ArrowLeftIcon } from "lucide-react";

const Preview = () => {
  const { resumeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  const loadResume = async () => {
    const resume = dummyResumeData._id === resumeId ? dummyResumeData : null;
    setResumeData(resume);
    setIsLoading(false);
  };

  useEffect(() => {
    loadResume();
  }, []);

  if (isLoading) return <Loader />;
  if (!resumeData)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-center text-6xl text-slate-400 font-medium">
          Resume not found
        </p>
        <a
          className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
          href="/"
        >
          <ArrowLeftIcon className="size-4 mr-2" />
          go to home page
        </a>
      </div>
    );

  return (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  );
};

export default Preview;
