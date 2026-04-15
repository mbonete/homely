const items = [
  "/apartment1.webp",
  "/apartment2.webp",
  "/apartment3.webp",
  "/apartment4.webp",
  "/apartment5.webp",
  "/apartment6.webp",
  "/apartment7.webp",
];

export default function ImageGallery() {
  return (
    <div className="hidden h-full lg:block">
      <div className="relative grid h-full grid-cols-2 grid-rows-4 gap-3 overflow-hidden rounded-2xl">
        {items.map((src, idx) => (
          <div
            key={src}
            className={`relative overflow-hidden bg-muted ${
              idx === 0 ? "col-span-2" : ""
            }`}
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
      </div>
    </div>
  );
}
