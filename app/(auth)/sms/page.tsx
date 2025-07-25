"use client";

import Button from "@/components/btn";
import Input from "@/components/input";
import { useActionState } from "react";
import { smsLogIn } from "./actions";

const initialState = {
  token: false,
};

export default function SMSLogin() {
  const [state, dispatch] = useActionState(smsLogIn, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log in</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            name="token"
            type="number"
            placeholder="Verification code"
            required
            min={100000}
            max={999999}
            errors={[]}
          />
        ) : (
          <Input
            name="phone"
            type="text"
            placeholder="Phone number"
            required
            errors={[]}
          />
        )}
        <Button text={state.token ? "Verify Token" : "Send Verification SMS"} />
      </form>
    </div>
  );
}
