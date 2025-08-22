// "use client"
// import Link from "next/link";
// import React from "react";
// import { useRouter } from "next/navigation";


// export default function Navigation(){
    
//     const r = useRouter()

//     const handleSignupRedirect = () =>{
//         r.push('/signup')
//     }

//     const handleLoginRedirect = () =>{
//         r.push('/login')
//     }

//     return (
//         <header className="grid grid-cols-2 mt-2 ml-2 mb-2">
//             <div className="">Finance Tracker</div>
//             <nav>
//                 <ul className="flex gap-4">
//                     <li>
//                         <Link href="/">Home</Link>
//                     </li>
//                     <li>
//                         <Link href="/about">About</Link>
//                     </li>
//                     <li>
//                         <Link href="/services">Services</Link>
//                     </li>
//                     <li>
//                         <Link href="/contact">Contact</Link>
//                     </li>
//                     <li>
//                         <button
//                         onClick={handleSignupRedirect}
//                         type="submit"
//                         className="border cursor-pointer"
//                         >
//                             SignUp
//                         </button>
//                     </li>
//                     <li>
//                         <button
//                         onClick={handleLoginRedirect}
//                         type="submit"
//                         className="border cursor-pointer"
//                         >
//                             Login
//                         </button>
//                     </li>
//                 </ul>
//             </nav>
//         </header>
//     )
// }




"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navigation() {
  const r = useRouter();

  const handleSignupRedirect = () => {
    r.push("/signup");
  };

  const handleLoginRedirect = () => {
    r.push("/login");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo & Title */}
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png" // place your logo image inside public folder
            alt="Finance Tracker Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-indigo-600">
            Finance Tracker
          </span>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
            <li>
              <Link href="/" className="hover:text-indigo-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-indigo-600 transition"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-indigo-600 transition"
              >
                Contact
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignupRedirect}
                type="button"
                className="px-4 py-2 cursor-pointer border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
              >
                SignUp
              </button>
            </li>
            <li>
              <button
                onClick={handleLoginRedirect}
                type="button"
                className="px-4 py-2 cursor-pointer border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
              >
                Login
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-gray-50 border-t">
        <ul className="flex flex-col p-4 space-y-3 text-gray-700 font-medium">
          <li>
            <Link href="/" className="hover:text-indigo-600 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-indigo-600 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/services" className="hover:text-indigo-600 transition">
              Services
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-indigo-600 transition">
              Contact
            </Link>
          </li>
          <li>
            <button
              onClick={handleSignupRedirect}
              type="button"
              className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
            >
              SignUp
            </button>
          </li>
          <li>
            <button
              onClick={handleLoginRedirect}
              type="button"
              className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
            >
              Login
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

