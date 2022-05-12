import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
import RoleBasedGuard from 'guards/RoleBasedGuard';
import SellerGuard from 'guards/SellerGuard';
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
      path: '/',
      element: <Navigate to="/auth/login" replace />
    },
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
        }
      ]
    },
    {
      path: '/home',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [{ element: <Home /> }]
    },
    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          element: <Navigate to="/dashboard/app" replace />
        },
        {
          path: 'app',
          element: (
            <RoleBasedGuard accessibleRoles={['ADMIN', 'MEMBER']}>
              <Dashboard />
            </RoleBasedGuard>
          )
        },
        {
          path: 'activities',
          element: (
            <RoleBasedGuard accessibleRoles={['ADMIN', 'MEMBER']}>
              <Activities />
            </RoleBasedGuard>
          )
        },
        {
          path: 'blogs',
          element: <BlogPosts />
        },
        { path: 'blogs/:id', element: <BlogPost /> },
        {
          path: 'blogs/edit/:id',
          element: (
            <RoleBasedGuard accessibleRoles={['ADMIN', 'MEMBER']}>
              <BlogEdit />
            </RoleBasedGuard>
          )
        },
        {
          path: 'blogs/new',
          element: (
            <RoleBasedGuard accessibleRoles={['ADMIN', 'MEMBER']}>
              <BlogNewPost />
            </RoleBasedGuard>
          )
        },
        {
          path: 'blogs/own',
          element: (
            <RoleBasedGuard accessibleRoles={['ADMIN', 'MEMBER']}>
              <MyBlog />
            </RoleBasedGuard>
          )
        },
        {
          path: 'blog-verification',
          element: (
            <RoleBasedGuard accessibleRoles={['ADMIN']}>
              <BlogVerification />
            </RoleBasedGuard>
          )
        },
        { path: 'faq', element: <FAQ /> },
        { path: 'faq/:id', element: <FAQPost /> },
        { path: 'forum', element: <Forum /> },
        {
          path: 'forum/own',
          element: (
            <RoleBasedGuard accessibleRoles={['ADMIN', 'MEMBER']}>
              <MyForum />
            </RoleBasedGuard>
          )
        },
        {
          path: 'course',
          element: (
            <RoleBasedGuard accessibleRoles={['ADMIN', 'MEMBER']}>
              <Course />
            </RoleBasedGuard>
          )
        },
        {
          path: 'course/:id',
          element: (
            <RoleBasedGuard accessibleRoles={['ADMIN', 'MEMBER']}>
              <CourseDetail />
            </RoleBasedGuard>
          )
        },
        {
          path: 'course/:courseId/page/:order',
          element: (
            <RoleBasedGuard accessibleRoles={['ADMIN', 'MEMBER']}>
              <CoursePage />
            </RoleBasedGuard>
          )
        },
        {
          path: 'management-course/list',
          element: (
            <RoleBasedGuard accessibleRoles={['ADMIN']}>
              <CourseList />
            </RoleBasedGuard>
          )
        },
        {
          path: 'management-course/create-course',
          element: (
            <RoleBasedGuard accessibleRoles={['ADMIN']}>
              <CourseNewPost />
            </RoleBasedGuard>
          )
        },
        {
          path: 'management-course/:id/create-item',
          element: (
            <RoleBasedGuard accessibleRoles={['ADMIN']}>
              <CourseNewItem />
            </RoleBasedGuard>
          )
        },
        {
          path: 'management-course/edit/:id',
          element: (
            <RoleBasedGuard accessibleRoles={['ADMIN']}>
              <CourseEditPost />
            </RoleBasedGuard>
          )
        },
        {
          path: 'management-course/:courseId/edit/:order',
          element: (
            <RoleBasedGuard accessibleRoles={['ADMIN']}>
              <CourseEditItem />
            </RoleBasedGuard>
          )
        },
        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace /> },
            {
              path: 'shop',
              element: (
                <RoleBasedGuard accessibleRoles={['CUSTOMER', 'MEMBER']}>
                  <EcommerceShop />
                </RoleBasedGuard>
              )
            },

            {
              path: 'order/:id',
              element: (
                <RoleBasedGuard accessibleRoles={['CUSTOMER', 'MEMBER']}>
                  <EcommerceOrderDetails />
                </RoleBasedGuard>
              )
            },
            {
              path: 'order/:id/payment/:paymentType',
              element: (
                <RoleBasedGuard accessibleRoles={['CUSTOMER', 'MEMBER']}>
                  <PaymentPage />
                </RoleBasedGuard>
              )
            },
            {
              path: 'order-history',
              element: (
                <RoleBasedGuard accessibleRoles={['CUSTOMER', 'MEMBER']}>
                  <EcommerceOrderHistory />
                </RoleBasedGuard>
              )
            },
            {
              path: 'product/:name',
              element: (
                <RoleBasedGuard accessibleRoles={['CUSTOMER', 'MEMBER']}>
                  <EcommerceProductDetails />
                </RoleBasedGuard>
              )
            },
            {
              path: 'checkout',
              element: (
                <RoleBasedGuard accessibleRoles={['CUSTOMER', 'MEMBER']}>
                  <EcommerceCheckout />
                </RoleBasedGuard>
              )
            }
          ]
        },
        {
          path: 'seller',
          children: [
            { element: <Navigate to="/dashboard/seller/dashboard" replace /> },
            {
              path: 'dashboard',
              element: (
                <SellerGuard>
                  <EcommerceSellerCenter />
                </SellerGuard>
              )
            },
            {
              path: 'product-list',
              element: (
                <SellerGuard>
                  <EcommerceProductList />
                </SellerGuard>
              )
            },
            {
              path: 'product/new',
              element: (
                <SellerGuard>
                  <EcommerceProductCreate />
                </SellerGuard>
              )
            },
            {
              path: 'product/:name/edit',
              element: (
                <SellerGuard>
                  <EcommerceProductCreate />
                </SellerGuard>
              )
            },
            {
              path: 'order-list',
              element: (
                <SellerGuard>
                  <EcommerceOrderList />
                </SellerGuard>
              )
            }
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
            { path: 'create-disbursement-request', element: <DisbursementRequest /> },
            {
              path: 'add-simpanan-sukarela',
              element: <AddSimpananSukarela />
            },
            {
              path: 'register-deprecation',
              element: (
                <RoleBasedGuard accessibleRoles={['ADMIN']}>
                  <DeprecationRegister />
                </RoleBasedGuard>
              )
            },
            {
              path: 'register-repair',
              element: (
                <RoleBasedGuard accessibleRoles={['ADMIN']}>
                  <RepairRegister />
                </RoleBasedGuard>
              )
            },
            {
              path: 'register-equipment',
              element: (
                <RoleBasedGuard accessibleRoles={['ADMIN']}>
                  <EquipmentRegister />
                </RoleBasedGuard>
              )
            }
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
            {
              path: 'account',
              element: <UserAccount />
            },
            {
              path: 'create-store',
              element: (
                <RoleBasedGuard accessibleRoles={['MEMBER']}>
                  <CreateStore />
                </RoleBasedGuard>
              )
            },
            {
              path: 'member-verification/verify',
              element: (
                <RoleBasedGuard accessibleRoles={['ADMIN']}>
                  <MemberVerification />
                </RoleBasedGuard>
              )
            },
            {
              path: 'member-verification/request',
              element: (
                <RoleBasedGuard accessibleRoles={['CUSTOMER']}>
                  <RequestMemberVerification />
                </RoleBasedGuard>
              )
            }
          ]
        }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
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
// Dashboard
const Dashboard = Loadable(lazy(() => import('../pages/dashboard/Dashboard')));
const EcommerceOrderHistory = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceOrderHistory'))
);
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
const PaymentPage = Loadable(lazy(() => import('../pages/dashboard/PaymentPage')));
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));
const BlogEdit = Loadable(lazy(() => import('../pages/dashboard/BlogEdit')));
const MyBlog = Loadable(lazy(() => import('../pages/dashboard/MyBlog')));
const Course = Loadable(lazy(() => import('../pages/dashboard/Course')));
const CourseDetail = Loadable(lazy(() => import('../pages/dashboard/CourseDetail')));
const CoursePage = Loadable(lazy(() => import('../pages/dashboard/CoursePage')));
const CourseList = Loadable(lazy(() => import('../pages/dashboard/CourseList')));
const CourseNewPost = Loadable(lazy(() => import('../pages/dashboard/CourseNewPost')));
const CourseNewItem = Loadable(lazy(() => import('../pages/dashboard/CourseNewItem')));
const CourseEditPost = Loadable(lazy(() => import('../pages/dashboard/CourseEditPost')));
const CourseEditItem = Loadable(lazy(() => import('../pages/dashboard/CourseEditItem')));
const BlogVerification = Loadable(lazy(() => import('../pages/dashboard/BlogVerification')));
const FAQ = Loadable(lazy(() => import('../pages/dashboard/FAQ')));
const FAQPost = Loadable(lazy(() => import('../pages/dashboard/FAQPost')));
const Forum = Loadable(lazy(() => import('../pages/dashboard/Forum')));
const MyForum = Loadable(lazy(() => import('../pages/dashboard/MyForum')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));
const UserDetail = Loadable(lazy(() => import('../pages/dashboard/UserDetail')));
const MemberVerification = Loadable(lazy(() => import('../pages/dashboard/MemberVerification')));
const RequestMemberVerification = Loadable(
  lazy(() => import('../pages/dashboard/RequestMemberVerification'))
);
const CreateStore = Loadable(lazy(() => import('../pages/dashboard/CreateStore')));
const Activities = Loadable(lazy(() => import('../pages/dashboard/Activities')));
const Finance = Loadable(lazy(() => import('../pages/dashboard/Finance')));
const AdminFinance = Loadable(lazy(() => import('../pages/dashboard/AdminFinance')));
const TransactionsReport = Loadable(lazy(() => import('../pages/dashboard/TransactionsReport')));
const DisbursementApproval = Loadable(
  lazy(() => import('../pages/dashboard/DisbursementApproval'))
);
const DisbursementRequestList = Loadable(
  lazy(() => import('../pages/dashboard/DisbursementRequestList'))
);
const DisbursementRequest = Loadable(lazy(() => import('../pages/dashboard/DisbursementRequest')));
const DeprecationRegister = Loadable(lazy(() => import('../pages/dashboard/DeprecationRegister')));
const RepairRegister = Loadable(lazy(() => import('../pages/dashboard/RepairRegister')));
const EquipmentRegister = Loadable(lazy(() => import('../pages/dashboard/EquipmentRegister')));
const AddSimpananSukarela = Loadable(lazy(() => import('../pages/dashboard/AddSimpananSukarela')));
// Main
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const Home = Loadable(lazy(() => import('../pages/Homepage')));
