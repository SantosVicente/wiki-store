"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format, sub } from "date-fns";
import OrderProductItem from "./order-product-item";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { computeProductTotalPrice } from "@/helpers/products";
import { getOrderStatus } from "../helpers/status";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const subtotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    }, 0);
  }, [order]);

  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      const productWithTotalPrice = computeProductTotalPrice(
        orderProduct.product,
      );
      return acc + productWithTotalPrice.totalPrice * orderProduct.quantity;
    }, 0);
  }, [order]);

  const totalDiscount = useMemo(() => {
    return subtotal - total;
  }, [subtotal, total]);

  return (
    <Card className="">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value="aaaa">
          <AccordionTrigger>
            <div className="flex cursor-pointer flex-col gap-1 px-5 text-left">
              <h2>Pedido com {order.orderProducts.length} produto(s)</h2>
              <p className="opacity-60">
                Feito em {format(order.createdAt, "d/MM/y 'às' HH:mm")}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4 px-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col font-bold">
                  <span>STATUS</span>
                  <span className="text-sm uppercase text-[#8162FF]">
                    {getOrderStatus(order.status)}
                  </span>
                </div>

                <div className="flex flex-col font-bold">
                  <span>DATA</span>
                  <span className="text-sm font-medium text-zinc-400">
                    {format(order.createdAt, "d/MM/y")}
                  </span>
                </div>

                <div className="flex flex-col font-bold">
                  <span>PAGAMENTO</span>
                  <span className="text-sm font-medium text-zinc-400">
                    CARTÃO
                  </span>
                </div>
              </div>

              {order.orderProducts.map((orderProduct) => (
                <OrderProductItem
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                />
              ))}

              <div className="flex w-full flex-col gap-1 text-sm">
                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Subtotal</p>
                  <p>R$ {subtotal.toFixed(2)}</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Entrega</p>
                  <p className="uppercase">GRATÍS</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Discontos</p>
                  <p>-R$ {totalDiscount.toFixed(2)}</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3 text-sm font-bold">
                  <p>Total</p>
                  <p>R$ {total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
