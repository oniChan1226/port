import { Github, Sparkle } from "lucide-react";

const GuestBook = () => {
  const isLoggedIn = false;

  const handleSignin = async () => {
    
  };

  return (
    <div className=" mt-16">
      <div className="justify-center items-center flex flex-col space-y-3 ">
        <div className="flex justify-center items-center text-neutral-500 space-x-1">
          <Sparkle size={18} />
          <span>Share your thoughts</span>
        </div>
        <h2
          className="text-2xl lg:text-4xl font-semibold text-transparent bg-clip-text"
          style={{ backgroundImage: "linear-gradient(to bottom, var(--text-base), var(--color-neutral-400))" }}
        >
          Sign my Guestbook
        </h2>
        <p className="text-neutral-500 text-center text-sm lg:text-md  lg:text-start">
          Share your thoughts, feedback, or just say hi!
        </p>
      </div>
      <div className="mt-12">
        <div className="border border-neutral-800 rounded-md py-8 flex items-center flex-col justify-center space-y-2">
          {isLoggedIn ? (
            "Showing"
          ) : (
            <>
              <h2 className="text-neutral-400/80">
                Sign in to leave a comment
              </h2>
              <button 
              onClick={handleSignin}
              className="flex items-center justify-center space-x-1 bg-primary hover:opacity-70 cursor-pointer duration-400 px-5 py-2 rounded-md">
                <Github size={20} />
                <span>Sign in with Github</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestBook;
