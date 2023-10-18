"use client";

import Image from "next/image";
import Categories from "./components/catagories";

export default function Home() {
  return (
    <div className="p-5">
      <Image
        src="/banner-home-01.png"
        alt="Até 55% de desconto só nesse mês!"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full"
      />

      <div className="mt-8">
        <Categories />
      </div>
    </div>
  );
}
