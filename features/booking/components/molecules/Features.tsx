import { Bed, DollarSign, Ruler } from 'lucide-react';

function Features() {
  return (
    <ul>
      <li>
        <span>
          <Bed />
        </span>
        <span>Sleeps:</span> 2 Adults
      </li>
      <li>
        <span>
          <Ruler />
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
  );
}

export default Features;
