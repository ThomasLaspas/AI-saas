import Stripe from "stripe";
import { headers } from "next/headers";
import { createSupbaseAdmin } from "@/supabase/Sadmin";
import { buffer } from "node:stream/consumers";

const endpointSecret = process.env.NEXT_STRIPE_WEBHOOKLOCAL!;

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!);

export async function POST(req: any) {
  const rawBody = await buffer(req.body);
  try {
    const sig = headers().get("stripe-signature");
    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
    } catch (err: any) {
      return Response.json({ error: `Webhook Error ${err?.message!} ` });
    }
    switch (event.type) {
      case "customer.subscription.deleted":
        const deleteSubscription = event.data.object;
        await onCacnelSubscription(
          deleteSubscription.status === "active",
          deleteSubscription.id
        );
        break;
      case "customer.updated":
        const customer = event.data.object;
        const subscription = await stripe.subscriptions.list({
          customer: customer.id,
        });
       
        if (subscription.data.length) {
          const sub = subscription.data[0];

          await onSuccessSubscription(
            sub.id,
            customer.id,
            sub.status === "active",
            customer.email!
          );
        }
      default:
      
    }
    return Response.json({});
  } catch (e) {
    return Response.json({ error: `Webhook Error}` });
  }
}

const onSuccessSubscription = async (
  subscription_id: string,
  customer_id: string,
  premium: boolean,
  email: string
) => {
  const supabase = await createSupbaseAdmin();
  const { data,error} = await supabase
    .from("users")
    .update({
      stripe_subscription_id: subscription_id,
      stripe_customer_id: customer_id,
      premium: premium,
    })
    .eq("email", email)
    .select("id")
    .single();
    if(error){
      console.log(error)
    }
   
  await supabase.auth.admin.updateUserById(data?.id!, {
    user_metadata: { stripe_customer_id: null },
  });
};

const onCacnelSubscription = async (
  premium: boolean,
  subscription_id: string
) => {
  const supabase = await createSupbaseAdmin();
  const { data, error } = await supabase
    .from("users")
    .update({
      stripe_subscription_id: null,
      stripe_customer_id: null,
      premium: premium,
    })
    .eq("stripe_subscription_id", subscription_id)
    .select("id")
    .single();
    if(error){
      console.log(error)
    }
  

  await supabase.auth.admin.updateUserById(data?.id!, {
    user_metadata: { stripe_customer_id: null },
  });
};
