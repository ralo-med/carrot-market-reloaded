"use server";

import db from "@/lib/db";
import { z } from "zod";

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

export async function getProductData(idParam: string) {
  const idSchema = z.coerce.number().positive();
  const result = idSchema.safeParse(idParam);

  if (!result.success) {
    return null;
  }

  const id = result.data;
  const product = await getProduct(id);
  return product;
}
