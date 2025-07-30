const Notification = ({ message, type, onClose }) => {
  const typeStyles = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg ${typeStyles[type]} flex items-center justify-between z-50`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-lg font-semibold">
        &times;
      </button>
    </div>
  );
};

export default Notification;
