import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    return NextResponse.json(res.data, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate" },
    });
  } catch (error) {
    console.error("Failed to fetch FakeStore", error);
    return NextResponse.json([], { status: 500 });
  }
}