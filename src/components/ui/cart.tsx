import { CircleDollarSign, ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { SheetHeader } from "./sheet";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/products";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { createOrder } from "@/actions/order";
import { useSession } from "next-auth/react";

const Cart = () => {
  const { data } = useSession();
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);

  const handleFinishPurchaseClick = async () => {
    if (!data?.user) {
      alert("Você precisa estar logado para finalizar a compra");
      return;
    }

    await createOrder(products, (data?.user as any).id);

    const checkout = await createCheckout(products);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

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

      <ScrollArea className="h-full">
        <div className="flex h-full flex-col gap-5">
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
      </ScrollArea>
      {products.length > 0 && (
        <div className="flex flex-col gap-3">
          <Separator />

          <div className="flex items-center justify-between text-sm opacity-60">
            <p>Subtotal</p>
            <p className="line-through">R$ {subtotal.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm">
            <p>Entrega</p>
            <p className="uppercase">Grátis</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm">
            <p>Desconto</p>
            <p>- R$ {totalDiscount.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-base font-bold">
            <p>Total a Pagar</p>
            <p>R$ {total.toFixed(2)}</p>
          </div>

          <Button
            className="h-12 gap-1 rounded-xl uppercase"
            onClick={handleFinishPurchaseClick}
          >
            <CircleDollarSign size={16} />
            <p className="font-bold">Finalizar Compra</p>
          </Button>
        </div>
      )}
    </>
  );
};

export default Cart;
