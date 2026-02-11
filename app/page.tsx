"use client";
import Loading from "@/components/loading";
import ProductCard from "@/components/productCard";
import SearchBar from "@/components/searchBar";
import { fetcher } from "@/lib/constants";
import { Product } from "@/lib/types";
import { useState } from "react";
import useSWR from "swr";



export default function Home() {
  const { data: products, error } = useSWR<Product[]>(
    "https://fakestoreapi.com/products",
    fetcher,
    {
      keepPreviousData: true,
    }
  );
  const [searchTerms, setSearchTerms] = useState<{
    title: string;
    category: string;
  }>({
    title: "",
    category: "",
  });
  const filtered = products?.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerms.title) &&
      p.category.toLowerCase().includes(searchTerms.category),
  );
  if (error) return <div>Failed to load</div>;
  if (!products)
    return (
      <div className="w-screen h-screen">
        <Loading color="red-700" />
      </div>
    );
  return (
    <div className="mt-4 space-y-4">
      <SearchBar searchTerms={searchTerms} setSearchTerms={setSearchTerms} />
      <div className=" flex flex-wrap gap-4 justify-between [@media(max-width:515px)]:justify-center">
        {filtered?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
