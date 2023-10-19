import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { SheetHeader } from "./sheet";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";

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

      {products.map((product) => (
        <h1 key={product.id}>{product.name}</h1>
      ))}
    </>
  );
};

export default Cart;
