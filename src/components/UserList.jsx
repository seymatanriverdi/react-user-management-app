import { Link } from "react-router-dom";

function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link> - {user.email}
        </li>
      ))}
    </ul>
  );
}

export default UserList;