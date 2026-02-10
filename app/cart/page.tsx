"use client";

import { AlertDialogCart } from "@/components/alertCart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";

export default function Cart() {
  const {
    items,
    increaseQty,
    decreaseQty,
    totalPrice,
    removeItem,
    totalQuantity,
  } = useCartStore();
  const totalCost = Number(totalPrice()).toFixed(2);
  const totalItems = totalQuantity();
  return (
    <div className="mt-4 mb-4 space-y-4">
      <p className="">Shopping Cart</p>
      {items.map((item) => (
        <div key={item.id} className="sm:p-6 p-2">
          <div className="flex justify-between">
            <div className="flex-1 relative h-20 w-20 ">
              <Image
                src={item.image}
                alt="product-image"
                fill
                className="object-contain"
              />
            </div>
            <div className="space-y-2 flex-3">
              <p className=" text-sm text-gray-300">{item.title}</p>
              <div className=" flex flex-nowrap gap-x-4 items-center">
                <div className="flex flex-nowrap justify-around items-center border-2  border-stone-100 rounded-full w-60">
                  <Minus className="h-4 w-4 text-stone-300 hover:text-red-700 hover:w-6 hover:h-6" onClick={() => decreaseQty(item.id)} />
                  <p>{item.quantity}</p>
                  <Plus className="h-4 w-4 text-stone-300 hover:text-red-700 hover:w-6 hover:h-6" onClick={() => increaseQty(item.id)} />
                </div>
                <Trash className="h-4 w-4 text-stone-300 hover:text-red-700 hover:w-6 hover:h-6" onClick={() => removeItem(item.id)} />
              </div>
            </div>
            <p className="flex-1">${item.price}</p>
          </div>
          <div className="">
            <Separator
              orientation="horizontal"
              className=" border text-gray-100 "
            />
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <p className="font-bold">
          <span className="text-gray-400 font-semibold">
            Subtotal ({totalItems} items):
          </span>{" "}
          ${totalCost}
        </p>
      </div>
      <div className="flex justify-center">
        <AlertDialogCart/>
      </div>
    </div>
  );
}
