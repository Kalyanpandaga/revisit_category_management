import Header from "./Header";
import Category from "./Category";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="px-8 py-6">
        <Category />
      </div>
    </div>
  );
};

export default Dashboard;
