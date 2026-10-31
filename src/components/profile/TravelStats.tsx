import { Plane, Globe, CalendarDays, DollarSign } from "lucide-react";

type StatsProps = {
  loading: boolean;
  stats: {
    totalBookings: number;
    countriesVisited: number;
    upcomingTrips: number;
    totalSpent: string;
  };
};

export default function TravelStats({ loading, stats }: StatsProps) {
  return (
    <div className="lg:col-span-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">Travel Statistics</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Stat 1 */}
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 mb-2">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-900">{loading ? "..." : stats.totalBookings}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
            <Plane size={22} />
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 mb-2">Countries Visited</p>
            <p className="text-2xl font-bold text-gray-900">{loading ? "..." : stats.countriesVisited}</p>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
            <Globe size={22} />
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 mb-2">Upcoming Trips</p>
            <p className="text-2xl font-bold text-gray-900">{loading ? "..." : stats.upcomingTrips}</p>
          </div>
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
            <CalendarDays size={22} />
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 mb-2">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900">{loading ? "..." : `$${stats.totalSpent}`}</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-500">
            <DollarSign size={22} />
          </div>
        </div>

      </div>
    </div>
  );
}