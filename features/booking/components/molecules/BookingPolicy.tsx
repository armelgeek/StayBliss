import Accordion from '@/shared/components/atoms/Accordion';

function BookingPolicy() {
  return (
    <section>
      <h3 className="text-center">Booking Policy</h3>

      <hr className="decriptionDivider" />

      <div>
        <Accordion label={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Accordion>
        <Accordion label={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Accordion>
        <Accordion label={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Accordion>
      </div>
    </section>
  );
}

export default BookingPolicy;
