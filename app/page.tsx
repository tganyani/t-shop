
"use client"
import ProductCard from "@/components/productCard";
import SearchBar from "@/components/searchBar";
import { Product } from "@/lib/types";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default  function Home() {
  // const params = searchParams ? await searchParams : {};
  // const query = params.q?.toLowerCase() ?? "";
  // const query1 = params.q1?.toLowerCase() ?? "";
const { data:products, error } = useSWR("https://fakestoreapi.com/products", fetcher)
  // const res = await fetch("https://fakestoreapi.com/products", {
  //   next: { revalidate: 60 },
  // });
  // const products: Product[] = await res.json();
  // const filtered =
  //   query || query1
  //     ? products.filter(
  //         (p) =>
  //           p.title.toLowerCase().includes(query) &&
  //           p.category.toLowerCase().includes(query1),
  //       )
  //     : products;
  if (error) return <div>Failed to load</div>
  if (!products) return <div>Loading...</div>
  return (
    <div className="mt-4 space-y-4 ">
      <SearchBar />
      <div className=" flex flex-wrap gap-4 justify-between [@media(max-width:515px)]:justify-center">
        {products.map((product:Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
