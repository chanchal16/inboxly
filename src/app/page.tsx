"use client";
import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  console.log("user", user);
  useEffect(() => {
    const storeUser = async () => {
      if (isSignedIn && user) {
        try {
          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: {
                emailAddresses: user.emailAddresses,
                firstName: user.firstName,
                lastName: user.lastName,
              },
            }),
          });

          if (response.ok) {
            console.log("User stored in MongoDB");
          } else {
            const error = await response.json();
            console.error("Failed to store user:", error);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };

    storeUser();
  }, [isSignedIn, user]);

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-10 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="bg-gradient-to-r text-center from-gray-600 font-bold text-6xl to-gray-900 inline-block text-transparent bg-clip-text">
        The minimalistic, <br />
        AI-powered email client.
      </h1>
      <div className="h-3"></div>
      <p className="text-xl mb-6 text-gray-600 max-w-xl text-center">
        Inboxly is a minimalistic, AI-powered email client that empowers you to
        manage your email with ease.
      </p>
      <div className="flex items-center space-x-4 mb-10">
        <Link href="/sign-in" className="text-lg hover:underline">
          Sign In
        </Link>
        <Link href="/sign-up" className="text-lg hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}