import { Coffee, Wifi } from 'lucide-react';


function Facilities() {
  return (
    <div>
      <h3 className="text-center">Facilities</h3>
      <hr className="decriptionDivider" />
      <table>
        <tbody>
        <tr>
          <td>
              <span>
                <Wifi /> <span>High speed in-room wifi</span>
              </span>
          </td>
          <td>
              <span>
                <Coffee /> <span>Restaurant</span>
              </span>
          </td>
        </tr>
        <tr>
          <td>
              <span>
                <span>Swimming Pool</span>
              </span>
          </td>
          <td>
              <span>
                <span>Child Care</span>
              </span>
          </td>
        </tr>
        <tr>
          <td>
              <span>
                <span>Hot Tub</span>
              </span>
          </td>
          <td>
              <span>
                <span>Games Room</span>
              </span>
          </td>
        </tr>
        <tr>
          <td>
              <span>
                <span>Bath</span>
              </span>
          </td>
          <td>
              <span>
                <span>Wheelchair access</span>
              </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Facilities;
