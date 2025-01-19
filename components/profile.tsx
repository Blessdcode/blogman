"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser, RiSettings5Line, FaSignInAlt, MdMail } from "@/utils/icons";

const Profile = () => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
        <FaUser className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Not Signed In</h2>
        <p className="text-gray-500 mb-4">
          Please sign in to view your profile
        </p>
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto md:my-20 my-6">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center gap-6 pb-4">
          <Avatar className="w-24 h-24">
            {session.user?.image ? (
              <AvatarImage
                src={session.user.image}
                alt={session.user?.name || "Profile picture"}
              />
            ) : (
              <AvatarFallback>
                {session.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">
              {session.user?.name || "User"}
            </h2>
            <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2">
              <MdMail className="w-4 h-4" />
              {session.user?.email || "No email provided"}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2 flex-1"
              onClick={() => {
                /* Add your settings handler */
              }}>
              <RiSettings5Line className="w-4 h-4" />
              Account Settings
            </Button>
            <Button
              variant="default"
              className="flex items-center gap-2 flex-1 bg-darkBlue text-white"
              onClick={() => signOut()}>
              <FaSignInAlt className="w-4 h-4" />
              Sign Out
            </Button>
          </div>

          <div className="border rounded-lg p-4 mt-4">
            <h3 className="font-semibold mb-2">Account Details</h3>
            <div className="space-y-2 text-sm">
              <p className="flex justify-between">
                <span className="text-gray-500">Account Status</span>
                <span className="font-medium">Active</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Member Since</span>
                <span className="font-medium">
                  {new Date().toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
