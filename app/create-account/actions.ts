"use server";
import { z } from "zod";

export interface ActionState {
  fieldErrors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirm_password?: string[];
  };
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/;

function checkUsername(username: string) {
  return !String(username).includes("potato");
}

const formSchema = z
  .object({
    username: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Where is my username???"
            : "Username must be a string!",
      })
      .min(3, { error: "Way too short!!!" })
      .trim()
      .toLowerCase()
      .transform((username) => `🔥 ${username}`)
      .refine(checkUsername, { error: "No potatoes allowed!" }),
    email: z.email().toLowerCase(),
    password: z
      .string()
      .min(4, { error: "Password too short" })
      .regex(passwordRegex, {
        error:
          "Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-",
      }),
    confirm_password: z
      .string()
      .min(4, { error: "Confirm password too short" }),
  })
  .check((ctx) => {
    // ctx.value 는 현재 파싱 중인 전체 객체입니다.
    const { password, confirm_password } = ctx.value as {
      password: string;
      confirm_password: string;
    };
    if (password !== confirm_password) {
      ctx.issues.push({
        code: "custom",
        message: "Two passwords should be equal",
        path: ["confirm_password"],
        input: confirm_password,
      });
    }
  });

export async function createAccount(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = Object.fromEntries(formData.entries());
  const result = formSchema.safeParse(data);
  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);
    return { fieldErrors };
  }
  return {};
}
