"use cache"; // ① 파일 전체를 "정적"으로 생성
import { cache } from "react"; // ② React-19 공식 캐시 API
import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";

export const metadata = {
  title: "Products",
  description: "Products",
};

// 60초마다 자동으로 revalidate
export const revalidate = 60;

// ③ DB-쿼리를 캐싱
const getInitialProducts = cache(
  async () =>
    await db.product.findMany({
      select: {
        title: true,
        price: true,
        createdAt: true,
        photo: true,
        id: true,
      },
      take: 1,
      orderBy: { createdAt: "desc" },
    })
);

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export default async function Products() {
  const initialProducts = await getInitialProducts(); // 중복 호출도 1회만 실행
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/products/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
