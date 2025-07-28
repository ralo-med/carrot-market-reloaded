import ModalSkeleton from "@/components/modal-skeleton";
import CloseButton from "@/components/close-button";
import ModalWrapper from "@/components/modal-wrapper";

export default function Loading() {
  return (
    <ModalWrapper>
      <CloseButton />

      <div className="w-full max-w-md mx-auto">
        <ModalSkeleton />
      </div>
    </ModalWrapper>
  );
}
