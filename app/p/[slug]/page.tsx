import { products, iphoneAccessories } from '@/lib/products';
import PDP from './pdp';

// This function will generate the list of slugs (product IDs) for static pages
export async function generateStaticParams() {
  const allProducts = [...products, ...iphoneAccessories]; // Merge both products and accessories
  return allProducts.map((item) => ({
    slug: item.id, // Use the product's or accessory's ID as the slug
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string }; // Directly type the params as an object with a slug string
}) {
  const { slug } = params; // Destructure the slug directly from params
  return <PDP slug={slug} />; // Pass the slug to the PDP component
}
