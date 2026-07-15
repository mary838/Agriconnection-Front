import { NextResponse } from "next/server";

const GOOGLE_TRANSLATE_URL = "https://translation.googleapis.com/language/translate/v2";

export async function POST(request: Request) {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ configured: false, translations: {} });
  }

  const { texts, source, targets } = await request.json();

  if (
    !Array.isArray(texts) ||
    texts.length === 0 ||
    !Array.isArray(targets) ||
    targets.length === 0
  ) {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  try {
    const translations: Record<string, string[]> = {};

    await Promise.all(
      targets.map(async (target: string) => {
        const res = await fetch(`${GOOGLE_TRANSLATE_URL}?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q: texts, source, target, format: "text" }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error?.message || "Translation request failed.");
        }

        translations[target] = data.data.translations.map(
          (t: { translatedText: string }) => t.translatedText
        );
      })
    );

    return NextResponse.json({ configured: true, translations });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Translation failed.";
    return NextResponse.json({ message }, { status: 502 });
  }
}
