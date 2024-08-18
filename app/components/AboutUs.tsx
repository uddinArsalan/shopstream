import Image from "next/Image";
export default function AboutUs() {
  return (
    <div id="aboutus" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          About ShopStream
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <Image
              src="/logo.png"
              alt="ShopStream Logo"
              width={200}
              height={200}
              className="mx-auto"
              objectFit="contain"
            />
          </div>
          <div className="md:w-2/3 md:pl-12">
            <p className="text-gray-700 mb-6 leading-relaxed">
              At ShopStream, we&apos;re passionate about bringing the latest and
              greatest products right to your doorstep. Our curated selection of
              electronics, home goods, and innovative gadgets is designed to
              enhance your everyday life.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Founded in 2020, we&apos;ve quickly become a go-to destination for
              tech enthusiasts and smart shoppers alike. Our team of experts
              works tirelessly to source high-quality products that combine
              functionality, style, and value.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Join the ShopStream community today and experience the future of
              online shopping!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
