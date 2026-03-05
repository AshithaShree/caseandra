const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <nav className="bg-indigo-600 text-white p-4 shadow-lg">
        <h1 className="text-xl font-bold">CaseIO Dashboard 🚀</h1>
      </nav>

      <div className="p-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to your dashboard
          </h2>
          <p className="text-gray-600">
            Here you can manage your case studies.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;