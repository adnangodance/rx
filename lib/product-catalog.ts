import type { Product } from "@/components/CatalogSection";

export const productFilters = ["All", "Injectables", "Capsules", "Drops & sprays", "Topicals"] as const;
export type ProductFilter = typeof productFilters[number];

export function productFormat(product: Product): Exclude<ProductFilter, "All"> {
  if (/cream|gel/i.test(product.name)) return "Topicals";
  if (/atropine|beta glucan|spray/i.test(product.name) || product.type === "dropper" || product.type === "spray") return "Drops & sprays";
  if (/capsules/i.test(product.name)) return "Capsules";
  if (["vial", "amber"].includes(product.type)) return "Injectables";
  return "Capsules";
}

export function filterProducts(products: Product[], query: string, filter: ProductFilter) {
  const search = query.trim().toLowerCase();
  return products.filter(product => (filter === "All" || productFormat(product) === filter) && `${product.name} ${product.detail}`.toLowerCase().includes(search));
}
