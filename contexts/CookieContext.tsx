// "use client"

// import { createContext, useContext, useEffect, useLayoutEffect } from "react";
// import { setCookie, getCookie, getCookies } from "cookies-next";
// import { CookieValueTypes, TmpCookiesObj } from "cookies-next/lib/types";

// type CookiesContextType = {
//   cookiesAllGetter: () => TmpCookiesObj;
//   cookieGetter: (cookieName: string) => CookieValueTypes;
//   cookieSetter: (cookieName: string, cookieValue: string) => void;
// };

// export const CookieContext = createContext<CookiesContextType | null>(null);

// export const CookieContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {

//   const cookiesAllGetter = () => {
//     const cookies = getCookies();
//     return cookies;
//   };

//   const cookieGetter = (cookieName: string): CookieValueTypes => {
//     const cookie = getCookie(cookieName);
//     return cookie;
//   };

//   const cookieSetter = (cookieName: string, cookieValue: string) => {
//     console.log("Hola desde el Contexto")
//     setCookie(cookieName, cookieValue);
//   };


//   const value = {
//     cookiesAllGetter,
//     cookieGetter,
//     cookieSetter,
//   };

// useLayoutEffect(() =>{
//   const cookies = cookiesAllGetter()
//   if(!cookies.NEXT_LOCALE){
//     setCookie("NEXT_LOCALE", "en-US")
//   }
// },[])

//   return (
//     <CookieContext.Provider value={value}>{children}</CookieContext.Provider>
//   );
// };

// export const useCookieContext = () => {
//   const context = useContext(CookieContext);
//   if (!context)
//     throw new Error(
//       "useCookieContext must be used within a CookieContextProvider"
//     );
//   return context;
// };
