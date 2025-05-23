import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - SOiL DIARIES++',
  description: 'About SOiL++ - A ecommerce experience.',
};

export default function AboutPage() {
  return (
    <div className="mt-12 space-y-12 font-mono max-w-[700px] mx-auto">
      <h1 className="text-xl">ABOUT</h1>

      <section className="space-y-4">
        <h2 className="text-lg">SOiL ++</h2>
        <p className="leading-relaxed">
          SOiL DiARiES ++ is a minimalist ecommerce template inspired by the design
          principles of simplicity and functionality. Built with Next.js and
          modern web technologies, it offers a streamlined shopping experience
          focused on essential clothing items.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg">TECHNOLOGY</h2>
        <p className="leading-relaxed">
          Built using Next.js App Router, TypeScript, and Tailwind CSS, SOiL++
          represents a modern approach to ecommerce, prioritizing performance
          and user experience.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg">CREDIT</h2>
        <p className="leading-relaxed">
          All credit for the site design and inspiration goes to the multiplug
           .
        </p>
      </section>
    </div>
  );
}
