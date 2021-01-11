import { Navbar } from '../Common/Navbar/Navbar';

export const Clubs = () => {
  const test = 0;
  return (
    <div>
      
      <Navbar />
      <div className="content">
      <p>Clubs page</p>
      <button onClick={() => {localStorage.removeItem('isLoggedIn'); window.location.reload()}}>Logout from Clubs page</button>

      </div>
    </div>
  );
}