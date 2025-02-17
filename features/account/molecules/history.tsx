import { Trash2 } from "lucide-react";
import Image from "next/image";

function History() {
  return (
    <>
      <h3>Your History</h3>
      <div>
        <article>
          <div>
            <Image 
              src="/bg.png"
              alt="Room preview"
              width={200}
              height={150}
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div>
            <div>
              <h2>King Room</h2>
              <p>4 Guests</p>
              <p>20-08-2024 / 04-09-2024</p>
            </div>
            <div>
              <p>$465.00</p>
              <button>
                <Trash2/>
              </button>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

export default History;