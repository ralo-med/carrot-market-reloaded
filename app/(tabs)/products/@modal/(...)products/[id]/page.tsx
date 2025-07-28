import { PhotoIcon, UserIcon } from "@heroicons/react/24/solid";
import { formatToWon } from "@/lib/utils";
import Image from "next/image";
import { getProductData } from "./actions";
import CloseButton from "@/components/close-button";
import ModalWrapper from "@/components/modal-wrapper";

export default async function Modal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductData(id);

  if (!product) {
    return (
      <ModalWrapper>
        <CloseButton />
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-6 text-center">
          <div className="text-red-500 text-lg font-semibold mb-2">오류</div>
          <div className="text-gray-600">상품을 찾을 수 없습니다.</div>
        </div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper>
      <CloseButton />

      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* 상품 이미지 */}
          <div className="relative aspect-square">
            {product.photo ? (
              <Image
                src={product.photo}
                alt={product.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <PhotoIcon className="h-20 text-gray-400" />
              </div>
            )}
          </div>

          {/* 사용자 정보 */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                {product.user.avatar ? (
                  <Image
                    src={product.user.avatar}
                    alt={product.user.username}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <UserIcon className="h-5 text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {product.user.username}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(product.createdAt).toLocaleDateString("ko-KR")}
                </div>
              </div>
            </div>
          </div>

          {/* 상품 정보 */}
          <div className="p-4">
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            {product.description && (
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* 가격 */}
          <div className="p-4 bg-gray-50">
            <div className="text-2xl font-bold text-orange-500">
              {formatToWon(product.price)}원
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
