import { NextRequest, NextResponse } from "next/server";
import langParser from "accept-language-parser";

const defaultLocale = "es-ES";  // esto no deberia ser un string sino el resultado de una funcion que obtenga el locale del navegador
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

  if (pathname.match(/\/(assets|public|_next|img)\//)) {
    return NextResponse.next();
  }


  const defaultLocaleParts = getLocalePartsFrom({ locale: defaultLocale });
  const currentPathnameParts = getLocalePartsFrom({ pathname });

  // Check if the default locale is in the pathname
  if (
    currentPathnameParts.lang === defaultLocaleParts.lang &&
    currentPathnameParts.country === defaultLocaleParts.country
  ) {
    // we want to REMOVE the default locale from the pathname,
    // and later use a rewrite so that Next will still match
    // the correct code file as if there was a locale in the pathname
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${defaultLocaleParts.lang}/${defaultLocaleParts.country}`,
          pathname.startsWith("/") ? "/" : ""
        ),
        request.url
      )
    );

    


  }
  
  const pathnameIsMissingValidLocale = locales.every((locale) => {
    const localeParts = getLocalePartsFrom({ locale });
    return !pathname.startsWith(`/${localeParts.lang}/${localeParts.country}`);
  });

  if (pathnameIsMissingValidLocale) {
    // rewrite it so next.js will render `/` as if it was `/es/us` 
    return NextResponse.rewrite(
      new URL(
        `/${defaultLocaleParts.lang}/${defaultLocaleParts.country}${pathname}`,
        request.url
      )
    );
  }
}



  


  
  
  export const config = {
      matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)",],
    };