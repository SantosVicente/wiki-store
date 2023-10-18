import Image, { ImageProps } from "next/image";

const PromoBanner = ({ src, alt, ...props }: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      className="h-auto w-full px-5"
      {...props}
    />
  );
};

export default PromoBanner;
