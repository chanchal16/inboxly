import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="bg-gradient-to-r text-center from-gray-600 font-bold text-6xl to-gray-900 inline-block text-transparent bg-clip-text">
        The minimalistic, <br />
        AI-powered email client.
      </h1>
      <div className="h-4"></div>
      <p className="text-xl mb-8 text-gray-600 max-w-xl text-center">
        Inboxly is a minimalistic, AI-powered email client that empowers you to
        manage your email with ease.
      </p>
      <div className="flex items-center space-x-4 mb-10">
        <Link href="/sign-in" className="text-sm hover:underline">
          Sign In
        </Link>
        <Link href="/sign-up" className="text-sm hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}