export function animateProductToCart(source: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const image = source.closest("article, main")?.querySelector<HTMLImageElement>(".product-render, .product-detail-stage img");
  if (!image) return;

  const start = image.getBoundingClientRect();
  const cart = document.querySelector<HTMLElement>(".classic-header-cart, .category-cart, .header-cart-link, .order-header-cart");
  const header = document.querySelector<HTMLElement>(".classic-reference-nav, .category-header, .product-detail-header");
  const end = cart?.getBoundingClientRect();
  const endX = end ? end.left + end.width / 2 : window.innerWidth - 54;
  const endY = end ? end.top + end.height / 2 : (header?.getBoundingClientRect().top || 0) + 38;
  const size = Math.min(Math.max(start.width * .42, 56), 92);

  const flyer = image.cloneNode(true) as HTMLImageElement;
  flyer.className = "cart-product-flyer";
  flyer.style.left = `${start.left + start.width / 2 - size / 2}px`;
  flyer.style.top = `${start.top + start.height / 2 - size / 2}px`;
  flyer.style.width = `${size}px`;
  flyer.style.height = `${size}px`;
  document.body.appendChild(flyer);

  const deltaX = endX - (start.left + start.width / 2);
  const deltaY = endY - (start.top + start.height / 2);
  const tilt = deltaX >= 0 ? 7 : -7;

  image.animate(
    [
      { transform: "translateY(0) scale(1)" },
      { transform: "translateY(-5px) scale(1.04)", offset: .45 },
      { transform: "translateY(0) scale(1)" },
    ],
    { duration: 360, easing: "cubic-bezier(.2,.8,.2,1)" },
  );

  const animation = flyer.animate(
    [
      { transform: "translate3d(0,0,0) rotate(0deg) scale(.92)", opacity: 0, offset: 0 },
      { transform: `translate3d(${deltaX * .08}px,-12px,0) rotate(${tilt * .2}deg) scale(1.04)`, opacity: 1, offset: .12 },
      { transform: `translate3d(${deltaX * .38}px,${deltaY * .16 - 58}px,0) rotate(${tilt}deg) scale(.9)`, opacity: 1, offset: .42 },
      { transform: `translate3d(${deltaX * .72}px,${deltaY * .56 - 42}px,0) rotate(${tilt * .55}deg) scale(.62)`, opacity: .96, offset: .72 },
      { transform: `translate3d(${deltaX}px,${deltaY}px,0) rotate(0deg) scale(.16)`, opacity: .18, offset: 1 },
    ],
    { duration: 780, easing: "cubic-bezier(.22,.72,.22,1)", fill: "forwards" },
  );

  animation.finished.finally(() => {
    flyer.remove();
    const currentCart = document.querySelector<HTMLElement>(".classic-header-cart, .category-cart, .header-cart-link, .order-header-cart");
    currentCart?.animate(
      [
        { transform: "scale(1)", filter: "drop-shadow(0 0 0 rgba(101,59,210,0))" },
        { transform: "scale(1.24)", filter: "drop-shadow(0 0 8px rgba(101,59,210,.5))", offset: .42 },
        { transform: "scale(.96)", offset: .72 },
        { transform: "scale(1)", filter: "drop-shadow(0 0 0 rgba(101,59,210,0))" },
      ],
      { duration: 420, easing: "cubic-bezier(.2,.75,.25,1)" },
    );
  });
}
