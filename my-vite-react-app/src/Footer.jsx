const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white p-4">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center items-center">
          <p className="text-sm text-center">
            © {new Date().getFullYear()} by Sakon Patsamit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
