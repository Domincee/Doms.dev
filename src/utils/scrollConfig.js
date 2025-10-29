// Scroll sensitivity configuration based on screen width
// Larger values = less sensitive (require more scroll/swipe distance)
export function getScrollSensitivity() {
  const width = window.innerWidth;
  if (width < 480) return 100; // smallest phones - gentler transitions
  if (width < 768) return 80;  // phones
  if (width < 1024) return 60; // tablets
  return 50;                   // desktops
}
