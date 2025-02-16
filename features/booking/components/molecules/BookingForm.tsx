import BookingButton from '../atoms/BookingButton';
type BookingFormProps = {
  children?: React.ReactNode
}
function BookingForm({ children }: BookingFormProps) {
  return (
    <form>
      <h1>BOOK A ROOM ONLINE</h1>
      <div>
        <label>
          Arrival
        </label>
        <input type="date" name="" id=""/>
      </div>
      <div>
        <label>
          Departure
        </label>
        <input type="date" name="" id="" />
      </div>

      <div>
        <BookingButton onClick={() => {
          console.log('handle booking')
        }} />
        <div>{children}</div>
      </div>
    </form>
  );
}

export default BookingForm;
