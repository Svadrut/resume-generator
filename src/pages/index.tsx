import { type NextPage } from "next";
import { type SyntheticEvent, useState } from "react";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const { mutate, data, isLoading, isSuccess, error } = api.resume.getResponse.useMutation();
  const [resumeText, setResumeText] = useState<string>("");
  const [resumeTextErr, setResumeTextErr] = useState<string | null>(null);

  const handleTextChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLTextAreaElement;
    resumeTextErr ? setResumeTextErr(null) : null;
    setResumeText(target.value);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!resumeText || resumeText.length === 0 || resumeText.length <= 10) {
      setResumeTextErr("Fill in some text in the input section that has a length of ten characters or more");
    } else {
      mutate({ resumeText });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-10">
      <h1 className="text-3xl text-orange-500">
        Welcome to the A.I. resume generator!!
      </h1>
      {!isSuccess && <form
        className="flex flex-col items-center justify-center space-y-4 p-10"
        onSubmit={handleSubmit}
      >
        <p className="text-lg text-teal-500">
          Add your experiences and acheivments here:
        </p>
        <textarea
          onChange={handleTextChange}
          value={resumeText}
          className="h-72 w-[500px] resize-none rounded-lg border-2 border-black p-5 focus:border-teal-500 focus:outline-none"
        />
        {resumeTextErr && resumeTextErr.length > 0 ? (
          <div className="h-4">
            <p className="text-md text-red-500">{resumeTextErr}</p>
          </div>
        ) : (
          <div className="h-4"></div>
        )}
        <button className="rounded-full bg-orange-500 p-3 text-white">
          Submit
        </button>
      </form>}
      {isLoading && <p>loading...</p>}
      {data && <p>{data}</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Home;
