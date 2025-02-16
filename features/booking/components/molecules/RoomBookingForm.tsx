import { Bed, Calendar, Users } from 'lucide-react';


function RoomBookingForm() {
  return (
    <form>
      <div>
        <div>
          <Bed />
        </div>
        <div>
          <label>Room Type</label>
          <input type="text" value={"King Room"} readOnly disabled />
        </div>
      </div>
      <div>
        <div>
          <Calendar />
        </div>
        <div>
          <label>Check In</label>
          <input type="date" />
        </div>
      </div>
      <div>
        <div>
          <Calendar />
        </div>
        <div>
          <label>Check Out</label>
          <input type="date" />
        </div>
      </div>
      <div>
        <div>
          <Users />
        </div>
        <div>
          <label>Guests</label>
          <input type="number" min={1} value={3} max={12} />
        </div>
      </div>
      <div>
        <button>Book Now</button>
      </div>
    </form>
  );
}

export default RoomBookingForm;
