import axios from "axios";
import { BASE_URL } from "config";
import NextAuth from "next-auth";
import { session } from "next-auth/client";
import Providers from "next-auth/providers";

export default NextAuth({
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    // A secret to use for key generation - you should set this explicitly
    // Defaults to NextAuth.js secret if not explicitly specified.
    // This is used to generate the actual signingKey and produces a warning
    // message if not defined explicitly.
    // secret: "INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw",
    // You can generate a signing key using `jose newkey -s 512 -t oct -a HS512`
    // This gives you direct knowledge of the key used to sign the token so you can use it
    // to authenticate indirectly (eg. to a database driver)
  },
  callbacks: {
    async signIn(user, account, profile) {
      if (account?.provider === "google") {
        console.log("Google token", account?.accessToken);
        if (account?.accessToken) {
          const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000";
          const res = await axios.post(`${BASE_URL}/google-authentication`, {
            token: account?.accessToken,
          });
          const data = res.data;
          console.log("Google profile", data);
          user.name = data.user.username;
          user.access_token = data.user.access_token;
        }
      }

      return true;
    },
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    async jwt(token, user, account, profile, isNewUser) {
      if (user?.access_token) {
        token.access_token = user.access_token;
      }
      if (user?.username) {
        token.username = user.username;
      }
      return token;
    },
    async session(_, token) {
      const access_token = token.access_token;
      // Add access_token to the token right after signin
      return { ..._, access_token };
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/",
  },

  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await axios.post(`${BASE_URL}/auth/login`, {
          username: credentials.username,
          password: credentials.password,
        });
        const user = res.data.user;
        user.name = res.data.user.username;
        user.image = res.data.user.avatar?.url;
        user.access_token = res.data.user.access_token;
        // If no error and we have user data, return it
        if (res.status === 201 && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
});
