

import clientPromise from "@/lib/mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'



const admin=['daniel.speranskiy@gmail.com']

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
     session: ({ session, token, user }) => {
     if(admin.includes(session?.user?.email)){
      return session
     } else {
      return redirect('/')
     }
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


export async function isAdmin(req, res) {
  const session = await getServerSession( authOptions);
  if(admin.includes(session?.user?.email)){
    return true
  } else {
    throw new Error('Unauthorized')
   
  }
}