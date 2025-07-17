"use server";

interface FormState {
  errors?: string[];
}

export async function handleForm(
  prevState: FormState | null
): Promise<FormState> {
  console.log(prevState);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    errors: ["wrong password", "password too short"],
  };
}
