export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const { pathname } = nextUrl

      const isProtected =
        pathname.startsWith("/adform") ||
        pathname.startsWith("/users/") ||
        (pathname.startsWith("/ads/") && pathname.endsWith("/edit"))

      if (isProtected && !isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl))
      }

      if (isLoggedIn && (pathname === "/login" || pathname === "/signup")) {
        return Response.redirect(new URL("/ads", nextUrl))
      }

      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id
      }
      return session
    },
  },
  providers: [],
}
