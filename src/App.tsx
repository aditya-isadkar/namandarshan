import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import ExclusivePackages from "./pages/ExclusivePackages";
import Yatra from "./pages/Yatra";
import Temples from "./pages/Temples";
import Darshan from "./pages/Darshan";
import Puja from "./pages/Puja";
import PujaDetails from "./pages/Puja/PujaDetails";
import PujaBooking from "./pages/Puja/PujaBooking";
import Prasadam from "./pages/Prasadam";
import PrasadamDetails from "./pages/Prasadam/PrasadamDetails";
import Chadhava from "./pages/Chadhava";
import ChadhavaDetails from "./pages/Chadhava/ChadhavaDetails";
import Mahashivratri from "./pages/Mahashivratari";
import Astro from "./pages/Astro";
import LiveDarshan from "./pages/LiveDarshan";
import LiveDarshanDetail from "./pages/LiveDarshan/LiveDarshanDetail";
import ScrollToTop from "./components/ScrollToTop";
import FloatingActionButtons from "./components/layout/FloatingActionButtons";
import MyTrips from "./pages/MyTrips";
import Referral from "./pages/Referral";
import AiYatraPlanner from "./pages/AiYatraPlanner";
import Login from "./pages/Login";
import AdminLogin from "./pages/Admin/AdminLogin";
import NotFound from "./pages/NotFound";
import TempleList from "./pages/Admin/TempleList";
import TempleForm from "./pages/Admin/TempleForm";
import TempleDetails from "./pages/Temples/TempleDetails";
import DarshanList from "./pages/Admin/DarshanList";
import DarshanForm from "./pages/Admin/DarshanForm";
import PrasadamList from "./pages/Admin/PrasadamList";
import PrasadamForm from "./pages/Admin/PrasadamForm";
import ChadhavaList from "./pages/Admin/ChadhavaList";
import ChadhavaForm from "./pages/Admin/ChadhavaForm";

import DarshanBookingPage from "./pages/Darshan/DarshanBookingPage";

import AboutUs from "./pages/AboutUs";
import NewsEvents from "./pages/NewsEvents";
import NewsDetail from "./pages/NewsEvents/NewsDetail";
import Gallery from "./pages/Gallery";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import KedarnathBlog from "./pages/Blogs/KedarnathBlog";
import RamMandirBlog from "./pages/Blogs/RamMandirBlog";
import TirupatiBlog from "./pages/Blogs/TirupatiBlog";
import ShirdiYatra from "./pages/Yatra/ShirdiYatra";
import CharDhamYatra from "./pages/Yatra/CharDhamYatra";
import KedarnathYatra from "./pages/Yatra/KedarnathYatra";
import AyodhyaYatra from "./pages/Yatra/AyodhyaYatra";
import VrindavanYatra from "./pages/Yatra/VrindavanYatra";
import JagannathYatra from "./pages/Yatra/JagannathYatra";
import KedarnathLegend from "./pages/Blogs/KedarnathLegend";
import JagannathMystery from "./pages/Blogs/JagannathMystery";
import GoldenTempleBlog from "./pages/Blogs/GoldenTempleBlog";
import ChardhamBlog from "./pages/Blogs/ChardhamBlog";
import KashiBlog from "./pages/Blogs/KashiBlog";
import MahakaleshwarBlog from "./pages/Blogs/MahakaleshwarBlog";
import ShirdiPromisesBlog from "./pages/Blogs/ShirdiPromisesBlog";
import Blogs from "./pages/Blogs";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

// CRM Pages
import {
  CRMLogin,
  CRMDashboard,
  AdminPanel,
  TeamStats,
  BlastMail,
  DarshanCRM,
  AstroCRM,
  PackageCRM,
  InquiryCRM,
  OpsCRM,
  OpsLogin,
} from "./pages/CRM";
import ChadhawaCRM from "./pages/CRM/ChadhawaCRM";
import PujaCRM from "./pages/CRM/PujaCRM";
import PrasadamCRM from "./pages/CRM/PrasadamCRM";

const queryClient = new QueryClient();

