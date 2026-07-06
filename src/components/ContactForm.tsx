import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactFormSchema,
  type ContactFormType,
} from "../interfaces/ContactForm";

const ContactForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<ContactFormType>({
    resolver: zodResolver(ContactFormSchema),
  });
  const sendMessage = async (data: ContactFormType) => {
    console.log(data);
  };
  return (
    <div className="bg-primary border border-neutral-800 rounded-md p-5">
      <div>
        <h2 className="text-lg font-semibold">Send a message</h2>
        <p className="text-neutral-500 text-sm lg:text-base">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>
      <form onSubmit={handleSubmit(sendMessage)} className="mt-6 space-y-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col items-start w-full space-y-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter your name"
              required
              className="border border-neutral-800/80 w-full rounded-md px-3 py-1 text-sm focus:outline-none focus:border-neutral-800 focus:shadow-xs shadow-neutral-800 "
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start w-full space-y-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              required
              className="border border-neutral-800/80 w-full rounded-md px-3 py-1 text-sm focus:outline-none focus:border-neutral-800 focus:shadow-xs shadow-neutral-800 "
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start space-y-1 lg:col-span-2">
            <label htmlFor="message">Message</label>
            <textarea
              {...register("message")}
              placeholder="Enter your message"
              required
              className=" border border-neutral-800/80 w-full rounded-md px-3 py-1 text-sm focus:outline-none focus:border-neutral-800 focus:shadow-xs shadow-neutral-800 min-h-36 "
            ></textarea>
            {errors.message && (
              <p className="text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={!isDirty}
          className="w-full bg-neutral-700/40 transition-colors duration-300 cursor-pointer hover:opacity-70 hover:bg-neutral-700/30 rounded-md py-2 font-semibold"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
