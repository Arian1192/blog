import { Logo } from "../Atoms/Logo";
import { HomeIcon } from "../Atoms/HomeIcon";
// import LanguageSelector from "../Molecules/LanguageSelector";

export const Navbar = () => {
  return (
    <header className="w-full flex justify-between md:justify-around items-center h-auto p-5 mb-12">
      <Logo />
      <div className="flex gap-5">
        {/* <LanguageSelector /> */}
        <HomeIcon path="/" />
      </div>
    </header>
  );
};
