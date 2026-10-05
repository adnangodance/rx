"use client";

import { useEffect, useMemo, useState } from "react";
import ClassicHeader from "@/components/ClassicHeader";
import NewCategoryContent from "@/components/NewCategoryContent";
import NewFooter from "@/components/NewFooter";
import { adnanSuggestionCategoryProducts } from "@/lib/new-care-products";
import type { Product } from "@/components/CatalogSection";
import VersionBar, { DEFAULT_SITE_VERSION, isClassicVersion, resolveSiteVersion, usesAdnanDesign, type SiteVersion } from "@/components/VersionBar";
import { animateProductToCart } from "@/lib/cart-animation";
import { sitePath } from "@/lib/site-path";

type Category = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  cover: string;
  thumb: string;
  products: Product[];
};

const categories: Category[] = [
  {
    slug: "weight-management",
    name: "Weight management",
    shortName: "Weight",
    description: "Personalized metabolic care reviewed by a licensed provider and built around your goals.",
    cover: "/weight-management-cover.png",
    thumb: "/product-nad-injection.png",
    products: [
      { name: "Semaglutide Weekly", price: "$49/mo", detail: "Semaglutide injection", type: "vial", image: "/product-nandrolone.png" },
      { name: "Tirzepatide Compound", price: "$89/mo", detail: "Dual-action metabolic care", type: "vial", image: "/product-b12.png" },
      { name: "Daily Metabolic Tablet", price: "$42/mo", detail: "Oral metabolic support", type: "disc", image: "/product-tablet.png" },
      { name: "Metabolic Sublingual", price: "$39/mo", detail: "Sublingual drops", type: "spray", image: "/product-oxytocin.png" },
      { name: "Lipo-B12 Booster", price: "$35/mo", detail: "Methionine and B12", type: "amber", image: "/product-b12.png" },
      { name: "Metformin Longevity", price: "$35/mo", detail: "Metformin HCl", type: "disc", image: "/product-tablet.png" },
    ],
  },
  {
    slug: "womens-health",
    name: "Women’s health",
    shortName: "Women’s health",
    description: "Private online care for energy, intimacy, hormones, and everyday wellbeing.",
    cover: "/light-green-couple.jpg",
    thumb: "/product-pt141.png",
    products: [
      { name: "Intimate Oxytocin Spray", price: "$35/mo", detail: "Oxytocin 100IU", type: "spray", image: "/product-oxytocin.png" },
      { name: "Hormone Care", price: "$39/mo", detail: "Personalized hormone support", type: "vial", image: "/product-nandrolone.png" },
      { name: "Vitality B12", price: "$29/mo", detail: "Cyanocobalamin", type: "amber", image: "/product-b12.png" },
      { name: "Daily Wellness Tablet", price: "$24/mo", detail: "Daily support", type: "disc", image: "/product-tablet.png" },
    ],
  },
  {
    slug: "longevity",
    name: "Longevity & everyday health",
    shortName: "Longevity",
    description: "Thoughtful everyday support for energy, healthy aging, and long-term wellness.",
    cover: "/longevity-cover.png",
    thumb: "/product-amino-quad.png",
    products: [
      { name: "Daily Tablet", price: "$39/mo", detail: "Everyday health support", type: "disc", image: "/product-tablet.png" },
      { name: "NAD+ Complex", price: "$69/mo", detail: "NAD+ booster", type: "vial", image: "/product-nandrolone.png" },
      { name: "Vitamin B12", price: "$29/mo", detail: "Cyanocobalamin", type: "amber", image: "/product-b12.png" },
      { name: "Oxytocin Spray", price: "$49/mo", detail: "Oxytocin", type: "spray", image: "/product-oxytocin.png" },
    ],
  },
  {
    slug: "hair-care",
    name: "Hair loss",
    shortName: "Hair loss",
    description: "Provider-guided options designed to support fuller-looking, healthier hair.",
    cover: "/hair-loss-cover.png",
    thumb: "/bottle-hair-care.png",
    products: [
      { name: "Daily Hair Tablet", price: "$29/mo", detail: "Personalized oral care", type: "disc", image: "/product-tablet.png" },
      { name: "Hair Support Serum", price: "$39/mo", detail: "Topical support", type: "spray", image: "/product-oxytocin.png" },
      { name: "B12 Hair Support", price: "$29/mo", detail: "Vitamin support", type: "amber", image: "/product-b12.png" },
    ],
  },
  {
    slug: "acne",
    name: "Acne & clear skin",
    shortName: "Acne",
    description: "Personalized, provider-guided care designed to support clearer, healthier-looking skin.",
    cover: "/acne-cover.png",
    thumb: "/product-beta-glucan.png",
    products: [
      { name: "Daily Acne Tablet", price: "$29/mo", detail: "Personalized oral care", type: "disc", image: "/product-tablet.png" },
      { name: "Clear Skin Formula", price: "$35/mo", detail: "Daily skin support", type: "vial", image: "/product-nandrolone.png" },
      { name: "Acne Support Spray", price: "$32/mo", detail: "Targeted topical care", type: "spray", image: "/product-oxytocin.png" },
      { name: "Skin Wellness B12", price: "$29/mo", detail: "Vitamin support", type: "amber", image: "/product-b12.png" },
    ],
  },
  {
    slug: "sexual-health",
    name: "Sexual health & intimacy",
    shortName: "Sexual health",
    description: "Discreet, personalized care for confidence, performance, and intimacy.",
    cover: "/brown-couple.jpg",
    thumb: "/pill-energy-flame.png",
    products: [
      { name: "Daily Tadalafil", price: "$24/mo", detail: "Tadalafil 5mg", type: "disc", image: "/product-tablet.png" },
      { name: "Sildenafil On-Demand", price: "$29/mo", detail: "Sildenafil 50mg", type: "disc", image: "/product-tablet.png" },
      { name: "Intimate Oxytocin Spray", price: "$35/mo", detail: "Oxytocin 100IU", type: "spray", image: "/product-oxytocin.png" },
      { name: "PT-141 Peptide", price: "$49/mo", detail: "Bremelanotide", type: "vial", image: "/product-nandrolone.png" },
    ],
  },
];

