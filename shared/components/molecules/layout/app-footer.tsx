function AppFooter() {
  return (
    <footer className="bg-gray-100 py-8 px-24">
      <nav className="flex flex-wrap flex-row justify-between">
        <div>
          <h3 className="text-lg font-bold">Contact Us</h3>
          <ul className="list-disc pl-8">
            <li>staybliss@gmail.com</li>
            <li>+26134058386</li>
            <li>StayBlish Streat</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold">Link Menu</h3>
          <ul className="list-disc pl-8">
            <li>Homepage</li>
            <li>Rooms</li>
            <li>Blog</li>
            <li>Contact Us</li>
            <li>About</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold">Newsletter</h3>
          <p className="text-gray-600">
            Form Will Be
          </p>
        </div>
      </nav>
    </footer>
  );
}

export default AppFooter;
