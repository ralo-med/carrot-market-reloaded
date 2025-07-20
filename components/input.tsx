import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string[];
}

export default function Input({
  errors = [],
  className,
  ...inputProps
}: InputProps) {
  const mergedClassName = `bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 ${
    className ?? ""
  }`;

  return (
    <div className="flex flex-col gap-2">
      <input {...inputProps} className={mergedClassName.trim()} />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
