import ContactMap from '@/features/contact/components/atoms/ContactMap';

function Contact() {
  return (
    <section>
      <div>
        <h2>Contact Us</h2>
        <div>
          <form action="">
            <div>
              <input type="text" placeholder="Name" />
            </div>
            <div>
              <input type="email" placeholder="Email" />
            </div>
            <div>
              <input type="tel" placeholder="Phone" />
            </div>
            <div>
              <textarea placeholder="Message" rows={5}></textarea>
            </div>

            <div>
              <button type="button">
                Send
              </button>
            </div>
          </form>
          <ContactMap />
        </div>
      </div>
    </section>
  );
}

export default Contact;
