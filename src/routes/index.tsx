import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
// ----------------------------------------------------------------------

const Loadable = (Component: React.ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },

    // Dashboard Routes
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />
    },
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <GeneralApp /> },
        { path: 'activities', element: <Activities /> },
        {
          path: 'blogs',
          element: <BlogPosts />
        },
        { path: 'blogs/:title', element: <BlogPost /> },
        { path: 'blogs/new', element: <BlogNewPost /> },
        { path: 'blog/verification', element: <BlogVerification /> },
        { path: 'faq', element: <FAQ /> },
        { path: 'faq/:number', element: <FAQPost /> },
        { path: 'forum', element: <Forum /> },
        { path: 'forum/own', element: <MyForum /> },
        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace /> },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'seller', element: <EcommerceSellerCenter /> },
            { path: 'general-ecommerce', element: <GeneralEcommerce /> },
            { path: 'general-analytics', element: <GeneralAnalytics /> },
            { path: 'order/:id', element: <EcommerceOrderDetails /> },
            { path: 'order-list', element: <EcommerceOrderList /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
            { path: 'invoice', element: <EcommerceInvoice /> }
          ]
        },
        {
          path: 'finance',
          children: [
            { element: <Navigate to="/dashboard/finance/home" replace /> },
            {
              path: 'home',
              element: (
                <RoleBasedGuard accessibleRoles={['MEMBER']}>
                  <Finance />
                </RoleBasedGuard>
              )
            },
            { path: 'report', element: <TransactionsReport /> },
            {
              path: 'member-report',
              element: (
                <RoleBasedGuard accessibleRoles={['MEMBER']}>
                  <MemberReport />
                </RoleBasedGuard>
              )
            },
            {
              path: 'add-simpanan-sukarela',
              element: <AddSimpananSukarela />
            },
            { path: 'create-disbursement-request', element: <DisbursementRequest /> }
          ]
        },
        {
          path: 'management-finance',
          children: [
            {
              element: <Navigate to="/dashboard/management-finance/home" replace />
            },
            {
              path: 'home',
              element: (
                <RoleBasedGuard accessibleRoles={['ADMIN']}>
                  <AdminFinance />
                </RoleBasedGuard>
              )
            },
            {
              path: 'disbursement-approval',
              element: (
                <RoleBasedGuard accessibleRoles={['ADMIN']}>
                  <DisbursementApproval />
                </RoleBasedGuard>
              )
            },
            {
              path: 'disbursement-request-list',
              element: (
                <RoleBasedGuard accessibleRoles={['ADMIN']}>
                  <DisbursementRequestList />
                </RoleBasedGuard>
              )
            }
          ]
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/account" replace /> },
            {
              path: 'list',
              element: (
                <RoleBasedGuard accessibleRoles={['ADMIN']}>
                  <UserList />
                </RoleBasedGuard>
              )
            },
            {
              path: ':name/edit',
              element: (
                <RoleBasedGuard accessibleRoles={['ADMIN']}>
                  <UserCreate />
                </RoleBasedGuard>
              )
            },
            {
              path: ':name/detail',
              element: (
                <RoleBasedGuard accessibleRoles={['ADMIN']}>
                  <UserDetail />
                </RoleBasedGuard>
              )
            },
            { path: 'account', element: <UserAccount /> }
          ]
        },
        {
          path: 'chat',
          children: [
            { element: <Chat /> },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> }
          ]
        }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
// const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
// const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));
const EcommerceOrderList = Loadable(lazy(() => import('../pages/dashboard/EcommerceOrderList')));
const EcommerceOrderDetails = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceOrderDetails'))
);
const EcommerceSellerCenter = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceSellerCenter'))
);
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductDetails'))
);
const EcommerceProductList = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductList'))
);
const EcommerceProductCreate = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductCreate'))
);
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));
const EcommerceInvoice = Loadable(lazy(() => import('../pages/dashboard/EcommerceInvoice')));
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));
const BlogVerification = Loadable(lazy(() => import('../pages/dashboard/BlogVerification')));
const FAQ = Loadable(lazy(() => import('../pages/dashboard/FAQ')));
const FAQPost = Loadable(lazy(() => import('../pages/dashboard/FAQPost')));
const Forum = Loadable(lazy(() => import('../pages/dashboard/Forum')));
const MyForum = Loadable(lazy(() => import('../pages/dashboard/MyForum')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));
const UserDetail = Loadable(lazy(() => import('../pages/dashboard/UserDetail')));
const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const Activities = Loadable(lazy(() => import('../pages/dashboard/Activities')));
const Finance = Loadable(lazy(() => import('../pages/dashboard/Finance')));
const AdminFinance = Loadable(lazy(() => import('../pages/dashboard/AdminFinance')));
const TransactionsReport = Loadable(lazy(() => import('../pages/dashboard/TransactionsReport')));
const MemberReport = Loadable(lazy(() => import('../pages/dashboard/MemberReport')));
const DisbursementApproval = Loadable(
  lazy(() => import('../pages/dashboard/DisbursementApproval'))
);
const DisbursementRequestList = Loadable(
  lazy(() => import('../pages/dashboard/DisbursementRequestList'))
);
const DisbursementRequest = Loadable(lazy(() => import('../pages/dashboard/DisbursementRequest')));
const AddSimpananSukarela = Loadable(lazy(() => import('../pages/dashboard/AddSimpananSukarela')));
// Main
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
