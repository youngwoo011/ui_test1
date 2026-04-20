import { useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "@/router";
import { AppProvider, useAppContext } from "@/store/AppProvider";
import { LoginPage } from "@/pages/Auth/LoginPage";
import { RegisterPage } from "@/pages/Auth/RegisterPage";
function AppContent() {
    const { isAuthenticated, login, register } = useAppContext();
    const [showRegister, setShowRegister] = useState(false);
    if (!isAuthenticated) {
        return showRegister ? (<RegisterPage onRegister={register} onToggleLogin={() => setShowRegister(false)}/>) : (<LoginPage onLogin={login} onToggleRegister={() => setShowRegister(true)}/>);
    }
    return <RouterProvider router={router}/>;
}
export default function App() {
    return (<AppProvider>
      <AppContent />
    </AppProvider>);
}
