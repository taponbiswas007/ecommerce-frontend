export default function OrderSuccess() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        ✅ Order Placed Successfully!
      </h1>
      <p className="mb-6">Thank you for your order. We’ll contact you soon.</p>
      <a
        href="/"
        className="inline-block bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
      >
        Back to Home
      </a>
    </div>
  );
}
