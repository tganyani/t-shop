"use client";

import { useCartStore } from "@/store/cart";
import { ShoppingBag, Store } from "lucide-react";
import Link from "next/link";
import DropdownMenuBasic from "./menu";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const { totalQuantity } = useCartStore();
  const totalItems = totalQuantity();
  return (
    <div className="bg-red-950 flex items-center gap-x-4 py-2 justify-between">
      <div>
        <p className="text-gray-100">
          {" "}
          <span className="text-red-600 text-2xl">T</span>-Shop
        </p>
      </div>
      <div className="flex flex-nowrap gap-x-2">
        <Link
          href="/"
          className={`flex ${pathname === "/" ? "text-red-700" : "text-gray-100"} hover:text-red-700 flex-nowrap items-center `}
        >
          <p className="">store</p>
          <Store className="h-3 w-3  ml-1 mt-1" />
        </Link>
        <Link
          href="/cart"
          className={`flex ${pathname === "/cart" ? "text-red-700" : "text-gray-100"} hover:text-red-700 flex-nowrap items-center `}
        >
          <p className="">cart</p>
          <div className="relative">
            <ShoppingBag className="h-3 w-3  ml-1 mt-1" />
            <p className="text-[10px] text-red-500 absolute -top-1  -right-2 z-1">
              {totalItems}
            </p>
          </div>
        </Link>
      </div>
      <div className="px-2">
        <DropdownMenuBasic />
      </div>
    </div>
  );
};

export default NavBar;
