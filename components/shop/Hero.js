import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  
  return (
    <div className="grid md:grid-cols-2 gap-5 w-full h-[60vh] md:h-[50vh] relative">
      <div className="md:hidden  absolute flex flex-col  z-10 h-full">
        <div className="bg-gradient-to-t from-[#fafafa] to-transparent w-full h-full flex justify-between flex-col">
          <h2 className="text-5xl text-gray-800 font-bold text1 md:text-4xl mb-2 lg:text-5xl">
            Welcome to PetPlus
          </h2>
          <p className="text-gray-600 text-lg font-medium mt-40">
            Pet Plus is your one-stop shop for all your pet needs. From food and
            toys to grooming and accessories, we have everything you need to
            keep your furry friend happy and healthy. Visit us today and see why
            we&apos;re the best pet store in town!
            <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg items-center flex gap-2 hover:bg-blue-600">
              <Link href={"/shop"}>Shop All</Link>
            </button>
          </p>
          <div className="flex gap-4 mt-5 justify-start"></div>
        </div>
      </div>

      <div className="hidden md:flex md:flex-col justify-evenly -mr-28  z-10  rounded-lg h-[50vh]">
        <div className="bg-gradient-to-r from-[#fafafa] via-[#fafafa] to-transparent w-full h-full">
          <h2 className="text-3xl text-gray-800 font-bold text1 md:text-4xl mb-2 lg:text-5xl">
            Welcome to PetPlus
          </h2>
          <p className="text-gray-600 text-lg font-base">
            Pet Plus is your one-stop shop for all your pet needs. From food and
            toys to grooming and accessories, we have everything you need to
            keep your furry friend happy and healthy. Visit us today and see why
            we&apos;re the best pet store in town!
          </p>
          <div className="flex gap-4 mt-10">
            <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg items-center flex gap-2 hover:bg-blue-600">
              <Link href={"/shop"}>Shop All</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="flex mt-10 md:mt-0 relative justify-center object-cover  md:object-contain w-full h-[300px] rounded-md md:h-[500px] lg:h-[600px] xl:h-[700px] ">
        <Image
          src="/pet_plus.png"
          alt="hero"
          fill
          className="object-fit md:object-contain w-full h-[300px] rounded-md md:h-[500px] lg:h-[600px] xl:h-[700px]"
        />
      </div>
    </div>
  );
};

export default Hero;
