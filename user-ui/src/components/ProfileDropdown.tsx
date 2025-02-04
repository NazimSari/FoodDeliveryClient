"use client";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import AuthScreen from "../screens/AuthScreen";

const ProfileDropdown = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [open, setOpen] = useState(false);

  const FixedDropdownItem = DropdownItem as any;
  const FixedIcon = CgProfile as any;

  return (
    <div className="flex items-center gap-4">
      {signedIn ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="transition-transform"
              src="https://next-blog-front-gold.vercel.app/img/Monkey-icon.png"
            />
          </DropdownTrigger>
          <DropdownMenu arial-label="Profile Actions" variant="flat">
            <FixedDropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">digitaslistway@gmail.com</p>
            </FixedDropdownItem>
            <FixedDropdownItem key="settings">My Profile</FixedDropdownItem>
            <FixedDropdownItem key="all_orders">All Orders</FixedDropdownItem>
            <FixedDropdownItem key="apply_account">
              Apply For Seller Account
            </FixedDropdownItem>
            <FixedDropdownItem key="logout" color="danger">
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
      {open && <AuthScreen />}
    </div>
  );
};

export default ProfileDropdown;
