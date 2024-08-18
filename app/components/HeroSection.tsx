import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
      <div className="bg-gray-50 py-16 text-gray-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop the Latest Tech & Home Essentials</h1>
            <p className="text-xl text-gray-600 mb-6">Discover premium products for your lifestyle.</p>
            <Link href="/#featuredproducts">
            <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition duration-300">
              Shop Now
            </button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&h=600&q=80"
              alt="Hero Image"
              width={800}
              height={600}
              priority
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    );
  }