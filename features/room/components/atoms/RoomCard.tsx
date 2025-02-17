import Card from "@/shared/components/atoms/Card";
import { cn } from "@/shared/lib/utils";

type Props = {
  className?: string;
};

function RoomCard({ className }: Props) {
  return (
    <Card className={cn("flex flex-col overflow-hidden rounded-lg shadow-lg", className)}>
      <Card.Thumbnail className="relative h-48 w-full">
        <img src={"/room.png"} alt="" className="h-full w-full object-cover" />
        <div className="absolute top-0 left-0 h-full w-full bg-gray-900 opacity-50" />
      </Card.Thumbnail>

      <Card.Description className="p-4">
        <h2 className="text-lg font-bold">Bed Room</h2>

        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia voluptates amet atque.
        </p>
      </Card.Description>
    </Card>
  );
}

export default RoomCard;
