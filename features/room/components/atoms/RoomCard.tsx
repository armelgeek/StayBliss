import Card from '@/shared/components/atoms/Card';

function RoomCard() {
  return (
    <Card>
      <Card.Thumbnail>
        <img src={"/room.png"} alt="" />
      </Card.Thumbnail>

      <Card.Description>
        <h2>Bed Room</h2>

        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia voluptates amet atque.</p>
      </Card.Description>
    </Card>
  );
}

export default RoomCard;
