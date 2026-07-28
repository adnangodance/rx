"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/components/CatalogSection";
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
  const [activeSlug, setActiveSlug] = useState("weight-management");
  const [search, setSearch] = useState("");
  const [cartProduct, setCartProduct] = useState<Product | null>(null);
  const [notice, setNotice] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("category");
    if (categories.some((category) => category.slug === slug)) setActiveSlug(slug!);
    setAuthenticated(localStorage.getItem("scriptrx-authenticated") === "true");
    try {
      const saved = JSON.parse(localStorage.getItem("scriptrx-cart-product") || "null");
      if (saved?.name) setCartProduct(saved);
    } catch {
      setCartProduct(null);
    }
  }, []);

  const category = categories.find((item) => item.slug === activeSlug) || categories[0];
  const products = useMemo(() => category.products.filter((product) => `${product.name} ${product.detail}`.toLowerCase().includes(search.toLowerCase())), [category, search]);

  function chooseCategory(slug: string) {
    setActiveSlug(slug);
    setSearch("");
    window.history.replaceState({}, "", sitePath(`/categories?category=${slug}`));
  }

  function addProduct(product: Product) {
    if (cartProduct && cartProduct.name !== product.name) {
      setNotice(`Only one product can be purchased at a time. Remove ${cartProduct.name} before adding ${product.name}.`);
      return;
    }
    setCartProduct(product);
    localStorage.setItem("scriptrx-cart-product", JSON.stringify(product));
    localStorage.setItem("scriptrx-cart-products", JSON.stringify([product.name]));
    setNotice(`${product.name} was added to your cart.`);
  }

  function removeProduct() {
    setCartProduct(null);
    localStorage.removeItem("scriptrx-cart-product");
    localStorage.setItem("scriptrx-cart-products", "[]");
    setNotice("Product removed. You can now choose another treatment.");
  }

  return (
    <main className="category-page">
      <div className="category-announcement">New: personalized weight care</div>
      <header className="category-header">
        <a className="category-logo" href={sitePath("/")}>Scriptrx</a>
        <nav><a href={sitePath("/categories?category=womens-health")}>Women&apos;s Health</a><a href={sitePath("/categories?category=weight-management")}>Weight Management</a><a href={sitePath("/categories?category=longevity")}>Longevity</a></nav>
        <div>
          {cartProduct && <a className="category-cart" href={sitePath("/cart")}><img src={sitePath("/cart-icon.svg")} alt="" /><b>1</b></a>}
          {authenticated ? <a className="category-account" href={sitePath("/")}>My Account</a> : <a className="category-account" href={sitePath("/login")}>Log in</a>}
        </div>
      </header>

      {notice && <div className="cart-notice" role="status"><span>{notice}</span><button type="button" onClick={() => setNotice("")}>×</button></div>}

      <div className="category-shell">
        <aside className="category-sidebar">
          <label className="category-sidebar-search">
            <span aria-hidden="true" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" />
            <kbd>⌘</kbd><kbd>F</kbd>
          </label>
          <div className="category-list">
            {categories.map((item) => (
              <button className={item.slug === activeSlug ? "active" : ""} type="button" key={item.slug} onClick={() => chooseCategory(item.slug)}>
                <span><img src={sitePath(item.thumb)} alt="" /></span><b>{item.shortName}</b>
              </button>
            ))}
          </div>
        </aside>

        <section className="category-content">
          <div className="category-cover">
            <img src={sitePath(category.cover)} alt="" />
            <div><span>PERSONALIZED CARE</span><h1>{category.name}</h1><p>{category.description}</p></div>
          </div>

          <div className="category-toolbar">
            <h2>{category.name}</h2>
          </div>

          <div className="category-product-grid">
            {products.map((product) => {
              const added = cartProduct?.name === product.name;
              return (
                <article className={`catalog-card category-product-card ${added ? "is-added" : ""}`} key={product.name}>
                  <div className={`catalog-art ${product.type}`}>
                    <div className="product-float">
                      <img className="product-render" src={sitePath(product.image)} alt={product.name} />
                      <img className="product-shadow" src={sitePath("/product-shadow.png")} alt="" />
                    </div>
                  </div>
                  <div className="catalog-copy">
                    <h4>{product.name}</h4>
                    <p>From {product.price}</p>
                    <span>{product.detail}</span>
                    <div className="product-actions">
                      <button className={added ? "added" : ""} type="button" onClick={() => added ? removeProduct() : addProduct(product)}>{added ? "Remove" : "Add to Cart"}</button>
                      <a href={sitePath("/cart")}>Details</a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          {products.length === 0 && <div className="category-empty">No products match “{search}”.</div>}
        </section>
      </div>
    </main>
  );
}
