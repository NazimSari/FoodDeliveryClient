import styles from "@/src/utils/style";
import { Avatar } from "@heroui/avatar";
import React from "react";
import NavItems from "../NavItems";
import ProfileDropdown from "../ProfileDropdown";

const Header = () => {
  return (
    <header className="w-full  bg-[#0f1524]">
      <div className="w-[90%] h-[80px] m-auto flex items-center justify-between">
        <h1 className={`${styles.logo}`}>
          Digitalist<span className="text-purple-300">Way</span>
        </h1>
        <NavItems activeItem={1} />
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
