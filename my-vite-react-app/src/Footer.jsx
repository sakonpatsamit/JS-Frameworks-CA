const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white p-2 fixed bottom-0 w-full text-xs">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <p className="text-center">
            © {new Date().getFullYear()} by Sakon Patsamit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
