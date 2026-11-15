import Image from "next/image";
import { SITE } from "@/lib/site";

type ImageSlotProps = {
  src?: string | null;
  imageKey?: keyof typeof SITE.imagePaths;
  caption: string;
  alt?: string;
  aspectRatio?: string;
  className?: string;
  sizes?: string;
};

export function ImageSlot({
  src,
  imageKey = "facility",
  caption,
  alt = "",
  aspectRatio = "4 / 3",
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ImageSlotProps) {
  const imageSource = src === undefined ? SITE.imagePaths[imageKey] : src;

  return (
    <figure className={`image-slot${className ? ` ${className}` : ""}`}>
      <div className="image-slot__frame" style={{ aspectRatio }}>
        {imageSource ? (
          <Image
            alt={alt}
            className="image-slot__image"
            fill
            sizes={sizes}
            src={imageSource}
          />
        ) : (
          <div aria-hidden="true" className="image-slot__placeholder">
            <span className="image-slot__register image-slot__register--tl" />
            <span className="image-slot__register image-slot__register--tr" />
            <span className="image-slot__register image-slot__register--bl" />
            <span className="image-slot__register image-slot__register--br" />
            <span className="image-slot__line" />
          </div>
        )}
      </div>
      <figcaption className="image-slot__caption">{caption}</figcaption>
    </figure>
  );
}
