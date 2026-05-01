import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (!response.ok) {
          throw new Error("Kullanıcı detayı alınamadı.");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError("Bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [id]);

  if (!token) {
    return (
      <div>
        <h1>Yetkisiz erişim</h1>
        <p>Önce giriş yapmalısın.</p>
        <button onClick={() => navigate("/")}>Login sayfasına dön</button>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1>User Detail Page</h1>

      <button onClick={() => navigate("/users")}>← Users sayfasına dön</button>
      <button onClick={handleLogout}>Log out</button>

      <hr />

      {loading && <p>Yükleniyor...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && user && (
        <div>
          <h2>{user.name}</h2>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Website:</strong> {user.website}
          </p>
          <p>
            <strong>Company:</strong> {user.company?.name}
          </p>
          <p>
            <strong>City:</strong> {user.address?.city}
          </p>
        </div>
      )}
    </div>
  );
}

export default UserDetailPage;