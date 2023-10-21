import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  if (event.type === "checkout.session.completed") {
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ["line_items"],
      },
    );
    const lineItems = sessionWithLineItems.line_items;

    console.log(lineItems);
    //chamar o prisma aqui criando um model de Order para resgistrar os pedidos
    //aguardar a resposta
    //se der certo, retornar o NextResponse.json({ received: true });

    //após tudo isso, fora daqui, envie o usuário para uma página de pedido
    //conclúido na URL de success_url exindo a confirmação do pedido
  }

  return NextResponse.json({ received: true });
};
