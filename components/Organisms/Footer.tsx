import { ListLinks } from "../Molecules/ListLinks";

export const Footer = () => {
  return (
    <div className="w-full flex-col bg-black p-10">
      <ListLinks />
      <div className="w-full">
        <p className="text-white text-center">
          Made with <span className="text-red-500">❤</span> by Arian Collaso
        </p>
      </div>
    </div>
  );
};
