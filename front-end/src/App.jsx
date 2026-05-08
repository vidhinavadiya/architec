import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Products from './pages/Products';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CategoryManagement from "./pages/admin/CategoryManagement";
import SubCategoryManagement from "./pages/admin/SubCategoryManagement";
import PlanManagement from './pages/admin/PlanManagement';
import ContactManagement from './pages/admin/ContactManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard/categories" element={<CategoryManagement />} />
        <Route path="/admin/dashboard/subcategories" element={<SubCategoryManagement />} />
        <Route path='/admin/dashboard/plan' element={<PlanManagement />} />
        <Route path='/admin/dashboard/contacts' element={<ContactManagement />} />
      </Routes>
    </Router>
  );
}

export default App;