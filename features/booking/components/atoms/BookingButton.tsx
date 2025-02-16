import { MouseEventHandler } from 'react';
import { Button } from '@/components/ui/button';
type BookingButtonProps = {
	onClick: MouseEventHandler<HTMLButtonElement>
}
function BookingButton({ onClick }: BookingButtonProps) {
	return (
	  <Button onClick={onClick}>
			Book Now
	  </Button>
	);
  }
  export default BookingButton;
