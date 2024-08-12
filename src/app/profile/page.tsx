"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();
  const [data, setData] = React.useState<any>("nothing");
  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast({
        title: "Logout",
        description: "Logout successfully",
      });

      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("api/users/me");
    console.log(response.data);
    setData(response.data.data._id);
  };

  return (
    <div className="flex h-screen justify-center items-center ">
      <div className="w-96 flex flex-col justify-center items-center rounded-md gap-2 py-3 border">
        <h2>Profile</h2>
        <hr />
        <h2>Profile page</h2>
        <h2>
          {data === "nothing" ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>
        <hr />
        <Button onClick={logout}>Logout</Button>
        <Button onClick={getUserDetails}>getUserDetails</Button>
      </div>
    </div>
  );
};

export default Profile;
