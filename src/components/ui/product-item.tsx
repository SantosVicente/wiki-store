import { ProductWithTotalPrice } from "@/helpers/products";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Badge } from "./badge";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex min-w-[170px] flex-col gap-4">
        <div className="relative flex h-[170px] w-full items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            alt=""
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
          />

          {product.discountPercentage > 0 && (
            <Badge className="absolute left-3 top-3 rounded-2xl px-2 py-[2px]">
              <ArrowDown size={14} /> {product.discountPercentage}%
            </Badge>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </p>

          <div className="flex items-center gap-2">
            {product.discountPercentage > 0 ? (
              <>
                <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
                  R$ {product.totalPrice.toFixed(2)}
                </p>

                <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs line-through opacity-75">
                  R$ {Number(product.basePrice).toFixed(2)}
                </p>
              </>
            ) : (
              <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
