"use client";

import { useActionState } from "react";
import { checkout as checkoutAction } from "@/actions/checkout";
import FormButton from "@/components/FormButton.client";

export default function CheckoutForm() {
  const [state, formAction] = useActionState(checkoutAction, { ok: false });

  return (
    <form action={formAction} className="mt-6">
      <input type="hidden" name="userId" value="demo_user" />
      <FormButton className="w-full">Proceed to Checkout</FormButton>

      {/* Status Messages */}
      {!state.ok && state.error && (
        <div className="text-red-600 text-sm mt-2">{state.error}</div>
      )}
      {state.ok && (
        <div className="text-green-600 text-sm mt-2">{state.data?.message}</div>
      )}
    </form>
  );
}
