"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export async function deleteProduct(productId: number) {
  const session = await getSession();

  if (!session.id) {
    throw new Error("로그인이 필요합니다.");
  }

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      userId: true,
    },
  });

  if (!product) {
    throw new Error("제품을 찾을 수 없습니다.");
  }

  if (product.userId !== session.id) {
    throw new Error("삭제 권한이 없습니다.");
  }

  await db.product.delete({
    where: {
      id: productId,
    },
  });

  redirect("/products");
}
