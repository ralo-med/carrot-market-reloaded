import { formatToTimeAgo, formatToWon } from "../lib/utils";
import Image from "next/image";
import Link from "next/link";
import { PhotoIcon } from "@heroicons/react/24/solid";

interface ListProductProps {
  title: string;
  price: number;
  createdAt: Date;
  photo: string | null;
  id: number;
}

export default function ListProduct({
  title,
  price,
  createdAt,
  photo,
  id,
}: ListProductProps) {
  return (
    <Link href={`/products/${id}`} className="flex gap-5">
      <div className="relative size-28 rounded-md overflow-hidden bg-gray-200">
        {photo ? (
          <Image
            fill
            src={photo}
            alt={title}
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PhotoIcon className="h-8 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(createdAt.toString())}
        </span>
        <span className="text-lg font-semibold">{formatToWon(price)}원</span>
      </div>
    </Link>
  );
}
