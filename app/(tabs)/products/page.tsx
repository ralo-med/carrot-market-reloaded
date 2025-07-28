import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";

export const metadata = {
  title: "Products",
  description: "Products",
};

// ③ DB-쿼리를 캐싱
export async function getInitialProducts() {
  "use cache";
  cacheLife({ revalidate: 60 }); // 60초(1분) 주기로 재검사
  cacheTag("products"); // 태그로 무효화할 수 있게
  return db.product.findMany({
    select: {
      title: true,
      price: true,
      createdAt: true,
      photo: true,
      id: true,
    },
    take: 1,
    orderBy: { createdAt: "desc" },
  });
}

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
