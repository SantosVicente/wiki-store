"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductWithTotalPrice } from "@/helpers/products";
import { Product } from "@prisma/client";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  LucideTruck,
  ShoppingCartIcon,
  TruckIcon,
} from "lucide-react";
import { useState } from "react";

import Truck from "../assets/Truck.svg";
import Image from "next/image";

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    "description" | "basePrice" | "discountPercentage" | "totalPrice" | "name"
  >;
}

const ProductInfo = ({
  product: { name, basePrice, discountPercentage, description, totalPrice },
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) =>
      prevQuantity - 1 <= 0 ? 1 : prevQuantity - 1,
    );
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  return (
    <div className="flex flex-col gap-5 px-5">
      <div>
        <h2 className="text-lg">{name}</h2>
        {/*colocar avaliação dos clientes aqui e falando se o produto está disponível ou não no estoque */}
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold">R$ {totalPrice.toFixed(2)}</h1>
          {discountPercentage > 0 && (
            <Badge className="rounded-2xl px-2 py-[2px]">
              <ArrowDownIcon size={14} /> {discountPercentage}%
            </Badge>
          )}
        </div>
        {discountPercentage > 0 && (
          <p className="text-sm opacity-60">
            De:{" "}
            <span className="line-through">
              R$ {Number(basePrice).toFixed(2)}
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
        <p className="text-justify text-sm opacity-60">{description}</p>
      </div>

      <Button className="h-12 gap-1 rounded-xl uppercase">
        <ShoppingCartIcon size={16} />
        <p className="font-bold">Adicionar ao Carrinho</p>
      </Button>

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
