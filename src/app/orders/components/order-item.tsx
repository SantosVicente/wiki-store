"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: true;
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card className="">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value="aaaa">
          <AccordionTrigger>
            <div className="flex cursor-pointer flex-col gap-1 px-5 text-left">
              Pedido com {order.orderProducts.length} produto(s)
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-5 ">
                <div className="flex flex-col font-bold">
                  <span>STATUS</span>
                  <span className="text-sm text-[#8162FF]">{order.status}</span>
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
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
