import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = body.userId;

    if (!userId) {
      return NextResponse.json({ subscription: null });
    }

    const { data, error } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ subscription: null });
    }

    return NextResponse.json({ subscription: data });
  } catch {
    return NextResponse.json({ subscription: null });
  }
}