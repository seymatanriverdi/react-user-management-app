import { useEffect, useState,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";
import { useMemo,useCallback } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
  
function UsersPage() {
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  const [count, setCount] = useState(0);
  const prevHandleSearchChangeRef = useRef();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const handleSearchChange = useCallback((value) => {
  setSearch(value);
}, []);

useEffect(() => {
  if (prevHandleSearchChangeRef.current === handleSearchChange) {
    console.log("Aynı handleSearchChange fonksiyonu");
  } else {
    console.log("Yeni handleSearchChange fonksiyonu oluşturuldu");
  }

  prevHandleSearchChangeRef.current = handleSearchChange;
}, [handleSearchChange]);

  console.log("UsersPage render oldu");
  console.log("handleSearchChange fonksiyonu:", handleSearchChange);

  const filteredUsers = useMemo(() => {
  console.log("use memo örneği Filtre çalıştı");
  return users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
}, [users, search]);

  const handleLogout = useCallback(() => {
  localStorage.removeItem("token");
  navigate("/");
}, [navigate]);

  useEffect(() => {
    console.log("use effecte girdi");
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Kullanıcılar alınamadı.");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err ) {
        setError("Bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

useEffect(() => {
  console.log("Search değişti:", search);
}, [search]);

  if (!token) {
    return (
      <div>
        <h1>Yetkisiz erişim</h1>
        <p>Önce giriş yapmalısın.</p>
        <button onClick={() => navigate("/")}>Login sayfasına dön</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Users Page</h1>
      <p>Giriş yaptın, users sayfasındasın.</p>

      <button onClick={logout}>Log out</button>

      <button
       style={{ marginBottom: "10px", marginLeft: "10px" }}
       onClick={() => setCount(count + 1)}
     >
  Count artır: {count}
</button>

     <SearchBar search={search} onSearchChange={handleSearchChange} />

      <hr />

      {loading && <p>Yükleniyor...</p>}

      {error && <p>{error}</p>}

     {!loading && !error && (
  <ul>

{!loading && !error && <UserList users={filteredUsers} />}

    
  </ul>
)}
    </div>
  );
}

export default UsersPage;