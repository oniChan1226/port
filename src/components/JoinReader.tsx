import React from "react";

const JoinReader = () => {
  return (
    <div className="bg-primary flex flex-col lg:flex-row lg:justify-between lg:items-center px-5 py-6 space-y-3 lg:space-y-0">
      <div>
        <h2 className="font-semibold text-sm lg:text-md">Join 500+ Readers</h2>
        <p className="text-neutral-500 text-xs lg:text-sm">
          Read about authentic insights.
        </p>
      </div>
      <form className="flex flex-col lg:flex-row items-center gap-2 w-full lg:w-[60%]">
        <input
          type="email"
          name=""
          id=""
          className="border border-neutral-800 outline-none px-3 py-2 rounded-md w-full text-sm lg:text-md"
          placeholder="Your Email"
          required
        />
        <button
          type="submit"
          className="px-12 py-2 rounded-md bg-neutral-800 cursor-pointer w-full text-sm lg:text-md"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default JoinReader;
