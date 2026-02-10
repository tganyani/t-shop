import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    return NextResponse.json({ ok: true, data: res.data });
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as any).message });
  }
}