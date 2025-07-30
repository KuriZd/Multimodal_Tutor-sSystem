const Spinner = ({ size = "medium" }) => {
  const sizes = {
    small: "h-5 w-5",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-green-500 ${sizes[size]}`}
    ></div>
  );
};

export default Spinner;
