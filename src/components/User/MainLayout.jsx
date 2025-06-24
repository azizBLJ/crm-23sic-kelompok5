import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function MainLayout() {


  return (
    <div>
      <Header />
        <main>
          <div>
            <Outlet />
          </div>
        </main>
      <Footer />
    </div>
  );
}
