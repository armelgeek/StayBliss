import ReservationCard from "../atoms/ReservationCard";

function History() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <h3 className="col-span-2">Your History</h3>
        <div className="flex flex-row gap-3">
          {[1, 2, 3].map((item2, key2) => (
            <ReservationCard
              key={key2}
              thumbnailPath="/bg.png"
              title="King Room"
              date="20-08-2024 / 04-09-2024"
              status={"finished"}
              guestsCount={4}
              price={"$465"}
              className="col-span-1"
            />
          ))}
        </div>
    </div>
  );
}

export default History;