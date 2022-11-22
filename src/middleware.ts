import { NextResponse, NextRequest } from 'next/server'
const basePath = '/mwra-vis' // TODO see if this can DRY up with next.config file
export const middleware = (request: NextRequest) => {
  const { pathname } = new URL(request.url)
  if (pathname === '/') {
    return NextResponse.redirect(new URL(basePath, request.url))
  }
  return NextResponse.next()
}
