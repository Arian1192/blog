import { NextRequest, NextResponse } from "next/server";
import langParser from "accept-language-parser";
import {parse as parseCookie} from "cookie";
import { parse } from "path";

let defaultLocale = "es-ES";  // esto no deberia ser un string sino el resultado de una funcion que obtenga el locale del navegador
let locales = ["es-Es","en-US" ];

type PathnameLocale = {
  pathname: string;
  locale?: never;
};

type ISOLocale = {
  pathname?: never;
  locale: string;
};

type LocaleSource = PathnameLocale | ISOLocale;

// ------------------------------------------- Functions  ------------------------------
const findBestMatchingLocale = (acceptLangHeader: string) => {
  // parse the locales acceptable in the header, and sort them by priority (q)
  const parsedLangs = langParser.parse(acceptLangHeader);

  // find the first locale that matches a locale in our list
  for (let i = 0; i < parsedLangs.length; i++) {
    const parsedLang = parsedLangs[i];
    // attempt to match both the language and the country
    const matchedLocale = locales.find((locale) => {
      const localeParts = getLocalePartsFrom({ locale });
      return (
        parsedLang.code === localeParts.lang &&
        parsedLang.region === localeParts.country
      );
    });
    if (matchedLocale) {
      return matchedLocale;
    }
    // if we didn't find a match for both language and country, try just the language
    else {
      const matchedLanguage = locales.find((locale) => {
        const localeParts = getLocalePartsFrom({ locale });
        return parsedLang.code === localeParts.lang;
      });
      if (matchedLanguage) {
        return matchedLanguage;
      }
    }
  }
  // if we didn't find a match, return the default locale
  return defaultLocale;
};


const getLocalePartsFrom = ({ pathname, locale }: LocaleSource) => {
  if (locale) {
    const localeParts = locale.toLowerCase().split("-");
    return {
      lang: localeParts[0],
      country: localeParts[1],
    };
  } else {
    const pathnameParts = pathname!.toLowerCase().split("/");
    return {
      lang: pathnameParts[1],
      country: pathnameParts[2],
    };
  }
};
// ------------------------------------------- Functions end  ------------------------------

// ------------------------------------------- Middleware
export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Saltamos cualquier ruta que este dentro de assets,
    if (pathname.match(/\/(assets|public|_next|img)\//)) {
    return NextResponse.next();
  }
    const defaultLocaleParts = getLocalePartsFrom({ locale: defaultLocale });
    // console.log(defaultLocaleParts, " Estas son las partes del locale por defecto")
    // const cookies = parseCookie(request.headers.get("Cookie") || "")
    // const localeCookie = cookies.NEXT_LOCALE;
    const currentPathnameParts = getLocalePartsFrom({ pathname });

    // if (localeCookie){
    //   const localeCookiesParts = getLocalePartsFrom({ locale: localeCookie });
    //   if(localeCookiesParts.lang !== currentPathnameParts.lang){
    //     return NextResponse.rewrite(
    //       new URL(
    //         `/${localeCookiesParts.lang}/${localeCookiesParts.country}${pathname}`,
    //         request.url
    //       )
    //     );
    //   }else{
    //     return NextResponse.next();
    //   }
    // }
    const pathnameIsMissingValidLocale = locales.every((locale) => {
      
        const localeParts = getLocalePartsFrom({ locale });
        return !pathname.startsWith(`/${localeParts.lang}/${localeParts.country}`);
      })
    
      if (pathnameIsMissingValidLocale) {
        const matchedLocale = findBestMatchingLocale(
          request.headers.get("Accept-Language") || defaultLocale
        );
    
        console.log(matchedLocale , " este es el locale del navegador")
        if (matchedLocale !== defaultLocale) {
          const matchedLocaleParts = getLocalePartsFrom({ locale: matchedLocale });
          return NextResponse.redirect(
            new URL(
              `/${matchedLocaleParts.lang}/${matchedLocaleParts.country}${pathname}`,
              request.url
            )
          );
        } else {
          return NextResponse.rewrite(
            new URL(
              `/${defaultLocaleParts.lang}/${defaultLocaleParts.country}${pathname}`,
              request.url
            )
          );

        }
      }
    
  }



  


  
  
  export const config = {
      matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)",],
    };