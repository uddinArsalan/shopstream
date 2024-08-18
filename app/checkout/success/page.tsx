import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function PaymentSuccess() {

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Payment Successful
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Thank you for your purchase. Your order has been processed successfully.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}