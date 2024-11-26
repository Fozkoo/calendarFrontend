import { useState } from "react";
import imgLogo from "..//assets/Images/mujer.png";
import LogoutComponent from "./LogoutComponent";

interface HeaderProps {
  name: string | null;
  toggleMenu: () => void;
}

export const Header = ({ name, toggleMenu }: HeaderProps) => {
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const handleProfileClick = () => {
    setShowLogoutMenu((prev) => !prev); 
  };

  return (
    <>
      <header className="bg-white px-8 flex justify-between items-center h-[100px]  max-2xl:h-[60px]">
        <nav className="main-menu gap-5 flex h-full items-center">
          <button
            className="cursor-pointer text-5xl bi bi-list max-2xl:text-3xl"
            onClick={toggleMenu}
          ></button>
          <h1 className="text-3xl font-normal max-2xl:text-xl">Klendar</h1>
        </nav>

        <aside className="user-info flex h-full gap-5 items-center ">
          <h2 className="text-3xl hidden font-normal max-2xl:text-xl ">{name ? name : "User"}</h2>
          <h2 className="text-3xl font-normal max-2xl:hidden">¡Welcome back {name ? name : "User"}!</h2>
          <img
            src={imgLogo}
            alt="Profile Picture"
            className="border-[3px] cursor-pointer border-green-500 w-14 h-14 rounded-full max-2xl:h-10 max-2xl:w-10"
            onClick={handleProfileClick}
          />
        </aside>

        <LogoutComponent show={showLogoutMenu} />
      </header>
    </>
  );
};
