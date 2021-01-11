export const Events = () => {
  return (
    <div>
      <p>Events page</p>
      <button onClick={() => {localStorage.removeItem('isLoggedIn'); window.location.reload()}}>Logout from Events page</button>
    </div>
  );
}