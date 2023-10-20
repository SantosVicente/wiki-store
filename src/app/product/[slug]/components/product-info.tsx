"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductWithTotalPrice } from "@/helpers/products";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircle,
  ShoppingCartIcon,
} from "lucide-react";
import { useContext, useState } from "react";

import Truck from "../assets/Truck.svg";
import Image from "next/image";
import { CartContext } from "@/providers/cart";

interface ProductInfoProps {
  product: ProductWithTotalPrice;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [alterButton, setAlterButton] = useState(false);

  const { addProductToCart } = useContext(CartContext);

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) =>
      prevQuantity - 1 <= 0 ? 1 : prevQuantity - 1,
    );
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleAddProductToCartClick = () => {
    addProductToCart({ ...product, quantity });

    setAlterButton(true);
  };

  return (
    <div className="flex flex-col gap-5 px-5">
      <div>
        <h2 className="text-lg">{product.name}</h2>
        {/*colocar avaliação dos clientes aqui e falando se o produto está disponível ou não no estoque */}
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold">
            R$ {product.totalPrice.toFixed(2)}
          </h1>
          {product.discountPercentage > 0 && (
            <Badge className="rounded-2xl px-2 py-[2px]">
              <ArrowDownIcon size={14} /> {product.discountPercentage}%
            </Badge>
          )}
        </div>
        {product.discountPercentage > 0 && (
          <p className="text-sm opacity-60">
            De:{" "}
            <span className="line-through">
              R$ {Number(product.basePrice).toFixed(2)}
            </span>
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline" onClick={handleDecreaseQuantity}>
          <ArrowLeftIcon size={16} />
        </Button>

        <span>{quantity}</span>

        <Button size="icon" variant="outline" onClick={handleIncreaseQuantity}>
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-justify text-sm opacity-60">{product.description}</p>
      </div>

      {!alterButton ? (
        <Button
          className="h-12 gap-1 rounded-xl uppercase"
          onClick={handleAddProductToCartClick}
        >
          <ShoppingCartIcon size={16} />
          <p className="font-bold">Adicionar ao Carrinho</p>
        </Button>
      ) : (
        <Button className="h-12 gap-1 rounded-xl bg-emerald-500 uppercase text-zinc-800 hover:bg-emerald-500">
          <CheckCircle size={16} />
          <p className="font-bold">Produto Adicionado</p>
        </Button>
      )}

      <div className="flex items-center justify-between rounded-lg bg-accent px-8 py-5">
        <div className="flex gap-2">
          <Image src={Truck} alt="Truck" height={25} />
          <div>
            <p>
              Entreva via <span className="font-bold italic">FSPacket®</span>
            </p>
            <p className="text-xs text-[rgb(154,133,238)]">
              Envio para <span className="font-bold">todo o Brasil</span>
            </p>
          </div>
        </div>
        <p className="text-sm font-bold">Frete Gratís</p>
      </div>
    </div>
  );
};

export default ProductInfo;
