export function isWindowLandscape(innerWidth, innerHeight) {
  if (innerHeight - innerWidth > 0) {
    return false;
  }
  return true;
}

export function scrollToTop() {
  window.scrollTo(0, 0);
}
