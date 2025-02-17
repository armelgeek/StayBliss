import BookingButton from '../atoms/BookingButton';
type BookingFormProps = {
  children?: React.ReactNode
}
function BookingForm({ children }: BookingFormProps) {
  return (
    <form className="flex flex-col gap-4 pl-3">
      <h1 className="text-3xl font-bold">BOOK A ROOM ONLINE</h1>
      <div className="flex gap-4">
        <div>
          <label className="block" htmlFor="arrival">
            Arrival
          </label>
          <input type="date" name="arrival" id="arrival" className="border border-gray-300 rounded-md p-2" />
        </div>
        <div>
          <label className="block" htmlFor="departure">
            Departure
          </label>
          <input type="date" name="departure" id="departure" className="border border-gray-300 rounded-md p-2" />
        </div>
      </div>

      <div className="flex gap-4">
        <BookingButton onClick={() => {
          console.log('handle booking')
        }}>
          Book now
        </BookingButton>
        <div>{children}</div>
      </div>
    </form>
  );
}

export default BookingForm;
