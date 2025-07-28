import { useForm } from "react-hook-form";

const ContactForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm();
  const sendMessage = async (data) => {
    console.log(data);
  };

  return (
    <div className="bg-primary border border-neutral-800 rounded-md p-5">
      <div>
        <h2 className="font-semibold lg:text-lg">Send a message</h2>
        <p className="text-neutral-500 text-sm lg:text-md">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>
      <form onSubmit={handleSubmit(sendMessage)} className="mt-6 space-y-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col items-start w-full space-y-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              required
              className="border border-neutral-800/80 w-full rounded-md px-3 py-1 text-sm focus:outline-none focus:border-neutral-800 focus:shadow-xs shadow-neutral-800 "
            />
          </div>
          <div className="flex flex-col items-start w-full space-y-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
              className="border border-neutral-800/80 w-full rounded-md px-3 py-1 text-sm focus:outline-none focus:border-neutral-800 focus:shadow-xs shadow-neutral-800 "
            />
          </div>
          <div className="flex flex-col items-start space-y-1 lg:col-span-2">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              placeholder="Enter your message"
              required
              className=" border border-neutral-800/80 w-full rounded-md px-3 py-1 text-sm focus:outline-none focus:border-neutral-800 focus:shadow-xs shadow-neutral-800 min-h-36 "
            ></textarea>
          </div>
        </div>
        <button className="w-full bg-neutral-700/40 transition-colors duration-300 cursor-pointer hover:text-white/70 hover:bg-neutral-700/30 rounded-md py-2 font-semibold">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
