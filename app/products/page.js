import Layout from "@/components/Layout";
import React from "react";
import Link from "next/link";
import { PackagePlus } from "lucide-react";

const ProductsPage = () => {
  return (
    <Layout>
      <h1 className="heading ">Products</h1>
      <div className=" ">
        <Link
          href="/products/new"
          className="flex rounded-md bg-blue-500 text-white items-center justify-center gap-2 p-4 hover:bg-blue-600"
        >
          <PackagePlus className="w-6 h-6 " />
          <h1 className="text-md font-bold ">Add Product</h1>
        </Link>
      </div>
    </Layout>
  );
};

export default ProductsPage;
