import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { SheetHeader } from "./sheet";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/products";
import { Separator } from "@radix-ui/react-separator";

const Cart = () => {
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);

  return (
    <>
      <SheetHeader className="text-left text-lg font-semibold">
        <Badge
          className="w-fit gap-1 rounded-3xl border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
          variant="outline"
        >
          <ShoppingCartIcon size={16} color="white" />
          Carrinho
        </Badge>
      </SheetHeader>

      <div className="flex flex-col gap-5">
        {products.length === 0 ? (
          <p className="text-center text-sm text-gray-400">
            Seu carrinho está vazio
          </p>
        ) : (
          products.map((product) => (
            <CartItem
              key={product.id}
              product={computeProductTotalPrice(product as any) as any}
            />
          ))
        )}
      </div>
      {products.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="h-[1px] w-full bg-zinc-800" />

          <div className="flex items-center justify-between text-sm opacity-60">
            <p>Subtotal</p>
            <p className="line-through">R$ {subtotal.toFixed(2)}</p>
          </div>

          <div className="h-[1px] w-full bg-zinc-800" />

          <div className="flex items-center justify-between text-sm">
            <p>Entrega</p>
            <p className="uppercase">Grátis</p>
          </div>

          <div className="h-[1px] w-full bg-zinc-800" />

          <div className="flex items-center justify-between text-sm">
            <p>Desconto</p>
            <p>- R$ {totalDiscount.toFixed(2)}</p>
          </div>

          <div className="h-[1px] w-full bg-zinc-800" />

          <div className="flex items-center justify-between text-base font-bold">
            <p>Total a Pagar</p>
            <p>R$ {total.toFixed(2)}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
