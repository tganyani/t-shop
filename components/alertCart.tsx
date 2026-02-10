"use clint";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";

export function AlertDialogCart() {
  const { items } = useCartStore();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={items.length <= 0}
          variant="default"
          size="sm"
          className="bg-red-700 rounded-full text-white [@media(max-width:500px)]:w-full hover:opacity-70"
        >
          Proceed to checkout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Checkout Unavailable</AlertDialogTitle>
          <AlertDialogDescription>
            Our checkout system is currently under development. Please check
            back soon.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
