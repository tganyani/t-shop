"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/constants";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [productCategory, setProductCategory] = useState<string>("");
  function onChangeTitle(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value?.trim()) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }

  function onChangeCategory(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value?.trim()) {
      params.set("q1", value === "all" ? "" : value);
    } else {
      params.delete("q1");
    }

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }
  return (
    <div className="flex flex-wrap [@media(max-width:515px)]:flex-col-reverse [@media(max-width:515px)]:items-center  justify-center gap-2">
      <Combobox
        onValueChange={(value) => onChangeCategory(value?.value as string)}
        items={categories}
        defaultValue={categories[0]}
      >
        <ComboboxTrigger
          className="w-60 [@media(max-width:515px)]:w-[90vw]"
          render={
            <Button
              variant="outline"
              className="w-64 justify-between font-normal"
            >
              <ComboboxValue />
            </Button>
          }
        />
        <ComboboxContent className="bg-white ">
          <ComboboxInput showTrigger={false} placeholder="Search" />
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item}>
                {item.value}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <Input
        onChange={(e) => onChangeTitle(e.target.value)}
        className="w-60 [@media(max-width:515px)]:w-[90vw]"
        placeholder="Enter product title"
      />
    </div>
  );
}
