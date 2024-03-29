import { Montserrat, Kanit } from "next/font/google";
import "../globals.css";
import SessionWrapper from "../../components/SessionWrapper";
import Nav from "@/components/shop/Nav";
import CartWrapper from "@/components/shop/CartWrapper";
import Footer from "@/components/shop/Footer";

const mont = Montserrat({ subsets: ["latin"] });
const protest = Kanit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-protest",
});

export const metadata = {
  title: "E-Depo Storefront",
  description: "A genereic storefront for an e-commerce platform",
};

export default function RootLayout({ children, session }) {
  return (
    <SessionWrapper session={session} >
      <CartWrapper>
      <html lang="en">
        <body
          className={`${mont.className} ${protest.variable}  bg-[#fafafa] w-screen h-[100vh] `}
        >
          <div className="overflow-hidden ">
            <Nav  />
          </div>
          {children}
          <Footer />
        </body>
      </html>
      </CartWrapper>
    </SessionWrapper>
  );
}
