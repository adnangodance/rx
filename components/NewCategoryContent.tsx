"use client";

import type { Product } from "@/components/CatalogSection";
import NewProductCatalog from "@/components/NewProductCatalog";
import NewSectionReveal from "@/components/NewSectionReveal";
import "./NewCategoryContent.css";

type CategoryInfo = { slug: string; name: string; shortName: string; description: string; cover: string };
type Props = {
  category: CategoryInfo;
  products: Product[];
  cartProduct: Product | null;
  search: string;
  onSearchChange: (query: string) => void;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: () => void;
};

const careSteps = [
  ["Tell us about you", "Complete a private online intake about your health history and care goals."],
  ["Connect with a provider", "A licensed provider reviews your information and recommends the next step."],
  ["Care that fits your life", "If prescribed, receive your treatment with ongoing online support."],
];

export default function NewCategoryContent({ category, products, cartProduct, search, onSearchChange, onAddToCart, onRemoveFromCart }: Props) {
  return (
    <div className="new-category-content">
      <div className="new-category-shell">
        <NewProductCatalog key={category.slug} row={{ id: "new-category-treatments", title: `${category.shortName} treatments`, products }} addedProducts={cartProduct ? [cartProduct.name] : []} selectedProduct={cartProduct} searchQuery={search} onSearchQueryChange={onSearchChange} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} searchLabel={`Search ${category.shortName.toLowerCase()} treatments`} description="Explore your options with a licensed provider. Find care that fits your needs." browseHref="#new-category-treatments" />
        <NewSectionReveal className="new-category-process-stage">
          <section className="new-category-process" aria-labelledby="new-category-process-title">
            <header><span className="new-category-eyebrow">YOUR NEXT STEP</span><h2 id="new-category-process-title">Personal care. A simpler path.</h2><p>From your first question to ongoing support, care starts with you.</p></header>
            <div className="new-category-process-grid">{careSteps.map(([title, description], index) => <article key={title}><span className="new-category-step">0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
          </section>
        </NewSectionReveal>
      </div>
    </div>
  );
}
