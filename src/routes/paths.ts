// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register')
};

export const PATH_PAGE = {
  homepage: '/home',
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  page404: '/404',
  page500: '/500'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    dashboard: path(ROOTS_DASHBOARD, '/app'),
    activities: path(ROOTS_DASHBOARD, '/activities'),
    activity: path(ROOTS_DASHBOARD, '/activities/:id'),
    blogs: path(ROOTS_DASHBOARD, '/blogs'),
    blog: path(ROOTS_DASHBOARD, '/blogs/:id'),
    newBlog: path(ROOTS_DASHBOARD, '/blogs/new'),
    editBlog: path(ROOTS_DASHBOARD, '/blogs/edit/:id'),
    myBlog: path(ROOTS_DASHBOARD, '/blogs/own'),
    blogVerification: path(ROOTS_DASHBOARD, '/blog-verification'),
    faq: path(ROOTS_DASHBOARD, '/faq'),
    faqPost: path(ROOTS_DASHBOARD, '/faq/:id'),
    forum: path(ROOTS_DASHBOARD, '/forum'),
    myforum: path(ROOTS_DASHBOARD, '/forum/own'),
    course: path(ROOTS_DASHBOARD, '/course'),
    courseDetail: path(ROOTS_DASHBOARD, '/course/:id'),
    coursePage: path(ROOTS_DASHBOARD, '/course/:courseId/page/:order'),
    courseManagement: path(ROOTS_DASHBOARD, '/management-course'),
    courseList: path(ROOTS_DASHBOARD, '/management-course/list'),
    courseNewPost: path(ROOTS_DASHBOARD, '/management-course/create-course'),
    courseNewItem: path(ROOTS_DASHBOARD, '/management-course/:id/create-item'),
    courseEditPost: path(ROOTS_DASHBOARD, '/management-course/edit/:id'),
    courseEditItem: path(ROOTS_DASHBOARD, '/management-course/:courseId/edit/:order')
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    detail: path(ROOTS_DASHBOARD, `/user/:name/detail`),
    editById: path(ROOTS_DASHBOARD, `/user/:name/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    createStore: path(ROOTS_DASHBOARD, '/user/create-store'),
    memberVerification: {
      request: path(ROOTS_DASHBOARD, '/user/member-verification/request'),
      verify: path(ROOTS_DASHBOARD, '/user/member-verification/verify')
    },
    memberResignation: {
      request: path(ROOTS_DASHBOARD, '/user/member-resignation/request'),
      verify: path(ROOTS_DASHBOARD, '/user/member-resignation/verify')
    }
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    seller: {
      root: path(ROOTS_DASHBOARD, '/seller'),
      center: path(ROOTS_DASHBOARD, '/seller/dashboard'),
      list: path(ROOTS_DASHBOARD, '/seller/product-list'),
      newProduct: path(ROOTS_DASHBOARD, '/seller/product/new'),
      editById: path(ROOTS_DASHBOARD, '/seller/product/:id/edit'),
      orderList: path(ROOTS_DASHBOARD, '/seller/order-list')
    },
    orderById: path(ROOTS_DASHBOARD, '/e-commerce/order/:id'),
    orderPayment: path(ROOTS_DASHBOARD, '/e-commerce/order/:id/payment'),
    orderHistory: path(ROOTS_DASHBOARD, '/e-commerce/order-history'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/:id'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  finance: {
    root: path(ROOTS_DASHBOARD, '/finance'),
    home: path(ROOTS_DASHBOARD, '/finance/home'),
    report: path(ROOTS_DASHBOARD, '/finance/report'),
    addSimpananSukarela: path(ROOTS_DASHBOARD, '/finance/add-simpanan-sukarela'),
    disbursementRequest: path(ROOTS_DASHBOARD, '/finance/create-disbursement-request'),
    deprecationRegister: path(ROOTS_DASHBOARD, '/finance/register-deprecation'),
    repairRegister: path(ROOTS_DASHBOARD, '/finance/register-repair'),
    equipmentRegister: path(ROOTS_DASHBOARD, '/finance/register-equipment')
  },
  managementFinance: {
    root: path(ROOTS_DASHBOARD, '/management-finance'),
    home: path(ROOTS_DASHBOARD, '/management-finance/home'),
    disbursementApproval: path(ROOTS_DASHBOARD, '/management-finance/disbursement-approval'),
    disbursementRequestList: path(ROOTS_DASHBOARD, '/management-finance/disbursement-request-list')
  }
};
