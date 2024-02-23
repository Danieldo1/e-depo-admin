

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
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.username;
        const password = credentials?.password;
       await connectDB();
        const user = await Person.findOne({ email });
        if (user && user.password === password) {
          return user;
        }
        if(!user){
          throw new Error('User not found')
        }
        if(user.password !== password){
          throw new Error('Incorrect password')
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,

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