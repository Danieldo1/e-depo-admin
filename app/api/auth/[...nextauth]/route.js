

import clientPromise from "@/lib/mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/connectDB"
import { Person} from "@/lib/models/Person"



const admin=['daniel.speranskiy@gmail.com']

export const authOptions = {
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      async authorize(credentials) {
        await connectDB();
        const user = await Person.findOne({ email: credentials.email });
        if (user.password === credentials.password) {
          return user;
        } 
        if(user.password !== credentials.password){
          return null
        }
        if(!user){
          return null
        }
       return {
         name: user.name,
         email: user.email,
       };
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,

  },
  pages: {
    signIn: "/login",
  },

  // callbacks: {
  //   session: ({ session, token, user }) => {
      
  //     if (admin.includes(session?.user?.email)) {
  //       return session;
  //     } else {
  //       return redirect("/");
  //     }
  //   },
  // },
};

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