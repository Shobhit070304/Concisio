import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const goHome = () => navigate("/");
  const goBack = () => navigate(-1);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-8">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 to-amber-100" />
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(17,24,39,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,24,39,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.2
        }}
      />

      {/* Content */}
      <div className="flex justify-center items-center w-full max-w-md mx-auto">
        <div className="relative text-center bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-amber-100">
        <h1 className="text-5xl sm:text-6xl font-bold text-amber-600 mb-3 sm:mb-4">404</h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-sm sm:text-base text-amber-800/80 mb-6 sm:mb-8">
          Sorry, the page you are looking for does not exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={goBack}
            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-700 text-white text-sm sm:text-base rounded-lg hover:bg-gray-600 transition shadow-sm hover:shadow-md"
          >
            Go Back
          </button>
          <button
            onClick={goHome}
            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-amber-600 text-white text-sm sm:text-base rounded-lg hover:bg-amber-700 transition shadow-sm hover:shadow-md"
          >
            Go to Homepage
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default NotFound;