import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { error } = await supabase.from("tasks").select("id").limit(1);

    return NextResponse.json({
      ok: !error,
      source: "supabase-keepalive",
      time: new Date().toISOString(),
      error: error?.message ?? null,
    });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      source: "supabase-keepalive",
    });
  }
}
