"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { CartItem, useCartStore } from "@/store/cart";

export default function AddToCartBtn({
  width,
  cartItem,
}: {
  width: string;
  cartItem: CartItem;
}) {
  const { addItem, items } = useCartStore();
  const isInCart = items.filter((item) => item.id === cartItem.id).length > 0;
  return (
    <Button
      disabled={isInCart}
      onClick={() => addItem(cartItem)}
      variant="outline"
      size="sm"
      className={`w-${width} [@media(max-width:500px)]:w-full border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white`}
    >
      {
        isInCart?<p className="italic">Already in cart</p>:<>add to cart <ShoppingCart className="w-3 h-3" /></>
      }
    </Button>
  );
}
