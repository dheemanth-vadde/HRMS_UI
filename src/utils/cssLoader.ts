export function addStylesheet(id: string, href: string) {
  if (typeof document === "undefined") return;
  // remove if exists so it ends up last in the head (ensures load-order)
  const existing = document.getElementById(id) as HTMLLinkElement | null;
  if (existing) existing.remove();

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  // optional: link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}

export function removeStylesheet(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (el) el.remove();
}