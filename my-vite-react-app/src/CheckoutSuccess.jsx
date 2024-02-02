import { useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold text-center text-gray-800">
        Thank you for your purchase!
      </h1>
      <p className="mt-2 text-center text-gray-600">
        Your transaction has been completed successfully.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default CheckoutSuccess;
