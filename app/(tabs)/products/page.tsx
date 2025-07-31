import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";

// 🔄 페이지를 항상 동적으로 렌더링 (정적 캐싱 무시)
//export const dynamic = "force-dynamic";

// ⏰ 60초마다 자동으로 페이지 재검증 (ISR)
//export const revalidate = 60;

export const metadata = {
  title: "Products",
  description: "Products",
};

// ③ DB-쿼리를 캐싱 (함수 레벨 캐싱)
async function getInitialProducts() {
  "use cache"; // 🔒 함수 결과를 캐시
  cacheLife({ revalidate: 60 }); // ⏰ 60초마다 함수 캐시 자동 재검증
  cacheTag("products"); // 🏷️ "products" 태그로 수동 무효화 가능
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
  const initialProducts = await getInitialProducts(); // 🔄 캐시된 함수 호출 (중복 호출도 1회만 실행)
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
