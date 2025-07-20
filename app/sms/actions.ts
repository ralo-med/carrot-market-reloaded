"use server";

import { z } from "zod";
import validator from "validator";

const phoneSchema = z.string().trim().refine(validator.isMobilePhone);

const tokenSchema = z.coerce.number().min(100000).max(999999);

export async function smsLogIn(prevState: unknown, formData: FormData) {
  const phoneNumber = formData.get("phone");
  const verificationCode = formData.get("token");
  const parsedPhoneNumber = phoneSchema.safeParse(phoneNumber);
  const parsedVerificationCode = tokenSchema.safeParse(verificationCode);
  if (!parsedPhoneNumber.success) {
    return {
      fieldErrors: {
        phoneNumber: ["Invalid phone number"],
      },
    };
  }
  if (!parsedVerificationCode.success) {
    return {
      fieldErrors: {
        verificationCode: ["Invalid verification code"],
      },
    };
  }
  return {
    fieldErrors: {
      phoneNumber: ["Invalid phone number"],
      verificationCode: ["Invalid verification code"],
    },
  };
}
