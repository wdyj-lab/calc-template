const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#EAEAEA" offset="20%" />
      <stop stop-color="#D8D8D8" offset="50%" />
      <stop stop-color="#EAEAEA" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#EAEAEA" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export default shimmer;
