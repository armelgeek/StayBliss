import Image from "next/image";
import Link from "next/link";
type Props = {
  id: string;
  imgPath: string;
  price: number;
  link: string;
  title: string;
};
function RoomItem({ id, imgPath, price, link, title }: Props) {
  return (
    <div>
      <div>
        <div>
          <Image fill src={`${imgPath}`} alt="" />
        </div>
        <div>
          <div>
            <h2>{title}</h2>
            <Link href={`rooms/${id}`}>From ${price} / Night</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomItem;
