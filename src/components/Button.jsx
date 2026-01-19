export default function Button({
  children,
  loading = false,
  onClick,
  type = "button", // THIS FIXES THE BUG
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="
        w-full bg-indigo-600 text-white rounded-lg py-2 text-sm
        font-medium hover:bg-indigo-700 transition disabled:opacity-60
      "
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
