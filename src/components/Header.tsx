import imgLogo from "..//assets/Images/mujer.png";

interface HeaderProps {
  name: string;
  toggleMenu: () => void; 
}

export const Header = ({ name, toggleMenu }: HeaderProps) => {
  return (
    <>
      <header className="bg-white px-8 flex justify-between items-center h-[100px]">
        <nav className="main-menu gap-5 flex h-full items-center">
          <button
            className="cursor-pointer text-5xl bi bi-list"
            onClick={toggleMenu} 
          ></button>
          <h1 className="text-3xl font-medium">Klendar</h1>
        </nav>

        <aside className="user-info flex h-full gap-5 items-center">
          <h2 className="text-3xl font-medium">Hello {name ? name : 'User'}</h2>
          <img
            src={imgLogo}
            alt="Profile Picture"
            className="border-[3px] cursor-pointer border-green-500 w-14 h-14 rounded-full"
          />
        </aside>
      </header>
    </>
  );
}
