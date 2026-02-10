"use client";
import Image from "next/image";
import { Product } from "@/lib/types";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Rating from "./rating";
import AddToCartBtn from "./addTocartBtn";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-2  w-60 [@media(max-width:515px)]:w-[90vw] border p-2 border-gray-200 rounded-xl shadow-[2px]">
      <div className="relative h-50 w-full">
        <Image
          src={product.image}
          alt="product-image"
          fill
          className="object-contain"
        />
      </div>
      <p className="line-clamp-2 text-gray-400 text-sm flex-1">
        {product.title}
      </p>
      <div className="flex flex-nowrap justify-between">
        <p>${product.price}</p>
        <Rating initialRate={product.rating.rate} />
      </div>
      <Button
        onClick={() => router.push(`/${product.id}`)}
        size="xs"
        variant="ghost"
        className="text-red-700 text-sm w-full hover:opacity-60"
      
      >
        read more
      </Button>
      <AddToCartBtn width="full" cartItem={{id:product.id,title:product.title,price:product.price,quantity:1, image:product.image}}/>
    </div>
  );
}
