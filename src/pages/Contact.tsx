import { useState } from "react";
import PageTitle from "../components/PageTitle";
import Tooltip from "../components/Tooltip";
import { myWorkEmail } from "../constants/constants";
import { Calendar, Check, Copy } from "lucide-react";
import CalendlyPopup from "../components/CalendlyPopup";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(myWorkEmail);
      setCopied(() => true);
      setTimeout(() => setCopied(() => false), 1500);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };
  return (
    <div>
      <CalendlyPopup isOpen={isOpen} setIsOpen={setIsOpen} />
      <PageTitle
        title="Contact"
        brief="Whether you’ve got a project in mind, a question to ask, or just want to say hi — I’d love to hear from you. Feel free to drop a message anytime!"
      />
      <div className="text-sm space-x-2 mt-4">
        <Tooltip
          content={"You can schedule a free call with me"}
          position="top"
          alignments="mb-1"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 cursor-pointer bg-neutral-800/50 px-5 py-2 rounded border border-neutral-800 hover:text-white/70 duration-300"
          >
            {<Calendar size={15} />}
            Book a free call
          </button>
        </Tooltip>
        <Tooltip
          content={copied ? "Copied!" : "Copy"}
          position="top"
          alignments="mb-1"
        >
          <button
            className="flex items-center gap-2 cursor-pointer bg-neutral-800/50 px-5 py-2 rounded border border-neutral-800 hover:text-white/70 duration-300"
            onClick={copyEmailToClipboard}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            Email
          </button>
        </Tooltip>
      </div>
      <div className="mt-12">
        <ContactForm />

        <div className="bg-primary flex flex-col lg:flex-row lg:justify-between lg:items-center px-5 py-6 space-y-3 lg:space-y-0 mt-8">
          <div>
            <h2 className="font-semibold text-sm lg:text-md">
              Join 500+ Readers
            </h2>
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
      </div>
    </div>
  );
};

export default Contact;
