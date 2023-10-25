export function removeTrailingSlash(url: string) {
  if (url.endsWith('/')) return url.slice(0, url.length - 1);
  return url;
}

export function joinToUrl(url: string, complement: string) {
  return [removeTrailingSlash(url), complement].join('/');
}
