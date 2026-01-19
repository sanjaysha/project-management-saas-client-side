export default function Input({
  label,
  type = "text",
  placeholder,
  error,
  register,
  value,
  onChange,
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...register}
        className={`
          w-full rounded-lg border px-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      />

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
