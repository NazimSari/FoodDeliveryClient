"use client";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import AuthScreen from "../screens/AuthScreen";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";

const ProfileDropdown = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, loading } = useUser();
  const { data } = useSession();

  const FixedDropdownItem = DropdownItem as any;
  const FixedIcon = CgProfile as any;

  useEffect(() => {
    if (!loading) {
      setSignedIn(!!user);
    }
    if (data?.user) {
      setSignedIn(true);
      addUser();
    }
  }, [loading, user, open, data]);

  const logOutHandler = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    toast.success("Log out successfully!");
    window.location.reload();
  };

  const addUser = async () => {};

  return (
    <div className="flex items-center gap-4">
      {signedIn ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="transition-transform"
              src={data?.user ? data.user.image : user.image}
            />
          </DropdownTrigger>
          <DropdownMenu arial-label="Profile Actions" variant="flat">
            <FixedDropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">
                {data?.user ? data.user.email : user.email}
              </p>
            </FixedDropdownItem>
            <FixedDropdownItem key="settings">My Profile</FixedDropdownItem>
            <FixedDropdownItem key="all_orders">All Orders</FixedDropdownItem>
            <FixedDropdownItem key="apply_account">
              Apply For Seller Account
            </FixedDropdownItem>
            <FixedDropdownItem
              key="logout"
              color="danger"
              onClick={logOutHandler}
            >
              Log Out
            </FixedDropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <FixedIcon
          className="text-2xl cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      )}
      {open && <AuthScreen setOpen={setOpen} />}
    </div>
  );
};

export default ProfileDropdown;
