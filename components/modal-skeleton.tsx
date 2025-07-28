export default function ModalSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* 이미지 스켈레톤 */}
      <div className="aspect-square bg-gray-200 animate-pulse" />

      {/* 사용자 정보 스켈레톤 */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
          </div>
        </div>
      </div>

      {/* 상품 정보 스켈레톤 */}
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
      </div>

      {/* 가격 스켈레톤 */}
      <div className="p-4 bg-gray-50">
        <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
      </div>
    </div>
  );
}
