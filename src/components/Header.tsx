import {
  useUser,
  useClerk,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, isLoaded } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoaded) {
    return (
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">Завантаження...</div>
      </header>
    );
  }

  return (
    <header className="border-b border-(--border)">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <h1>CodeCraft</h1>
        </Link>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-5 py-2 text-sm dark:text-white font-medium border rounded-lg hover:border-black hover:text-white hover:bg-gray-900 dark:hover:bg-gray-950 transition duration-300">
                Увійти
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="btn-hover-effect px-5 py-2 text-sm font-medium bg-(--text-h) dark:bg-white text-white dark:text-black rounded-lg">
                Зареєструватися
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 rounded-full transition-all frame"
              >
                <img
                  src={user?.imageUrl}
                  alt={user?.fullName || "User"}
                  className="w-9 h-9 rounded-full object-cover border border-gray-700"
                />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-72 not-dark:bg-(--bg) dark:bg-[#030412] rounded-2xl shadow-xl border not-dark:border-gray-400 dark:border-gray-700 py-2 z-50 overflow-hidden">
                  <div className="px-4 py-4 border-b not-dark:border-gray-400 dark:border-gray-700 flex gap-3">
                    <img
                      src={user?.imageUrl}
                      alt=""
                      className="w-11 h-11 rounded-full"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold truncate text-left">
                        {user?.fullName || user?.firstName || "Користувач"}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link to="/dashboard">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 not-dark:hover:bg-gray-200 dark:hover:bg-gray-900 flex items-center gap-3 text-sm"
                      >
                        Мої пости
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        setIsOpen(false);
                        openUserProfile();
                      }}
                      className="w-full text-left px-4 py-3 not-dark:hover:bg-gray-200 dark:hover:bg-gray-900 flex items-center gap-3 text-sm"
                    >
                      Управління акаунтом
                    </button>

                    <button
                      onClick={() => {
                        setIsOpen(false);
                        signOut({ redirectUrl: "/" });
                      }}
                      className="w-full text-left px-4 py-3 not-dark:hover:bg-gray-200 dark:hover:bg-gray-900 flex items-center gap-3 text-sm text-red-600"
                    >
                      Вийти з акаунту
                    </button>
                  </div>
                </div>
              )}
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
