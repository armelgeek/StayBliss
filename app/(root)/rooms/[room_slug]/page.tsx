import { Bed, Bell, Calendar, DollarSign, RulerIcon, Users } from 'lucide-react';
import Slider from '@/shared/components/atoms/Slider';

function RoomDetails({ params }: { params: { room_slug: string } }) {
  console.log(params);
  return (
    <section className="container">
      <h2 >King Room</h2>

      <ul>
        <li>
          <span>
            <Bell/>
          </span>
          <span>Sleeps:</span> 2 Adults
        </li>
        <li>
          <span>
            <RulerIcon/>
          </span>
          <span>Size:</span> 35m²
        </li>
        <li>
          <span>
            <DollarSign />
          </span>
          <span>Price:</span> from $300 / night
        </li>
      </ul>

      <div>
        <Slider images={["/bg.png", "/bg.png", "/bg.png"]} />
      </div>

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

      <div>
        <h3>Room Description</h3>

        <hr/>

        <div>
          <p>
            Etiam at hendrerit sem. Quisque porta velit quis dolor interdum, sit amet imperdiet leo posuere. Nam id nisl
            scelerisque, commodo ex vel, vulputate eros. Aenean sit amet rutrum odio. Suspendisse faucibus ac turpis et
            tincidunt. Cras non quam mauris. Nullam commodo a urna sed faucibus. Nam dolor odio, eleifend quis dictum
            aliquet, ultrices vel purus.
          </p>
          <p>
            Phasellus at congue lectus, sit amet tincidunt nunc. Vivamus fermentum nunc ac dui faucibus consequat.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin hendrerit sit
            amet est at laoreet. Nam auctor rhoncus accumsan. Morbi et turpis ac ligula tempor tincidunt.
          </p>
        </div>
      </div>

      {/* <div>Slider</div>
      <div>Facilities</div>

      <div>Video Tour</div> */}
    </section>
  );
}

export default RoomDetails;
