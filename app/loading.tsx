export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-gray-800"></div>
        <p className="mt-4 text-gray-700 text-sm font-semibold">Loading...</p>
      </div>
    </div>
  );
}