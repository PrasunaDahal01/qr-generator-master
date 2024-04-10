import QrForm from "./pages/Qr/QrForm";
import URLForm from "./pages/Qr/URLForm";
import SocialMediaForm from "./pages/Qr/SociaQRForm";
import LocationForm from "./pages/Qr/LocationForm";
import LoginForm from "./pages/Login/LoginForm";
import UpdateForm from "./pages/profile/UpdateForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFoundPage from "./Components/NotFoundPage";
import UserDetails from "./pages/profile/UserDetails";
import UserDetailForm from "./pages/Qr/UserDetailForm";
import AddUserForm from "./pages/Dashboard/AddUserForm";
import EditUserForm from "./pages/Dashboard/EditUserForm";
import ResetPasswordForm from "./pages/Login/ResetPasswordForm";
import ForgetPasswordForm from "./pages/Login/ForgetPasswordForm";
import ChangePasswordForm from "./pages/profile/ChangePasswordForm";
import UserRegisterForm from "./pages/Registration/User/UserRegisterForm";
import AdminRegisterForm from "./pages/Registration/Admin/AdminRegisterForm";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />

        <Route path="/auth/*">
          <Route index element={<LoginForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="registers" element={<UserRegisterForm />} />
          <Route path="forgetPassword" element={<ForgetPasswordForm />} />
          <Route
            path="resetpassword/:id/:token"
            element={<ResetPasswordForm />}
          />
          <Route path="changePassword" element={<ChangePasswordForm />} />
          <Route path="profile" element={<UserDetails />} />
          <Route path="updateProfile" element={<UpdateForm />} />
        </Route>
        <Route path="/users">
          <Route path="registers" element={<AdminRegisterForm />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addUser" element={<AddUserForm />} />
          <Route path="editUser" element={<EditUserForm />} />
        </Route>
        <Route path="/qrs" element={<QrForm />} />
        <Route path="/urls" element={<URLForm />} />
        <Route path="/user-details" element={<UserDetailForm />} />
        <Route path="/location" element={<LocationForm />} />
        <Route path="/socialmedia" element={<SocialMediaForm />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
