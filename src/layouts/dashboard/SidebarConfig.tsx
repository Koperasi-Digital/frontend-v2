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
  course: getIcon('ic_course'),
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
        icon: ICONS.blog
      },
      {
        title: 'course',
        path: PATH_DASHBOARD.general.course,
        icon: ICONS.course
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
        children: [
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'edit', path: PATH_DASHBOARD.user.editById }
        ]
      },
      // MANAGEMENT : FINANCE
      {
        title: 'finance',
        path: PATH_DASHBOARD.finance.root,
        icon: ICONS.banking,
        children: [
          {
            title: 'disbursement approval',
            path: PATH_DASHBOARD.finance.disbursementApproval
          },
          {
            title: 'disbursement request list',
            path: PATH_DASHBOARD.finance.disbursementRequestList
          }
        ]
      },
      // MANAGEMENT : E-COMMERCE
      {
        title: 'e-commerce',
        path: PATH_DASHBOARD.eCommerce.root,
        icon: ICONS.cart,
        children: [
          { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
          { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
          { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById }
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
  {
    subheader: 'finance',
    accessibleRoles: ['ADMIN'],
    items: [
      { title: 'home', path: PATH_DASHBOARD.finance.home, icon: ICONS.banking },
      { title: 'report', path: PATH_DASHBOARD.finance.report, icon: ICONS.banking },
      { title: 'member report', path: PATH_DASHBOARD.finance.memberReport, icon: ICONS.banking },
      {
        title: 'disbursement request',
        path: PATH_DASHBOARD.finance.disbursementRequest,
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
      { title: 'product', path: PATH_DASHBOARD.eCommerce.productById, icon: ICONS.cart },
      { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout, icon: ICONS.cart },
      { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice, icon: ICONS.cart }
    ]
  }
];

export default sidebarConfig;
