import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { PackageSearch } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/order-item";

const OrderPage = async () => {
  const user = getServerSession(authOptions);

  const orders = user
    ? await prismaClient.order.findMany({
        where: {
          userId: (user as any).id,
        },
        include: {
          orderProducts: true,
        },
      })
    : null;

  return (
    <div className="p-5">
      <Badge
        className="w-fit gap-1 rounded-3xl border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <PackageSearch size={16} />
        Meus Pedidos
      </Badge>

      {!user ? (
        <div className="flex flex-col pt-5">
          <p className="text-center text-sm text-gray-400">
            Você precisa estar logado para ver seus pedidos
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5 pt-8">
          {orders?.map((order) => <OrderItem key={order.id} order={order} />)}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
