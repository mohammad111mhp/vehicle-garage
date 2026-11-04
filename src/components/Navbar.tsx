import { CarFront, Settings } from "lucide-react";

function Navbar() {
  return (
    <div className="flex flex-col justify-between h-screen w-72 p-5 border-r border-gray-800">
      <div className="flex flex-col gap-14">
        <div className="text-center">
          <h1 className="text-3xl font-bold italic">Los Santos</h1>
          <p className="text-blue-500 tracking-widest">GARAGE</p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-5 px-5 py-3 rounded-xl cursor-pointer bg-blue-500">
            <CarFront />
            <p>Garage</p>
          </div>
          <div className="flex gap-5 px-5 py-3 rounded-xl cursor-pointer">
            <CarFront />
            <p>My Vehicles</p>
          </div>
          <div className="flex gap-5 px-5 py-3 rounded-xl cursor-pointer">
            <CarFront />
            <p>Dealership</p>
          </div>
          <div className="flex gap-5 px-5 py-3 rounded-xl cursor-pointer">
            <Settings />
            <p>Settings</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <img
          className="w-12 rounded-full"
          src="images/profile.jpg"
          alt="Profile Pic"
        />
        <div className="">
          <p className="text-sm font-bold">Mighty-MHP</p>
          <p className="text-sm text-gray-400">ID: 1287</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
