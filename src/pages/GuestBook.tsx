import { Github, Sparkle } from "lucide-react";

const GuestBook = () => {
  const isLoggedIn = false;

  const handleSignin = async () => {
    
  };

  return (
    <div className=" mt-16">
      <div className="justify-center items-center flex flex-col space-y-3 ">
        <div className="flex justify-center items-center text-sm font-semibold text-neutral-500 space-x-1">
          <Sparkle size={18} />
          <span>Share your thoughts</span>
        </div>
        <h1
          className="text-3xl lg:text-5xl font-semibold tracking-wide leading-tight text-transparent bg-clip-text"
          style={{ backgroundImage: "linear-gradient(to bottom, var(--text-base), var(--color-neutral-400))" }}
        >
          Sign my Guestbook
        </h1>
        <p className="text-neutral-400/90 text-center text-base lg:text-lg lg:text-start">
          Share your thoughts, feedback, or just say hi!
        </p>
      </div>
      <div className="mt-12">
        <div className="border border-neutral-800 rounded-md py-8 flex items-center flex-col justify-center space-y-2">
          {isLoggedIn ? (
            "Showing"
          ) : (
            <>
              <p className="text-sm text-neutral-500">
                Sign in to leave a comment
              </p>
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
