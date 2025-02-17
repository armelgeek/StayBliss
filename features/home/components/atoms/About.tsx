import Image from 'next/image';

function About() {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-row">
          <div className="w-1/3 md:text-left  px-4">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mt-0 mb-2">
              About Us
            </h2>
            <p className="text-gray-600 text-base md:text-xl font-light leading-relaxed mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis perferendis itaque iure consequatur iusto
              omnis sapiente, doloribus animi velit vero impedit repellendus minus eaque quos voluptatum eum obcaecati
              ducimus sequi! Blanditiis impedit praesentium labore amet. Numquam molestias, praesentium iste minus quis
              cupiditate ea voluptatem natus, impedit perferendis distinctio ullam atque enim error, quasi sit? Iure
              quibusdam aperiam nostrum enim. Sequi.
            </p>
          </div>
          <div className="w-2/3 md:pl-12 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <Image 
              src="/bg.png" 
              alt="Description" 
              width={800} 
              height={600} 
              layout="responsive" 
              className="relative"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
