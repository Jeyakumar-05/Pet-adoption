const RouteLoading = ({ message = "Checking your session..." }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-orange-100 bg-white shadow-lg p-6 text-center">
        <div className="mx-auto mb-4 relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-orange-100" />
          <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Loading</h2>
        <p className="mt-1 text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default RouteLoading;
