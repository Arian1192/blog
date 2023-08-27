"use client";
import { LinkItem as SocialLink } from "../Atoms/LinkItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const ListLinks = () => {
  const socialLinks = [
    {
      name: "X",
      link: "https://x.com/Arcoro1992",
      component: (
        <FontAwesomeIcon
          icon={faXTwitter}
          style={{ color: "white", fontSize: 24 }}
        />
      ),
    },
    {
      name: "Github",
      link: "https://github.com/Arian1192",
      component: (
        <FontAwesomeIcon
          icon={faGithub}
          style={{ color: "white", fontSize: 24 }}
        />
      ),
    },
    {
      name: "Linkedin",
      link: "https://www.linkedin.com/in/ariancollaso/",
      component: (
        <FontAwesomeIcon
          icon={faLinkedin}
          style={{ color: "white", fontSize: 24 }}
        />
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col gap-5 justify-center items-center">
      <p className="text-2xl font-bold text-white text-center">Social Links</p>
      <ul className="">
        {socialLinks.map((link) => {
          return (
            <li key={link.name} className="m-3 cursor-pointer">
              <SocialLink
                link={link.link}
                name={link.name}
                component={link.component}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
