"use client"
import AddToCartBtn from "@/components/addTocartBtn";
import Loading from "@/components/loading";
import ProductCard from "@/components/productCard";
import Rating from "@/components/rating";
import { Separator } from "@/components/ui/separator";
import { fetcher } from "@/lib/constants";
import { Product } from "@/lib/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function ProductPage() {
  const { productId } = useParams();
  const { data: product, error } = useSWR<Product>(
    `https://fakestoreapi.com/products/${productId}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  const { data: relatedProducts, error: error2 } = useSWR<Product[]>(
    `https://fakestoreapi.com/products/category/${product?.category}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );
  if (error) return <div>Failed to load</div>;
  if (!product)
    return (
      <div className="w-screen h-screen">
        <Loading color="red-700" />
      </div>
    );

  return (
    <div className="mt-4 px-2 space-y-4">
      <div className="flex flex-wrap justify-around ">
        <div className="relative h-50 w-50 [@media(max-width:500px)]:w-[90vw]">
          <Image
            src={product.image}
            alt="product-image"
            fill
            className="object-contain"
          />
        </div>
        <div className="[@media(max-width:500px)]:hidden">
          <Separator
            orientation="vertical"
            className=" border text-gray-100 "
          />
        </div>
        <div className="space-y-2 [@media(max-width:500px)]:w-full">
          <p className="text-gray-400 text-sm">{product.title}</p>
          <Rating initialRate={product.rating.rate} />
          <p>${product.price}</p>
          <AddToCartBtn
            width="50"
            cartItem={{
              id: product.id,
              title: product.title,
              price: product.price,
              quantity: 1,
              image: product.image,
            }}
          />
        </div>
      </div>
      <div>
        <p className="font-semibold">About Product</p>
        <p className="text-gray-400 text-sm">{product.description}</p>
      </div>
      <div className="">
        <Separator
          orientation="horizontal"
          className=" border text-gray-100 "
        />
      </div>
      <div className="space-y-2">
        <p className="font-semibold">Related products</p>
        {error2 ? (
          <p>error fetching products</p>
        ) : relatedProducts ? (
          <div className=" flex flex-wrap gap-4 justify-between [@media(max-width:515px)]:justify-center">
            {relatedProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="w-screen h-screen">
            <Loading color="red-700" />
          </div>
        )}
      </div>
    </div>
  );
}
