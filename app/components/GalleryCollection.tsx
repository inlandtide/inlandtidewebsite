"use client";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

type Photo = { src: string; alt: string; width: number; height: number };
export default function GalleryCollection({
  images,
  label,
}: {
  images: Photo[];
  label: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const labelId = useId();
  useEffect(() => {
    if (active === null) return;
    const element = dialog.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!element?.open) element?.showModal();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
  function close() {
    dialog.current?.close();
    setActive(null);
  }
  function move(delta: number) {
    setActive((index) =>
      index === null ? null : (index + delta + images.length) % images.length,
    );
  }
  return (
    <>
      <div className="gallery-photo-grid">
        {images.map((image, index) => (
          <button
            className="gallery-photo"
            type="button"
            key={image.src}
            onClick={() => setActive(index)}
            aria-label={`Enlarge ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
            />
            <span aria-hidden="true">View detail ↗</span>
          </button>
        ))}
      </div>
      <dialog
        className="gallery-dialog"
        ref={dialog}
        aria-labelledby={labelId}
        onCancel={() => setActive(null)}
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
        }}
      >
        {active !== null && (
          <div className="lightbox-inner">
            <button
              type="button"
              className="lightbox-close"
              onClick={close}
              aria-label="Close photo"
            >
              Close ×
            </button>
            <Image
              src={images[active].src}
              alt={images[active].alt}
              width={images[active].width}
              height={images[active].height}
              sizes="90vw"
            />
            <div className="lightbox-controls">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Previous photo"
              >
                ←
              </button>
              <p id={labelId}>
                {label} · {active + 1} / {images.length}
              </p>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Next photo"
              >
                →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
