import type { ProductTranslation } from "@/lib/api";
import type { Language } from "@/lib/i18n";

type TranslateProductInput = {
  name: string;
  description?: string;
  sourceLang: Language;
  targetLangs: Language[];
};

export async function translateProductText({
  name,
  description,
  sourceLang,
  targetLangs,
}: TranslateProductInput): Promise<ProductTranslation[]> {
  if (targetLangs.length === 0) return [];

  const texts = description ? [name, description] : [name];

  const res = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texts, source: sourceLang, targets: targetLangs }),
  });

  if (!res.ok) throw new Error("Translation failed.");

  const data: { configured?: boolean; translations: Record<string, string[]> } = await res.json();

  if (data.configured === false) return [];

  return targetLangs.map((locale) => {
    const [translatedName, translatedDescription] = data.translations[locale] || [];
    return {
      locale,
      name: translatedName || name,
      description: description ? translatedDescription || description : undefined,
    };
  });
}
