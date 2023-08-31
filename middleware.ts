import { NextRequest, NextResponse } from "next/server";

const defaultLocale = "es-ES"; 
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

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Saltamos cualquier ruta que este dentro de assets,
    if (pathname.match(/\/(assets|public|_next|img)\//)) {
    return NextResponse.next();
  }
    const defaultLocaleParts = getLocalePartsFrom({ locale: defaultLocale });
    const currentPathnameParts = getLocalePartsFrom({ pathname });
  
 
    if (
      currentPathnameParts.lang === defaultLocaleParts.lang &&
      currentPathnameParts.country === defaultLocaleParts.country
    ) {

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