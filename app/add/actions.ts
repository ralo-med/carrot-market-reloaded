"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidateTag, revalidatePath } from "next/cache";
import { PRODUCTS_TAG } from "@/app/(tabs)/products/tags";

const productSchema = z.object({
  photo: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "Photo is required"
        : "Photo must be a string!",
  }),
  title: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "Title is required"
        : "Title must be a string!",
  }),
  description: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "Description is required"
        : "Description must be a string!",
  }),
  price: z.coerce.number({
    error: (issue) =>
      issue.input === undefined
        ? "Price is required"
        : "Price must be a number!",
  }),
});

export async function uploadProduct(_: unknown, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.writeFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return z.flattenError(result.error);
  } else {
    const session = await getSession();
    if (session.id) {
      const product = await db.product.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          price: result.data.price,
          photo: result.data.photo,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });

      // ① 데이터 캐시 비우기
      revalidateTag(PRODUCTS_TAG); // → getInitialProducts 가 다시 실행됨
      // ② 페이지 HTML도 새로 만들고 싶다면
      revalidatePath("/products"); // 상품 목록 페이지 무효화
      revalidatePath(`/products/${product.id}`); // 새로 생성된 상품 페이지 무효화

      redirect(`/products/${product.id}`);
      //redirect("/products")
    }
  }
}
