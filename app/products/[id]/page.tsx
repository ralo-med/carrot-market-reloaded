import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToWon } from "@/lib/utils";
import { UserIcon, PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { deleteProduct } from "./actions";

// 🔄 정적 생성을 위한 경로 생성 (SSG) - 교육용
// export async function generateStaticParams() {
//   const products = await db.product.findMany({
//     select: { id: true },
//   });
//
//   return products.map((product) => ({
//     id: product.id.toString(),
//   }));
// }

// 📝 Next.js 동적 라우팅 옵션 설명:
// 1. generateStaticParams: 빌드 시 정적 페이지 생성 (SSG)
// 2. dynamic = "force-dynamic": 항상 동적 렌더링 (SSR)
// 3. dynamic = "force-static": 항상 정적 렌더링 (SSG)
// 4. dynamicParams = false: generateStaticParams로 생성되지 않은 경로는 404
// 5. dynamicParams = true: 동적 경로 허용 (기본값)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(Number(id));

  return {
    title: product?.title,
    description: product?.description,
  };
}

async function getIsOwner(userId: number) {
  // 🔒 세션 기능 (동적 모드)
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;

  // 🔒 정적 생성용 임시 코드 (교육용)
  // return false; // 임시로 항상 false 반환
}

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

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const idSchema = z.coerce.number().positive();
  const result = idSchema.safeParse(idParam);

  if (!result.success) {
    return notFound();
  }

  const id = result.data;
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = await getIsOwner(product.userId);
  return (
    <div>
      <div className="relative aspect-square bg-gray-200">
        {product.photo ? (
          <Image
            className="object-cover"
            fill
            src={product.photo}
            alt={product.title}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PhotoIcon className="h-20 text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 rounded-full bg-gray-200">
          {product.user.avatar ? (
            <Image
              src={product.user.avatar}
              width={40}
              height={40}
              alt={product.user.username}
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <UserIcon className="h-5 text-gray-400" />
            </div>
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-xl">
          {formatToWon(product.price)}원
        </span>
        {isOwner ? (
          <form action={deleteProduct.bind(null, id)}>
            <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
              Delete product
            </button>
          </form>
        ) : null}
        <Link
          className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
          href={``}
        >
          채팅하기
        </Link>
      </div>
    </div>
  );
}
