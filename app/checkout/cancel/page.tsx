'use server'
import Link from 'next/link';
import { XCircleIcon } from '@heroicons/react/24/solid';

export default function PaymentCanceled() {
  return(
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <XCircleIcon className="mx-auto h-16 w-16 text-red-500" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Payment Canceled
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Your payment was not processed. If you experienced any issues, please try again or contact our support team.
        </p>
        <div className="mt-8 space-y-4">
          <Link
            href="/cart"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Return to Cart
          </Link>
          <div>
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}