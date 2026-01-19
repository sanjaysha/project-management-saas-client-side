export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          {title}
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">{subtitle}</p>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
