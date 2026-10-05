"use client";

import { useState } from "react";
import type { Product, ProductRow } from "@/components/CatalogSection";
import { animateProductToCart } from "@/lib/cart-animation";
import { filterProducts, productFilters, productFormat, type ProductFilter } from "@/lib/product-catalog";
import { sitePath } from "@/lib/site-path";

export default function NewProductCatalog({ row, addedProducts, onAddToCart, onRemoveFromCart, searchQuery, onSearchQueryChange, selectedProduct, description = "Find your next step. Personalized care, on your terms.", browseHref = "/categories", searchLabel = "Search popular treatments" }: { row: ProductRow; addedProducts: string[]; onAddToCart: (product: Product) => void; onRemoveFromCart: (product: Product) => void; searchQuery?: string; onSearchQueryChange?: (query: string) => void; selectedProduct?: Product | null; description?: string; browseHref?: string; searchLabel?: string }) {
  const [localQuery, setLocalQuery] = useState("");
  const query = searchQuery ?? localQuery;
  const setQuery = onSearchQueryChange ?? setLocalQuery;
  const [filter, setFilter] = useState<ProductFilter>("All");
  const products = filterProducts(row.products, query, filter);
  const selected = selectedProduct === undefined ? row.products.find(product => addedProducts.includes(product.name)) : selectedProduct;

  const saveDetail = (product: Product) => localStorage.setItem("scriptrx-detail-product", JSON.stringify(product));

  return (
    <section className="new-amino-catalog" id={row.id} aria-labelledby="new-products-title">
      <header>
        <span>EXPLORE YOUR OPTIONS</span>
        <h3 id="new-products-title">{row.title}</h3>
        <p>{description}</p>
      </header>
      <div className="new-amino-layout">
        <div className="new-amino-products">
          <label className="new-amino-search">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.7" /><path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
            <input type="search" placeholder="Search treatments" aria-label={searchLabel} value={query} onChange={event => setQuery(event.target.value)} />
          </label>
          <div className="new-amino-filters" role="group" aria-label="Filter treatments by format">
            {productFilters.map(option => <button key={option} type="button" aria-pressed={filter === option} onClick={() => setFilter(option)}>{option}</button>)}
          </div>
          <div className="new-amino-grid">
            {products.map(product => {
              const isAdded = addedProducts.includes(product.name);
              return <article className={`new-amino-card${isAdded ? " is-added" : ""}`} key={product.name}>
                <a className={`catalog-art new-amino-art ${product.type}`} href={sitePath("/product")} aria-label={`View ${product.name}`} onClick={() => saveDetail(product)}>
                  <div className="product-float"><img className="product-render" src={sitePath(product.image)} alt={product.name} loading="lazy" /></div>
                  <span className="new-amino-detail-chip">{isAdded && <span aria-hidden="true">✓</span>}{isAdded ? "In your cart" : "Details"}<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                </a>
                <div className="new-amino-copy">
                  <div className="new-amino-description"><h4><a href={sitePath("/product")} onClick={() => saveDetail(product)}>{product.name}</a></h4><p>{product.detail}</p></div>
                  <div className="new-amino-format"><span>{productFormat(product)}</span><span>{product.price}</span></div>
                  <div className="new-amino-action">
                    <p><strong>{product.price.replace("/mo", "")}</strong><span>/month</span><small>Starting from</small></p>
                    <button type="button" className={isAdded ? "added" : ""} aria-label={`${isAdded ? "Remove" : "Add"} ${product.name} ${isAdded ? "from" : "to"} cart`} onClick={event => { if (isAdded) onRemoveFromCart(product); else { animateProductToCart(event.currentTarget); onAddToCart(product); } }}>
                      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d={isAdded ? "M4 10h12" : "M4 10h12M10 4v12"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>{isAdded ? "Remove" : "Add to cart"}
                    </button>
                  </div>
                </div>
              </article>;
            })}
          </div>
          {products.length === 0 && <div className="new-amino-empty"><p>No treatments match your search.</p><button type="button" onClick={() => { setQuery(""); setFilter("All"); }}>Clear filters</button></div>}
          <p className="new-amino-count" aria-live="polite">{products.length} {products.length === 1 ? "treatment" : "treatments"}</p>
        </div>
        <aside className="new-amino-summary" aria-labelledby="new-treatment-summary-title">
          <div className="new-amino-summary-heading"><h4 id="new-treatment-summary-title">Your treatment</h4><span>{selected ? "1 selected" : "0 selected"}</span></div>
          {selected ? <div className="new-amino-selection">
            <img src={sitePath(selected.image)} alt="" />
            <div><strong>{selected.name}</strong><span>{selected.price}</span><button type="button" onClick={() => onRemoveFromCart(selected)}>Remove</button></div>
          </div> : <div className="new-amino-summary-empty"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M8 11h16l2 16H6l2-16Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M12 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg><p>Choose a treatment to start your personalized care journey.</p></div>}
          <div className="new-amino-summary-note"><span>Online consultation</span><p>A licensed provider reviews your health history and determines the right treatment for you.</p></div>
          <a className={`new-amino-checkout${selected ? " has-selection" : ""}`} href={sitePath(selected ? "/cart" : browseHref)}>{selected ? "Continue to your cart" : "Explore all treatments"}<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
          <p className="new-amino-summary-footnote">Treatment is prescribed only when clinically appropriate.</p>
        </aside>
      </div>
    </section>
  );
}
