import Card from '@/shared/components/atoms/Card';

function Blog() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Blog</h2>
        <p className="text-center text-gray-600 mb-8">
          Lorem Ipsum is available, but the majority have suffered
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="flex flex-col md:flex-row">
            <Card.Thumbnail className="md:w-1/2">
              <img src="/bg.png" alt="Bed Room" className="object-cover w-full h-auto rounded-md" />
            </Card.Thumbnail>
            <Card.Description className="md:w-1/2 p-4">
              <h2 className="text-xl font-bold">Bed Room</h2>
              <p className="text-gray-500">The standard chunk</p>
              <p className="mt-2 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae veniam fugiat vero nesciunt iste
                laborum pariatur voluptatum sed. Cumque nulla officiis repellendus dolorum fugit et dolores
                doloribus. Earum, est quo!
              </p>
            </Card.Description>
          </Card>

          <Card className="flex flex-col md:flex-row">
            <Card.Thumbnail className="md:w-1/2">
              <img src="/bg.png" alt="Bed Room" className="object-cover w-full h-auto rounded-md" />
            </Card.Thumbnail>
            <Card.Description className="md:w-1/2 p-4">
              <h2 className="text-xl font-bold">Living Room</h2>
              <p className="text-gray-500">Cozy and comfortable</p>
              <p className="mt-2 text-gray-700">
                The living room is where you relax and unwind after a long day. It's essential to have a cozy
                atmosphere to enjoy your time.
              </p>
            </Card.Description>
          </Card>

          <Card className="flex flex-col md:flex-row">
            <Card.Thumbnail className="md:w-1/2">
              <img src="/bg.png" alt="Bed Room" className="object-cover w-full h-auto rounded-md" />
            </Card.Thumbnail>
            <Card.Description className="md:w-1/2 p-4">
              <h2 className="text-xl font-bold">Kitchen</h2>
              <p className="text-gray-500">Culinary adventures</p>
              <p className="mt-2 text-gray-700">
                The kitchen is the heart of the home, where delicious meals are prepared and memories are made with
                family and friends.
              </p>
            </Card.Description>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Blog;
