"use client";

import { Fragment } from "react";
import { KeyRound, Globe, Webhook } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const endpointGroups = [
  {
    key: "groupAuth",
    endpoints: [
      { method: "POST", path: "/auth/register" },
      { method: "POST", path: "/auth/login" },
      { method: "POST", path: "/auth/logout" },
      { method: "POST", path: "/auth/forgot-password" },
      { method: "POST", path: "/auth/reset-password" },
    ],
  },
  {
    key: "groupCatalog",
    endpoints: [
      { method: "GET", path: "/products" },
      { method: "GET", path: "/categories" },
      { method: "GET", path: "/provinces" },
      { method: "GET", path: "/farmers" },
    ],
  },
  {
    key: "groupCommerce",
    endpoints: [
      { method: "GET", path: "/orders" },
      { method: "GET", path: "/payments" },
      { method: "GET", path: "/deliveries" },
      { method: "GET", path: "/wishlists" },
      { method: "GET", path: "/product-reviews" },
    ],
  },
  {
    key: "groupAccount",
    endpoints: [
      { method: "GET", path: "/profile" },
      { method: "PUT", path: "/profile" },
      { method: "GET", path: "/support-tickets" },
      { method: "GET", path: "/notifications" },
    ],
  },
] as const;

function methodColor(method: string) {
  if (method === "GET") return "bg-[#eaf2e4] text-[#1e6b42]";
  if (method === "POST") return "bg-[#eef2ff] text-[#4338ca]";
  if (method === "PUT" || method === "PATCH") return "bg-[#fff0cf] text-[#b17400]";
  return "bg-[#fde8e8] text-[#c0392b]";
}

function renderWithCode(template: string, tokens: Record<string, string>) {
  const parts = template.split(/(\{[a-zA-Z]+\})/g);
  return parts.map((part, i) => {
    const match = part.match(/^\{([a-zA-Z]+)\}$/);
    if (match && tokens[match[1]] !== undefined) {
      return (
        <code key={i} className="text-[12.5px]">
          {tokens[match[1]]}
        </code>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function DocsPage() {
  const { dict } = useLanguage();
  const { docsPage } = dict;
  const groupLabels: Record<string, string> = {
    groupAuth: docsPage.groupAuth,
    groupCatalog: docsPage.groupCatalog,
    groupCommerce: docsPage.groupCommerce,
    groupAccount: docsPage.groupAccount,
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2d5a1b] mb-2">
            {docsPage.eyebrow}
          </p>

          <h1
            className="text-[32px] sm:text-[44px] font-semibold text-[#1c2b1a] leading-tight mb-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {docsPage.title}
          </h1>

          <p className="text-[15px] text-[#7a8a6a] leading-relaxed">
            {docsPage.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          <div className="bg-white border border-[#ede8df] rounded-2xl p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-[#eaf2e4] text-[#1e6b42] flex items-center justify-center">
              <Globe size={18} />
            </div>
            <p className="text-[15px] font-medium text-[#1c2b1a]">{docsPage.baseUrlLabel}</p>
            <code className="text-[13px] text-[#4a5568] bg-[#faf9f6] border border-[#e0dbd0] rounded-lg px-3 py-2 w-fit">
              NEXT_PUBLIC_API_URL
            </code>
          </div>

          <div className="bg-white border border-[#ede8df] rounded-2xl p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-[#eaf2e4] text-[#1e6b42] flex items-center justify-center">
              <KeyRound size={18} />
            </div>
            <p className="text-[15px] font-medium text-[#1c2b1a]">{docsPage.authLabel}</p>
            <p className="text-[13.5px] text-[#7a8a6a] leading-relaxed">
              {renderWithCode(docsPage.authBody, {
                loginPath: "/auth/login",
                authHeader: "Authorization: Bearer <token>",
              })}
            </p>
          </div>

          <div className="bg-white border border-[#ede8df] rounded-2xl p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-[#eaf2e4] text-[#1e6b42] flex items-center justify-center">
              <Webhook size={18} />
            </div>
            <p className="text-[15px] font-medium text-[#1c2b1a]">{docsPage.formatLabel}</p>
            <p className="text-[13.5px] text-[#7a8a6a] leading-relaxed">
              {renderWithCode(docsPage.formatBody, {
                categoriesPath: "/categories",
                provincesPath: "/provinces",
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {endpointGroups.map((group) => (
            <div key={group.key} className="bg-white border border-[#ede8df] rounded-2xl p-6">
              <p
                className="text-[16px] font-medium text-[#1c2b1a] mb-4"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {groupLabels[group.key]}
              </p>
              <ul className="flex flex-col gap-2.5">
                {group.endpoints.map((ep) => (
                  <li key={ep.method + ep.path} className="flex items-center gap-3">
                    <span
                      className={`w-14 shrink-0 text-center text-[10.5px] font-semibold tracking-[0.05em] uppercase px-2 py-1 rounded-md ${methodColor(
                        ep.method
                      )}`}
                    >
                      {ep.method}
                    </span>
                    <code className="text-[13.5px] text-[#4a5568]">{ep.path}</code>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
