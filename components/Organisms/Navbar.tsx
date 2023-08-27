import { Logo } from "../Atoms/Logo";
import { HomeIcon } from "../Atoms/HomeIcon";

export const Navbar = () => {
  return (
    <header className="w-full flex justify-between md:justify-around items-center h-auto p-5 mb-12">
      <Logo />
      <HomeIcon path="/" />
    </header>
  );
};
