import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('neja_token')?.value;

  if (PUBLIC_ROUTES.includes(pathname)) {
    if (token) return NextResponse.redirect(new URL('/dashboard', request.url));
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
