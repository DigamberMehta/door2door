import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { StoreAuthProvider } from "./context/StoreAuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

const App = () => {
  return (
    <StoreAuthProvider>
      <AdminAuthProvider>
        <RouterProvider router={router} />
      </AdminAuthProvider>
    </StoreAuthProvider>
  );
};

export default App;
