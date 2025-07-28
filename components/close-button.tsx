"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function CloseButton() {
  const router = useRouter();

  const onCloseClick = () => {
    router.back();
  };

  return (
    <button
      onClick={onCloseClick}
      className="absolute right-4 top-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all duration-200 hover:scale-110"
    >
      <XMarkIcon className="size-6" />
    </button>
  );
}
