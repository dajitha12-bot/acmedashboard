import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2 bg-gray-50">
      <FaceFrownIcon className="w-16 text-gray-400" />
      <h2 className="text-2xl font-semibold text-gray-800">404 Not Found</h2>
      <p className="text-gray-600">The page you are looking for does not exist.</p>
      <Link
        href="/dashboard"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400 shadow-sm"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}
