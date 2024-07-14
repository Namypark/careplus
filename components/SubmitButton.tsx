import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
interface Submit {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}
const SubmitButton = ({ isLoading, className, children }: Submit) => {
  return (
    <Button
      type="submit"
      className={className ?? "shad-primary-btn w-full"}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            className="animate-spine
          "
            width={24}
            height={24}
          />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;