const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function sitePath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
