export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gradient mb-8">
          당근마켓 리로디드
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 카드 컴포넌트 예시 */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">상품 등록</h2>
            <p className="text-gray-600 mb-4">새로운 상품을 등록해보세요.</p>
            <button className="btn-primary">상품 등록하기</button>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">상품 검색</h2>
            <p className="text-gray-600 mb-4">원하는 상품을 찾아보세요.</p>
            <input
              type="text"
              placeholder="상품명을 입력하세요"
              className="input-field mb-4"
            />
            <button className="btn-secondary">검색하기</button>
          </div>
        </div>

        {/* 커스텀 그림자 예시 */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-custom">
          <h3 className="text-lg font-medium mb-2">커스텀 그림자 효과</h3>
          <p className="text-gray-600">
            이 카드는 커스텀 그림자 클래스를 사용합니다.
          </p>
        </div>

        {/* rounded-sexy-name 예시 */}
        <div className="mt-8 p-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-sexy-name text-white">
          <h3 className="text-lg font-medium mb-2">Sexy Name Border Radius!</h3>
          <p className="text-pink-100">
            이제 @theme로 정의한 rounded-sexy-name을 사용합니다! 대각선으로 다른
            border-radius 값을 가진 독특한 모양입니다!
          </p>
        </div>

        {/* 추가 예시들 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-500 p-4 rounded-sexy-name text-white text-center">
            <p className="font-bold">Sexy</p>
          </div>
          <div className="bg-green-500 p-4 rounded-sexy-name text-white text-center">
            <p className="font-bold">Name</p>
          </div>
          <div className="bg-orange-500 p-4 rounded-sexy-name text-white text-center">
            <p className="font-bold">Style</p>
          </div>
        </div>

        {/* 다른 rounded 값들과 비교 */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Border Radius 비교</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-red-500 p-4 rounded text-white text-center">
              <p className="text-sm">rounded</p>
            </div>
            <div className="bg-blue-500 p-4 rounded-lg text-white text-center">
              <p className="text-sm">rounded-lg</p>
            </div>
            <div className="bg-green-500 p-4 rounded-xl text-white text-center">
              <p className="text-sm">rounded-xl</p>
            </div>
            <div className="bg-purple-500 p-4 rounded-sexy-name text-white text-center">
              <p className="text-sm">rounded-sexy-name</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
