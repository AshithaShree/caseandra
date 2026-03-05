import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function Favourites({ token, toggleFavourite }) {
  const [favs, setFavs] = useState([]);

  // ✅ Memoize fetchFavs so useEffect dependencies are stable
  const fetchFavs = useCallback(async () => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // decode JWT
      const res = await axios.get(
        `http://localhost:5000/api/users/${decoded.id}/favourites`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavs(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    fetchFavs();
  }, [fetchFavs]); // ✅ now safe, fetchFavs won't change on every render

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Favourites ❤️</h2>
      {favs.length === 0 ? <p>No favourites yet.</p> : (
        <div className="grid md:grid-cols-3 gap-6">
          {favs.map(c => (
            <div key={c._id} className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-bold text-lg">{c.title}</h3>
              <p className="text-sm text-gray-500">{c.category}</p>
              <p className="mt-2 text-gray-700">{c.description}</p>
              <button
                onClick={() => toggleFavourite(c._id, fetchFavs)}
                className="mt-3 bg-pink-500 text-white px-3 py-1 rounded"
              >
                ❤️ Remove
              </button>
              {c.sourceLink && (
                <a
                  href={c.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-blue-600 underline"
                >
                  View Source
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;