import { ThemeProvider } from "./components/theme-provider";

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider defaultTheme="smart" storageKey="vite-ui-theme">
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <ScrollToTop />
              <FloatingActionButtons />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/exclusive-temple-darshan-packeges" element={<ExclusivePackages />} />
                <Route path="/referral" element={<Referral />} />
                <Route path="/ai-yatra-planner" element={<AiYatraPlanner />} />
                <Route path="/yatra" element={<Yatra />} />
                <Route path="/shirdi-yatra" element={<ShirdiYatra />} />
                <Route path="/char-dham-yatra" element={<CharDhamYatra />} />
                <Route path="/kedarnath-yatra" element={<KedarnathYatra />} />
                <Route path="/ayodhya-yatra" element={<AyodhyaYatra />} />
                <Route path="/vrindavan-yatra" element={<VrindavanYatra />} />
                <Route path="/jagannath-yatra" element={<JagannathYatra />} />
                <Route path="/temples" element={<Temples />} />
                <Route path="/temples/:slug" element={<TempleDetails />} />
                <Route path="/darshan" element={<Darshan />} />
                <Route path="/darshan/:slug" element={<DarshanBookingPage />} />
                <Route path="/puja" element={<Puja />} />
                <Route path="/puja/:slug" element={<PujaDetails />} />

                <Route path="/puja/booking" element={<PujaBooking />} />
                <Route path="/prasadam" element={<Prasadam />} />
                <Route path="/prasadam/:slug" element={<PrasadamDetails />} />
                <Route path="/chadhava" element={<Chadhava />} />
                <Route path="/chadhava/:slug" element={<ChadhavaDetails />} />

                <Route path="/astro-naman" element={<Astro />} />
                <Route path="/live-darshan" element={<LiveDarshan />} />
                <Route path="/live-darshan/:slug" element={<LiveDarshanDetail />} />
                <Route path="/my-trips" element={<MyTrips />} />
                <Route path="/login" element={<Login />} />
                {/* Blog Routes */}
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blog" element={<Blogs />} />
                <Route path="/blog/shirdi-yatra" element={<ShirdiYatra />} />
                <Route path="/blogs/legend-of-kedarnath" element={<KedarnathLegend />} />
                <Route path="/blogs/mysteries-of-jagannath-puri" element={<JagannathMystery />} />
                <Route path="/blog/kedarnath-temple-yatra-history-legend" element={<KedarnathBlog />} />
                <Route path="/blog/ram-mandir-ayodhya-history-darshan-guide" element={<RamMandirBlog />} />
                <Route path="/blog/tirupati-balaji-darshan-booking-laddu-mystery" element={<TirupatiBlog />} />
                {/* New Blogs */}
                <Route path="/blog/golden-temple-amritsar-history-langar-guide" element={<GoldenTempleBlog />} />
                <Route path="/blog/chardham-yatra-medical-tips-packing-guide" element={<ChardhamBlog />} />
                <Route path="/blog/kashi-vishwanath-moksha-ganga-aarti-guide" element={<KashiBlog />} />
                <Route path="/blog/mahakaleshwar-ujjain-jyotirlinga-bhasma-aarti" element={<MahakaleshwarBlog />} />
                <Route path="/blog/shirdi-sai-baba-11-vachan-promises-meaning" element={<ShirdiPromisesBlog />} />
                {/* CRM Routes */}
                <Route path="/crm" element={<CRMLogin />} />
                <Route path="/crm/dashboard" element={<CRMDashboard />} />
                <Route path="/crm/admin" element={<AdminPanel />} />
                <Route path="/crm/team-stats" element={<TeamStats />} />
                <Route path="/crm/blast-mail" element={<BlastMail />} />
                <Route path="/crm/darshan" element={<DarshanCRM />} />
                <Route path="/crm/astro" element={<AstroCRM />} />
                <Route path="/crm/package" element={<PackageCRM />} />
                <Route path="/crm/inquiry" element={<InquiryCRM />} />
                {/* Ops Routes */}
                <Route path="/ops" element={<Navigate to="/ops/login" replace />} />
                <Route path="/ops/login" element={<OpsLogin />} />
                <Route path="/ops/dashboard" element={<OpsCRM />} />
                <Route path="/crm/chadhawa" element={<ChadhawaCRM />} />
                <Route path="/crm/puja" element={<PujaCRM />} />
                <Route path="/crm/prasadam" element={<PrasadamCRM />} />

                <Route path="/admin/prasadam/edit/:id" element={<PrasadamForm />} />

                <Route path="/admin/chadhava" element={<ChadhavaList />} />
                <Route path="/admin/chadhava/new" element={<ChadhavaForm />} />
                <Route path="/admin/chadhava/edit/:id" element={<ChadhavaForm />} />


                {/* Admin Routes - Protected */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<TempleList />} />
                  <Route path="/admin/temples" element={<TempleList />} />
                  <Route path="/admin/temples/new" element={<TempleForm />} />
                  <Route path="/admin/temples/edit/:id" element={<TempleForm />} />

                  <Route path="/admin/darshan" element={<DarshanList />} />
                  <Route path="/admin/darshan/new" element={<DarshanForm />} />
                  <Route path="/admin/darshan/edit/:id" element={<DarshanForm />} />

                  <Route path="/admin/prasadam" element={<PrasadamList />} />
                  <Route path="/admin/prasadam/new" element={<PrasadamForm />} />
                  <Route path="/admin/prasadam/edit/:id" element={<PrasadamForm />} />

                  <Route path="/admin/chadhava" element={<ChadhavaList />} />
                  <Route path="/admin/chadhava/new" element={<ChadhavaForm />} />
                  <Route path="/admin/chadhava/edit/:id" element={<ChadhavaForm />} />
                </Route>
                <Route path="/mahashivratari" element={<Mahashivratri />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/news-events" element={<NewsEvents />} />
                <Route path="/news-events/:slug" element={<NewsDetail />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Routes >
            </TooltipProvider >
          </ThemeProvider >
        </BrowserRouter >
      </AuthProvider >
    </QueryClientProvider >
  </HelmetProvider >
);
export default App;
