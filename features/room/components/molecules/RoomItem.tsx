import Image from 'next/image';

type RoomItemProps = {
    imgPath: string;
    price: number;
    link?: string;
    title: string;
}
function RoomItem({ imgPath, price, link, title }: RoomItemProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-gray-200 rounded-lg overflow-hidden relative aspect-video">
        <Image 
          src={imgPath}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <a href={link ?? "#"} className="text-lg font-medium text-blue-500 hover:underline">From ${price} / Night</a>
      </div>
    </div>
  );
}

export default RoomItem;