import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

import { FaTimes } from "@/utils/icons";
import { Button } from "./ui/button";

interface SignInProps {
  toggleSignIn: () => void;
}

const SignIn: React.FC<SignInProps> = ({ toggleSignIn }) => {
  return (
    <div className="relative bg-white text-darkBlue w-full max-w-[550px] m-auto h-[70vh] flex flex-col justify-center items-center rounded-2xl shadow-2xl ">
      <div className="absolute top-5 right-7 border rounded-full p-2 cursor-pointer hover:bg-slate-100/45">
        {" "}
        <FaTimes onClick={toggleSignIn} size={32} />
      </div>
      <h1 className="text-center mt-8">Sign in</h1>
      <div className="mt-4 p-4 flex flex-col items-center justify-center gap-4">
        <Button
          onClick={() => signIn("github")}
          className="flex items-center border p-4 rounded-lg gap-4 hover:bg-slate-100/45 transition">
          <span>
            <Image
              src={"/static/images/github-logo.svg"}
              width={30}
              height={30}
              alt="GitHub Logo"
            />
          </span>
          Sign In With GitHub
        </Button>

        <Button
          onClick={() => signIn("google")}
          className="flex items-center border p-4 rounded-lg gap-4 hover:bg-slate-100/25 transition">
          <span>
            <Image
              src={"/static/images/google-logo.svg"}
              width={30}
              height={30}
              alt="Google Logo"
            />
          </span>
          Sign In With Google
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
