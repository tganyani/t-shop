"use client";
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

export default function SearchBar({
  searchTerms,
  setSearchTerms,
}: {
  searchTerms: {
    title: string;
    category: string;
  };
  setSearchTerms: ({
    title,
    category,
  }: {
    title: string;
    category: string;
  }) => void;
}) {
  return (
    <div className="flex flex-wrap [@media(max-width:515px)]:flex-col-reverse [@media(max-width:515px)]:items-center  justify-center gap-2">
      <Combobox
        onValueChange={(value) =>
          setSearchTerms({
            ...searchTerms,
            category: value?.value === "all" ? "" : (value?.value as string),
          })
        }
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
        onChange={(e) =>
          setSearchTerms({ ...searchTerms, title: e.target.value })
        }
        className="w-60 [@media(max-width:515px)]:w-[90vw]"
        placeholder="Enter product title"
      />
    </div>
  );
}
