export const categories: { id: number; value: string }[] = [
  { id: 0, value: "all" },
  { id: 1, value: "electronics" },
  { id: 2, value: "jewelery" },
  { id: 3, value: "men's clothing" },
  { id: 4, value: "women's clothing" },
];

export const fetcher = (url: string) => fetch(url).then((res) => res.json());