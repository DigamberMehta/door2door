import { useAuth } from "../context/AuthContext";

/**
 * Example component showing how to use the Auth Context
 *
 * Usage:
 * import { useAuth } from "../context/AuthContext";
 *
 * const MyComponent = () => {
 *   const { user, isAuthenticated, logout } = useAuth();
 *
 *   if (!isAuthenticated) {
 *     return <div>Please login</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <p>Welcome {user.name}</p>
 *       <button onClick={logout}>Logout</button>
 *     </div>
 *   );
 * };
 */

const UserProfile = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();

  if (loading) {
    return <div className="text-white text-sm">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-white text-sm">Not logged in</div>;
  }

  return (
    <div className="p-4 bg-white/5 rounded-xl">
      <h3 className="text-white font-semibold mb-2">User Profile</h3>
      <p className="text-white/70 text-sm">Name: {user?.name}</p>
      <p className="text-white/70 text-sm">Email: {user?.email}</p>
      <p className="text-white/70 text-sm">Phone: {user?.phone}</p>
      <button
        onClick={logout}
        className="mt-3 px-4 py-2 bg-red-500 text-white text-sm rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
