import React from "react";
import Link from "next/link";
import { Facebook,Linkedin,
Github } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t mt-10">
      <div className="p-5 flex justify-center lg:justify-start">
        <h2 className="logo2">
          Pet<span className="text-red-500">Plus</span>+
        </h2>
      </div>
      <div className=" p-5 flex justify-between  ">
        <div className="flex gap-2 flex-col items-start">
          <Link href="/terms" className="hover:underline">
            Terms and Conditions
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/careers" className="hover:underline">
            Careers
          </Link>
          <Link href="/help" className="hover:underline">
            Help Center
          </Link>
        </div>
        <div className="flex gap-2 flex-col items-end">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>

      <div className="p-5 flex justify-center items-center gap-2">
        <div className="p-2 flex justify-center items-center bg-[#206ef6] hover:bg-[#1957c1] rounded-full cursor-pointer">
          <Link
            href="https://www.facebook.com/daniel.speranskiy1"
            target="_blank"
          >
            <Facebook className="text-white" />
          </Link>
        </div>
        <div className="p-2 flex justify-center items-center bg-[#206ef6] hover:bg-[#1957c1] rounded-full cursor-pointer">
          <Link
            href="https://www.linkedin.com/in/daniil-speranskii/"
            target="_blank"
          >
            <Linkedin className="text-white" />
          </Link>
        </div>
        <div className="p-2 flex justify-center items-center bg-[#206ef6] hover:bg-[#1957c1] rounded-full cursor-pointer">
          <Link href="https://github.com/Danieldo1" target="_blank">
            <Github className="text-white" />
          </Link>
        </div>
      </div>

      <div className=" p-5 flex justify-center">
        <p className="text-gray-600">© {year} E-Depo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
