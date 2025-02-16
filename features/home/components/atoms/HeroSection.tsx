
"use client";
import BookingForm from '@/features/booking/components/molecules/BookingForm';
import Modal from '@/shared/components/atoms/Modal';
import BookingButton from '@/features/booking/components/atoms/BookingButton';
import Slider from '@/shared/components/atoms/Slider';
const images = ["/bg.png", "/bg.png", "/bg.png", "/bg.png"];

function HeroSection() {
  return (
    <Slider images={images}>
      <div>
        <div >
          <BookingForm />
        </div>
        <div>
          <p>Find Comfort In a Foriegn Land With Us</p>
          <p>Book Now, Pay On Arrival</p>
          <div>
            <Modal>
              <Modal.ToggleOpen>
                <BookingButton onClick={() => {}} />
              </Modal.ToggleOpen>
              <Modal.Overlay>
                <Modal.Wrapper>
                  <BookingForm>
                    <div>
                      <Modal.ToggleClose>
                        <button type="button">
                          Cancel
                        </button>
                      </Modal.ToggleClose>
                    </div>
                  </BookingForm>
                </Modal.Wrapper>
              </Modal.Overlay>
            </Modal>
          </div>
        </div>
      </div>
    </Slider>
  );
}

export default HeroSection;
