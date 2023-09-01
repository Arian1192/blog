// "use client";
// import { CookieContext, useCookieContext } from "@/contexts/CookieContext";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const LanguageSelector = () => {
//   const [locale, setLocale] = useState("en-US");
//   const { cookieGetter, cookieSetter } = useCookieContext();

//   useEffect(() => {
//     const cookies = cookieGetter("NEXT_LOCALE");
//     if (cookies) {
//       setLocale(cookies);
//     }
//   }, []);

//   const handleClick = (cookieName: string, cookieValue: string) => {
//     setLocale(cookieValue);
//     console.log("Hola desde el selector de idiomas");
//     cookieSetter(cookieName, cookieValue);
//   };

//   return (
//     <>
//       {locale === "en-US" ? (
//         <Link href={"/"} onClick={() => handleClick("NEXT_LOCALE", "es-ES")}>ES</Link>
//       ) : (
//         <Link href={"/"} onClick={() => handleClick("NEXT_LOCALE", "en-US")}>EN</Link>
//       )}
//     </>
//   );
// };

// export default LanguageSelector;
