import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ size: "lg" })}>Chasing Sunrise</span>
        <div className={subtitle({ class: "mt-4" })}>
          Photographs by Kash Desai for viewing and download.
        </div>
      </div>
    </section>
  );
}
