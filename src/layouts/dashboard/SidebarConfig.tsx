// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  faq: getIcon('ic_faq'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  user: getIcon('ic_user'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'dashboard', path: PATH_DASHBOARD.general.dashboard, icon: ICONS.dashboard },
      { title: 'activities', path: PATH_DASHBOARD.general.activities, icon: ICONS.calendar },
      { title: 'Forum', path: PATH_DASHBOARD.general.forum, icon: ICONS.chat },
      {
        title: 'blogs',
        path: PATH_DASHBOARD.general.blogs,
        icon: ICONS.blog,
        accessibleRoles: ['CUSTOMER', 'MEMBER']
      },
      { title: 'FAQ', path: PATH_DASHBOARD.general.faq, icon: ICONS.faq }
    ]
  },
  // MANAGEMENT
  {
    subheader: 'management',
    accessibleRoles: ['ADMIN'],
    items: [
      // MANAGEMENT : USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [{ title: 'list', path: PATH_DASHBOARD.user.list }]
      },
      // MANAGEMENT : FINANCE
      {
        title: 'finance',
        path: PATH_DASHBOARD.managementFinance.root,
        icon: ICONS.banking,
        children: [
          {
            title: 'home',
            path: PATH_DASHBOARD.managementFinance.home
          },
          {
            title: 'disbursement approval',
            path: PATH_DASHBOARD.managementFinance.disbursementApproval
          },
          {
            title: 'disbursement request list',
            path: PATH_DASHBOARD.managementFinance.disbursementRequestList
          }
        ]
      },
      // MANAGEMENT : E-COMMERCE
      {
        title: 'e-commerce',
        path: PATH_DASHBOARD.eCommerce.root,
        icon: ICONS.cart,
        children: [
          { title: 'seller', path: PATH_DASHBOARD.eCommerce.seller },
          { title: 'manage orders', path: PATH_DASHBOARD.eCommerce.orderList },
          { title: 'manage products', path: PATH_DASHBOARD.eCommerce.list }
        ]
      },
      // MANAGEMENT: KNOWLEDGE
      {
        title: 'blogs',
        path: PATH_DASHBOARD.general.blogVerification,
        icon: ICONS.blog,
        children: [{ title: 'verification', path: PATH_DASHBOARD.general.blogVerification }]
      }
    ]
  },
  // FINANCE
  {
    subheader: 'finance',
    items: [
      {
        title: 'home',
        path: PATH_DASHBOARD.finance.home,
        accessibleRoles: ['MEMBER'],
        icon: ICONS.banking
      },
      {
        title: 'report',
        path: PATH_DASHBOARD.finance.report,
        accessibleRoles: ['CUSTOMER'],
        icon: ICONS.banking
      },
      {
        title: 'member report',
        path: PATH_DASHBOARD.finance.memberReport,
        accessibleRoles: ['MEMBER'],
        icon: ICONS.banking
      },
      {
        title: 'disbursement request',
        path: PATH_DASHBOARD.finance.disbursementRequest,
        accessibleRoles: ['CUSTOMER'],
        icon: ICONS.banking
      },
      {
        title: 'deprecation register',
        path: PATH_DASHBOARD.finance.deprecationRegister,
        accessibleRoles: ['CUSTOMER'],
        icon: ICONS.banking
      }
    ]
  },
  // E-COMMERCE
  {
    subheader: 'e-commerce',
    accessibleRoles: ['CUSTOMER'],
    items: [
      { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop, icon: ICONS.cart },
      { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout, icon: ICONS.cart },
      { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice, icon: ICONS.cart }
    ]
  }
];

export default sidebarConfig;
