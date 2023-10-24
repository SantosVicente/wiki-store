import { OrderStatus } from "@prisma/client";

export const getOrderStatus = (orderStatus: OrderStatus) => {
  return {
    [OrderStatus.PAYMENT_RECEIVED]: "Pago",
    [OrderStatus.PAYMENT_FAILED]: "Erro no pagamento",
    [OrderStatus.PAYMENT_EXPIRED]: "Expirado",
    [OrderStatus.ORDER_CANCELLED]: "Pedido cancelado",
    [OrderStatus.ORDER_COMPLETED]: "Finalizado",
    [OrderStatus.WAITING_FOR_PAYMENT]: "Pendente",
  }[orderStatus];
};
