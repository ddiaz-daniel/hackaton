import UserHeader from "./components/userHeader";
import SearchBar from "./components/searchBar";
import ReservationList from "./components/reservationList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-white p-4 shadow-md pt-20">
        <UserHeader />
      </div>

      <div className="flex-grow p-4">
        <SearchBar />
        <ReservationList />
      </div>
    </div>
  );
}
