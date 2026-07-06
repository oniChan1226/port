const Footer = () => {
  return (
    <div className="flex items-center justify-between w-[95%] md:w-[90%] mx-auto text-neutral-500">
      <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
      <p>Made with ❤️ by Fahad Khan.</p>
    </div>
  );
};

export default Footer;
