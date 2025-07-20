"use server";

interface FormState {
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
}

export async function handleForm(
  prevState: FormState | null
): Promise<FormState> {
  console.log(prevState);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    fieldErrors: {
      email: ["wrong email"],
      password: ["wrong password"],
    },
  };
}
