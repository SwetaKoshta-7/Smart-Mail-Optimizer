import { LoaderCircle } from "lucide-react";

export default function Loader({
  text = "Loading...",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <LoaderCircle
        className="animate-spin text-blue-600"
        size={45}
      />

      <p className="mt-4 text-gray-500">

        {text}

      </p>

    </div>
  );
}