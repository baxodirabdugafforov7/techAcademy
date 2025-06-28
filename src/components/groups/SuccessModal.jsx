import React, { useEffect } from "react";

const SuccessModal = ({
  title = "Success",
  message = "Operation completed successfully.",
  onClose,
  onReturn,
}) => {
  // Allow ESC to close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity">
      <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[90%] max-w-sm animate-fade-in">
        <h2 className="text-xl font-bold text-green-700 mb-2">{title}</h2>
        <p className="text-sm text-gray-600">{message}</p>

        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Close
          </button>
          <button
            onClick={onReturn}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Go to Groups
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