export default function CategoryExperience() {
  const [theme, setTheme] = useState<SiteVersion>(DEFAULT_SITE_VERSION);
  const isClassic = isClassicVersion(theme);
  const isAdnanDesign = usesAdnanDesign(theme);
  const [activeSlug, setActiveSlug] = useState("weight-management");
  const [search, setSearch] = useState("");
  const [cartProduct, setCartProduct] = useState<Product | null>(null);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [coverHidden, setCoverHidden] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("category");
    const query = params.get("q")?.trim() || "";
    if (categories.some((category) => category.slug === slug)) setActiveSlug(slug!);
    if (query) {
      const normalizedQuery = query.toLowerCase();
      const categoryAliases: Record<string, string> = {
        "weight loss": "weight-management",
        "weight management": "weight-management",
        "sexual health": "sexual-health",
        testosterone: "sexual-health",
        "hair loss": "hair-care",
        hair: "hair-care",
        skin: "acne",
        acne: "acne",
        peptide: "longevity",
        peptides: "longevity",
        longevity: "longevity",
      };
      const aliasSlug = categoryAliases[normalizedQuery];
      if (aliasSlug) {
        setActiveSlug(aliasSlug);
        setSearch("");
      } else {
        setSearch(query);
        const matchingCategory = categories.find((item) =>
          item.products.map((product) => `${product.name} ${product.detail}`).join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
        );
        if (matchingCategory) setActiveSlug(matchingCategory.slug);
      }
    }
    const savedTheme = localStorage.getItem("scriptrx-theme");
    setTheme(resolveSiteVersion(savedTheme));
    setAuthenticated(localStorage.getItem("scriptrx-authenticated") === "true");
    try {
      const saved = JSON.parse(localStorage.getItem("scriptrx-cart-product") || "null");
      if (saved?.name) setCartProduct(saved);
    } catch {
      setCartProduct(null);
    }
  }, []);

  useEffect(() => {
    const updateCoverOnScroll = () => {
      if (window.scrollY <= 2) {
        setCoverHidden(false);
      } else if (window.scrollY > 12) {
        setCoverHidden(true);
      }
    };

    window.addEventListener("scroll", updateCoverOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateCoverOnScroll);
  }, []);

  const category = categories.find((item) => item.slug === activeSlug) || categories[0];
  const categoryDisplayName = category.name;
  const products = useMemo(() => {
    const categoryProducts = usesAdnanDesign(theme)
      ? (adnanSuggestionCategoryProducts[category.slug] || category.products)
      : category.products;
    return categoryProducts.filter((product) => `${product.name} ${product.detail}`.toLowerCase().includes(search.toLowerCase()));
  }, [category, search, theme]);

  function chooseCategory(slug: string) {
    setActiveSlug(slug);
    setSearch("");
    window.history.replaceState({}, "", sitePath(`/categories?category=${slug}`));
  }

  function chooseTheme(nextTheme: SiteVersion) {
    setTheme(nextTheme);
    localStorage.setItem("scriptrx-theme", nextTheme);
  }

  function addProduct(product: Product) {
    if (cartProduct && cartProduct.name !== product.name) {
      setPendingProduct(product);
      return;
    }
    setCartProduct(product);
    localStorage.setItem("scriptrx-cart-product", JSON.stringify(product));
    localStorage.setItem("scriptrx-cart-products", JSON.stringify([product.name]));
  }

  function replaceProduct() {
    if (!pendingProduct) return;
    setCartProduct(pendingProduct);
    localStorage.setItem("scriptrx-cart-product", JSON.stringify(pendingProduct));
    localStorage.setItem("scriptrx-cart-products", JSON.stringify([pendingProduct.name]));
    setPendingProduct(null);
  }

  function removeProduct() {
    setCartProduct(null);
    localStorage.removeItem("scriptrx-cart-product");
    localStorage.setItem("scriptrx-cart-products", "[]");
  }

  return (
    <main id="top" className={`category-page category-theme-${isClassic ? "v1" : theme} ${isAdnanDesign ? "category-theme-adnan" : ""} ${theme === "v6" ? "category-theme-new theme-new" : ""}`}>
      <VersionBar version={theme} onChange={chooseTheme} />
      {!isClassic && <div className="category-announcement">New: personalized weight care</div>}
      {isClassic ? <ClassicHeader cartCount={cartProduct ? 1 : 0} searchValue={search} onSearchChange={setSearch} theme={theme} /> : <header className="category-header">
        <a className="category-logo" href={sitePath("/")}>
          {theme === "v1" ? <img className="v1-brand-logo" src={sitePath("/scriptrx-logo-v1.png")} alt="ScriptRx" /> : "Scriptrx"}
        </a>
        <nav><a href={sitePath("/categories?category=womens-health")}>Women&apos;s Health</a><a href={sitePath("/categories?category=weight-management")}>Weight Management</a><a href={sitePath("/categories?category=longevity")}>Longevity</a></nav>
        <div>
          {cartProduct && <a className="category-cart" href={sitePath("/cart")}><img src={sitePath("/cart-icon.svg")} alt="" /><b>1</b></a>}
          {authenticated ? <a className="category-account" href={sitePath("/")}>My Account</a> : <a className="category-account" href={sitePath(`/login?theme=${theme}`)}>Log in</a>}
        </div>
      </header>}


      {pendingProduct && (
        <div className="product-replace-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setPendingProduct(null);
        }}>
          <section className="product-replace-dialog" role="dialog" aria-modal="true" aria-labelledby="replace-product-title">
            <button className="product-replace-close" type="button" onClick={() => setPendingProduct(null)} aria-label="Close">×</button>
            <span>ONE TREATMENT AT A TIME</span>
            <h2 id="replace-product-title">You already have a product in your cart.</h2>
            <p>Replace <strong>{cartProduct?.name}</strong> with <strong>{pendingProduct.name}</strong>?</p>
            <div>
              <button className="product-replace-confirm" type="button" onClick={replaceProduct}>Replace product</button>
              <button className="product-replace-back" type="button" onClick={() => setPendingProduct(null)}>Go back</button>
            </div>
          </section>
        </div>
      )}

      {theme === "v6" ? <>
        <NewCategoryContent category={category} products={adnanSuggestionCategoryProducts[category.slug] || category.products} cartProduct={cartProduct} search={search} onSearchChange={setSearch} onAddToCart={addProduct} onRemoveFromCart={removeProduct} />
        <NewFooter homeLinks />
      </> : <div className="category-shell" id="classic-products">
        <aside className="category-sidebar">
          <label className="category-sidebar-search">
            <span aria-hidden="true" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" />
            <kbd>⌘</kbd><kbd>F</kbd>
          </label>
          <div className="category-list">
            {categories.map((item) => (
              <button className={item.slug === activeSlug ? "active" : ""} type="button" key={item.slug} onClick={() => chooseCategory(item.slug)}>
                <span><img src={sitePath(item.thumb)} alt="" /></span>
                <b>{isClassic && item.slug === "weight-management" ? "A plan made for you" : isClassic && item.slug === "sexual-health" ? "Better sex" : item.shortName}</b>
              </button>
            ))}
          </div>
        </aside>

        <section className="category-content">
          <div className={`category-cover ${coverHidden ? "is-scroll-hidden" : ""}`}>
            <img src={sitePath(category.cover)} alt="" />
            <div><span>PERSONALIZED CARE</span><h1>{categoryDisplayName}</h1><p>{category.description}</p></div>
          </div>

          <div className="category-toolbar">
            <h2>{categoryDisplayName}</h2>
            {isClassic && (
              <label className="classic-product-search">
                <span aria-hidden="true" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search Products" />
                <kbd>⌘</kbd><kbd>F</kbd>
              </label>
            )}
          </div>

          <div className="category-product-grid">
            {products.map((product) => {
              const added = cartProduct?.name === product.name;
              return (
                <article className={`catalog-card category-product-card ${added ? "is-added" : ""}`} key={product.name}>
                  <a
                    className={`catalog-art product-detail-hit ${product.type}`}
                    href={sitePath("/product")}
                    onClick={() => localStorage.setItem("scriptrx-detail-product", JSON.stringify(product))}
                    aria-label={`View details for ${product.name}`}
                  >
                    <div className="product-float">
                      <img className="product-render" src={sitePath(product.image)} alt={product.name} />
                      <img className="product-shadow" src={sitePath("/product-shadow.png")} alt="" />
                    </div>
                  </a>
                  <div className="catalog-copy">
                    <h4>
                      <a
                        href={sitePath("/product")}
                        onClick={() => localStorage.setItem("scriptrx-detail-product", JSON.stringify(product))}
                      >
                        {product.name}
                      </a>
                    </h4>
                    <p>From {product.price}</p>
                    <span>{product.detail}</span>
                    <div className="product-actions">
                      <button className={added ? "added" : ""} type="button" onClick={(event) => {
                        if (added) {
                          removeProduct();
                        } else {
                          animateProductToCart(event.currentTarget);
                          addProduct(product);
                        }
                      }}>{added ? "Remove" : "Add to Cart"}</button>
                      <a
                        href={sitePath("/product")}
                        onClick={() => localStorage.setItem("scriptrx-detail-product", JSON.stringify(product))}
                      >
                        Details
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          {products.length === 0 && <div className="category-empty">No products match “{search}”.</div>}
        </section>
      </div>}
    </main>
  );
}
