"use client";

import { useEffect, useRef, useState } from "react";
import { animateProductToCart } from "@/lib/cart-animation";
import { sitePath } from "@/lib/site-path";

export interface Product {
  name: string;
  price: string;
  detail: string;
  type: string;
  image: string;
}

export interface ProductRow {
  id?: string;
  title: string;
  products: Product[];
}

export default function CatalogSection({ productRows, addedProducts, onAddToCart, onRemoveFromCart }: { productRows: ProductRow[]; addedProducts: string[]; onAddToCart: (product: Product) => void; onRemoveFromCart: (product: Product) => void }) {
  return (
    <section className="programs shell" id="care">
      <div className="catalog">
        {productRows.map((row) => (
          <CatalogRow key={row.title} row={row} addedProducts={addedProducts} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} />
        ))}
      </div>
    </section>
  );
}

function CatalogRow({ row, addedProducts, onAddToCart, onRemoveFromCart }: { row: ProductRow; addedProducts: string[]; onAddToCart: (product: Product) => void; onRemoveFromCart: (product: Product) => void }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateProgress = () => {
    if (gridRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    }
  };

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (gridRef.current) {
      const scrollAmount = gridRef.current.clientWidth * 0.75;
      gridRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Base progress fill starts at 25% minimum width and fills up to 100% as scrolled
  const fillWidth = 25 + (scrollProgress / 100) * 75;

  return (
    <section className="catalog-row" id={row.id}>
      <div className="catalog-heading">
        <h3>{row.title}</h3>
        <div className="catalog-nav-controls">
          <div className="catalog-progress-pill" aria-hidden="true">
            <div className="catalog-progress-track">
              <div
                className="catalog-progress-fill"
                style={{ width: `${fillWidth}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label={`Previous ${row.title} products`}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label={`Next ${row.title} products`}
          >
            →
          </button>
        </div>
      </div>
      <div className="catalog-grid" ref={gridRef} onScroll={updateProgress}>
        {row.products.map((product, idx) => {
          const isAdded = addedProducts.includes(product.name);
          return (
          <article className={`catalog-card ${isAdded ? "is-added" : ""}`} key={`${product.name}-${idx}`}>
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
                <button type="button" className={isAdded ? "added" : ""} onClick={(event) => {
                  if (isAdded) {
                    onRemoveFromCart(product);
                  } else {
                    animateProductToCart(event.currentTarget);
                    onAddToCart(product);
                  }
                }} aria-live="polite">
                  {isAdded ? "Remove" : "Add to Cart"}
                </button>
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
    </section>
  );
}
