import Link from "next/link";

export interface LinkProps {
  link: string;
  name: string;
  component: JSX.Element;
}

export const LinkItem = ({ link, name, component }: LinkProps) => {
  return (
    <Link
      href={link}
      className="flex justify-start items-start gap-2  p-2 transition opacity-50 hover:opacity-100"
    >
      {component}
    </Link>
  );
};
