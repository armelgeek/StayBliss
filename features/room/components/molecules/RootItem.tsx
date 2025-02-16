
function RoomItem({ imgPath, price, link }: { imgPath?: string; price?: string; link?: string }) {
  return (
    <div >
      <div>
        <div>
          <img src={imgPath ?? "/bg.png"} alt="" />
        </div>
        <div>
          <div>
            <h2>Room King</h2>
            <a href={link ?? "#"}>From {price} / Night</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomItem;
