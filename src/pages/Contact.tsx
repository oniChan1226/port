import { useState } from "react";
import PageTitle from "../components/PageTitle";
import Tooltip from "../components/Tooltip";
import { myWorkEmail } from "../constants/constants";
import { Calendar, Check, Copy } from "lucide-react";
import CalendlyPopup from "../components/CalendlyPopup";
import ContactForm from "../components/ContactForm";
import JoinReader from "../components/JoinReader";

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
      <div className="mt-12 space-y-8">
        <ContactForm />
        <JoinReader />
      </div>
    </div>
  );
};

export default Contact;
