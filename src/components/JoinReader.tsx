import { useState } from "react";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { FaCheckCircle } from "react-icons/fa";

const JoinReader = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "subscribing" | "subscribed">(
    "idle"
  );

  const apiCall = async () => {
    return new Promise((res) => setTimeout(res, 3000));
  };

  const subscribe = async (e: any) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Email is required");
    }

    try {
      setLoading(true);
      setStatus("subscribing");
      await apiCall();
      setStatus("subscribed");
      toast.success("Thank you for Subscribing!");
      setTimeout(() => {
        setStatus("idle");
        setEmail("");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary flex flex-col lg:flex-row lg:justify-between lg:items-center px-5 py-6 space-y-3 lg:space-y-0">
      <div>
        <h2 className="font-semibold text-sm lg:text-md">Join 500+ Readers</h2>
        <p className="text-neutral-500 text-xs lg:text-sm">
          Read about authentic insights.
        </p>
      </div>

      <form
        onSubmit={subscribe}
        className="flex flex-col lg:flex-row items-center gap-2 w-full lg:w-[60%]"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-neutral-800 outline-none px-3 py-2 rounded-md w-full text-sm lg:text-md"
          placeholder="Your Email"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-12 py-2 rounded-md bg-neutral-800 cursor-pointer w-full text-sm lg:text-md flex justify-center items-center gap-2"
        >
          {status === "subscribing" ? (
            <>
              <ClipLoader color="#fff" size={16} />
              Subscribing...
            </>
          ) : status === "subscribed" ? (
            <>
              <FaCheckCircle className="text-green-400" />
              Subscribed
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
    </div>
  );
};

export default JoinReader;
