export default function Badge({
  children,
  variant = "default",
}) {
  const variants = {
    default: "bg-gray-100 text-gray-700",

    primary: "bg-blue-100 text-blue-700",

    success: "bg-green-100 text-green-700",

    warning: "bg-yellow-100 text-yellow-700",

    danger: "bg-red-100 text-red-700",

    purple: "bg-purple-100 text-purple-700",

    outline:
      "border border-gray-300 text-gray-700 bg-white",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
}