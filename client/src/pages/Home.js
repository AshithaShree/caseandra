import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const userId = localStorage.getItem("userId");

  const genres = [
    "Constitutional Law",
    "Fundamental Rights",
    "Human Rights",
    "Criminal Law",
    "Cyber Law",
    "Medical Law",
    "Civil Rights",
    "Criminal Procedure",
    "Executive Power",
    "Election Law",
    "Voting Rights",
    "Immigration Law",
    "Health Law",
    "First Amendment"
  ];

  const fetchCases = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cases");
      setCases(res.data);
      setFilteredCases(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUser = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchCases();
    fetchUser();
  }, [fetchUser]);

  const toggleFavourite = async (caseId) => {
    await axios.post(`http://localhost:5000/api/users/${userId}/favourites`, { caseId });
    fetchUser();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const favouriteIds = user?.favourites?.map((f) => f._id) || [];

  const filterCases = (query = searchQuery, genre = selectedGenre) => {
    let filtered = cases;
    if (query) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (genre) {
      filtered = filtered.filter((c) => c.category === genre);
    }
    setFilteredCases(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterCases(query, selectedGenre);
  };

  const handleGenreSelect = (genre) => {
    const newGenre = genre === selectedGenre ? "" : genre;
    setSelectedGenre(newGenre);
    filterCases(searchQuery, newGenre);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-purple-700 text-white p-6 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold mb-6">Caseandra🤍</h1>
          <button
            onClick={() => setActiveTab("home")}
            className="py-2 px-4 rounded hover:bg-purple-600 text-left"
          >
            🏠 Home
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className="py-2 px-4 rounded hover:bg-purple-600 text-left"
          >
            👤 My Profile
          </button>
          <button
            onClick={() => setActiveTab("favourites")}
            className="py-2 px-4 rounded hover:bg-purple-600 text-left"
          >
            ❤️ Favourites
          </button>
          <button
            onClick={() => setActiveTab("addCase")}
            className="py-2 px-4 rounded hover:bg-purple-600 text-left"
          >
            ➕ Add Case
          </button>
        </div>
        <button onClick={handleLogout} className="bg-white text-purple-700 p-2 rounded-xl mt-4">
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100">
        {/* Home Tab */}
        {activeTab === "home" && (
          <>
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search cases..."
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex gap-3 mb-6 flex-wrap">
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => handleGenreSelect(g)}
                  className={`px-4 py-2 rounded-full font-semibold border ${
                    selectedGenre === g
                      ? "bg-purple-700 text-white border-purple-700"
                      : "bg-white text-purple-700 border-purple-700 hover:bg-purple-100"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {filteredCases.length === 0 && <p>No cases found.</p>}
              {filteredCases.map((c) => (
                <div key={c._id} className="bg-white p-6 rounded-xl shadow">
                  <h3 className="font-bold">{c.title}</h3>
                  <p>{c.description}</p>
                  {c.sourceLink && (
                    <a
                      href={c.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 text-blue-600 underline"
                    >
                      🔗 View Source
                    </a>
                  )}
                  <button
                    onClick={() => toggleFavourite(c._id)}
                    className={`mt-2 px-4 py-2 rounded ${
                      favouriteIds.includes(c._id) ? "bg-red-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {favouriteIds.includes(c._id) ? "❤️ Favourited" : "🤍 Add to Favourite"}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && user && (
          <div className="bg-white p-8 rounded-xl shadow max-w-md">
            <h2 className="font-bold text-xl mb-2">My Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Total Favourites:</strong> {user.favourites.length}</p>
          </div>
        )}

        {/* Favourites Tab */}
        {activeTab === "favourites" && (
          <div className="grid md:grid-cols-3 gap-6">
            {user?.favourites.length === 0 && <p>No favourites yet.</p>}
            {user?.favourites.map((f) => (
              <div key={f._id} className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-bold">{f.title}</h3>
                <p>{f.description}</p>
                {f.sourceLink && (
                  <a
                    href={f.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-blue-600 underline"
                  >
                    🔗 View Source
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add Case Tab */}
        {activeTab === "addCase" && (
          <div className="bg-white p-8 rounded-xl shadow max-w-md">
            <h2 className="font-bold text-xl mb-4">Add New Case</h2>
            <form className="flex flex-col gap-4">
              <input
                name="title"
                type="text"
                placeholder="Case Title"
                className="p-3 border rounded focus:outline-none focus:border-purple-500"
              />
              <input
                name="category"
                type="text"
                placeholder="Category"
                className="p-3 border rounded focus:outline-none focus:border-purple-500"
              />
              <textarea
                name="description"
                placeholder="Description"
                rows={4}
                className="p-3 border rounded focus:outline-none focus:border-purple-500"
              />
              <input
                name="sourceLink"
                type="url"
                placeholder="Source URL"
                className="p-3 border rounded focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="bg-purple-700 text-white py-3 rounded-xl font-bold"
              >
                Submit Case
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}