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
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
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
    blog: path(ROOTS_DASHBOARD, '/blogs/:title'),
    newBlog: path(ROOTS_DASHBOARD, '/blogs/new'),
    blogVerification: path(ROOTS_DASHBOARD, '/blog/verification'),
    faq: path(ROOTS_DASHBOARD, '/faq'),
    faqPost: path(ROOTS_DASHBOARD, '/faq/:number'),
    forum: path(ROOTS_DASHBOARD, '/forum'),
    myforum: path(ROOTS_DASHBOARD, '/forum/own')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    editById: path(ROOTS_DASHBOARD, `/user/:name/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    seller: path(ROOTS_DASHBOARD, '/e-commerce/seller'),
    orderById: path(ROOTS_DASHBOARD, '/e-commerce/order/:id'),
    orderList: path(ROOTS_DASHBOARD, '/e-commerce/order-list'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/itik-ayam'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/itik-ayam/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  finance: {
    root: path(ROOTS_DASHBOARD, '/finance'),
    home: path(ROOTS_DASHBOARD, '/finance/home'),
    report: path(ROOTS_DASHBOARD, '/finance/report'),
    memberReport: path(ROOTS_DASHBOARD, '/finance/member-report'),
    addSimpananSukarela: path(ROOTS_DASHBOARD, '/finance/add-simpanan-sukarela'),
    disbursementApproval: path(ROOTS_DASHBOARD, '/finance/disbursement-approval'),
    disbursementRequest: path(ROOTS_DASHBOARD, '/finance/create-disbursement-request'),
    disbursementRequestList: path(ROOTS_DASHBOARD, '/finance/disbursement-request-list'),
    deprecationRegister: path(ROOTS_DASHBOARD, '/finance/register-deprecation')
  },
  managementFinance: {
    root: path(ROOTS_DASHBOARD, '/management-finance'),
    home: path(ROOTS_DASHBOARD, '/management-finance/home'),
    disbursementApproval: path(ROOTS_DASHBOARD, '/management-finance/disbursement-approval'),
    disbursementRequestList: path(ROOTS_DASHBOARD, '/management-finance/disbursement-request-list')
  }
};
