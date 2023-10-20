import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { SheetHeader } from "./sheet";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/products";

const Cart = () => {
  const { products } = useContext(CartContext);

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
    </>
  );
};

export default Cart;
