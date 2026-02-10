import AddToCartBtn from "@/components/addTocartBtn";
import ProductCard from "@/components/productCard";
import Rating from "@/components/rating";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/lib/types";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) return [];

  return res.json();
}
export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = await params;
  const product = await getProduct(productId);
  const relatedProducts = await getProductsByCategory(product.category);

  if (!product) notFound();

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
          <AddToCartBtn width="50"  cartItem={{id:product.id,title:product.title,price:product.price,quantity:1, image:product.image}}/>
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
        <div className=" flex flex-wrap gap-4 justify-between [@media(max-width:515px)]:justify-center">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
