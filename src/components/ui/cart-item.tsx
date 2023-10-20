"use client";

import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, Trash2 } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    removeProductFromCart,
    decreaseProductQuantity,
    increaseProductQuantity,
  } = useContext(CartContext);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">
              R$ {product.totalPrice.toFixed(2)}
            </p>

            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-60">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7"
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ArrowLeftIcon size={15} />
            </Button>

            <span className="text-xs">{product.quantity}</span>

            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7"
              onClick={() => increaseProductQuantity(product.id)}
            >
              <ArrowRightIcon size={15} />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Button
          size="icon"
          variant="outline"
          onClick={() => removeProductFromCart(product.id)}
        >
          <Trash2 size={20} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
