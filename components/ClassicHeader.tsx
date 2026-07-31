"use client";

import { useState } from "react";
import { sitePath } from "@/lib/site-path";

export default function ClassicHeader({
  cartCount = 0,
  searchValue,
  onSearchChange,
}: {
  cartCount?: number;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}) {
  const [localSearch, setLocalSearch] = useState("");
  const search = searchValue ?? localSearch;

  return (
    <header className="classic-reference-nav">
      <a className="classic-reference-logo" href={sitePath("/")} aria-label="ScriptRx home">
        <img src={sitePath("/scriptrx-logo-v1.png")} alt="ScriptRx" />
      </a>
      <nav aria-label="Primary navigation">
        <a href={sitePath("/categories?category=sexual-health")}>Sexual Health</a>
        <a href={sitePath("/categories?category=sexual-health")}>Testosterone</a>
        <a href={sitePath("/categories?category=weight-management")}>Weight Loss</a>
        <a href={sitePath("/categories?category=hair-care")}>Hair Loss</a>
        <a href={sitePath("/categories?category=acne")}>Skin</a>
        <a href={sitePath("/categories?category=longevity")}>Peptides</a>
      </nav>
      <form
        className="classic-header-search"
        action={sitePath("/categories")}
        method="get"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          if (onSearchChange) return;
          const query = search.trim();
          if (query) window.location.assign(`${sitePath("/categories")}?q=${encodeURIComponent(query)}`);
        }}
      >
        <button type="submit" aria-label="Search">⌕</button>
        <input
          type="search"
          name="q"
          value={search}
          onChange={(event) => {
            setLocalSearch(event.target.value);
            onSearchChange?.(event.target.value);
          }}
          placeholder="Search symptoms, services, or medications..."
          aria-label="Search ScriptRx"
        />
      </form>
      <a className="classic-header-location" href="#">
        <span aria-hidden="true">●</span>
        New York City, NY
      </a>
      <div className="classic-header-actions">
        {cartCount > 0 && (
          <a className="category-cart classic-header-cart" href={sitePath("/cart")} aria-label={`Cart with ${cartCount} items`}>
            <img src={sitePath("/cart-icon.svg")} alt="" />
            <b>{cartCount}</b>
          </a>
        )}
        <a className="classic-header-login" href={sitePath("/login?theme=v1")}>
          <span className="classic-login-icon" aria-hidden="true" />
          Log in
        </a>
      </div>
    </header>
  );
}
