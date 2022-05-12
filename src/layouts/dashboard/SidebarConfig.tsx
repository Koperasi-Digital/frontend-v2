// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';
// icons
import { Icon } from '@iconify/react';
import RoundHome from '@iconify/icons-ic/round-home';
import RoundGroups from '@iconify/icons-ic/round-groups';

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
  booking: getIcon('ic_booking'),
  request: <Icon icon={RoundGroups} width="100%" height="100%" />,
  homepage: <Icon icon={RoundHome} width="100%" height="100%" />
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'coopchick',
    items: [
      {
        title: 'beranda',
        path: PATH_PAGE.homepage,
        icon: ICONS.homepage
      },
      {
        title: 'dashboard',
        path: PATH_DASHBOARD.general.dashboard,
        icon: ICONS.dashboard,
        accessibleRoles: ['ADMIN', 'MEMBER']
      },
      {
        title: 'e-commerce',
        path: PATH_DASHBOARD.eCommerce.root,
        icon: ICONS.cart,
        accessibleRoles: ['CUSTOMER', 'MEMBER'],
        children: [
          {
            title: 'shop',
            path: PATH_DASHBOARD.eCommerce.shop
          },
          {
            title: 'riwayat pesanan',
            path: PATH_DASHBOARD.eCommerce.orderHistory
          }
        ]
      },
      {
        title: 'keuangan',
        icon: ICONS.banking,
        accessibleRoles: ['MEMBER'],
        path: PATH_DASHBOARD.finance.home,
        children: [
          {
            title: 'simpanan sukarela',
            path: PATH_DASHBOARD.finance.addSimpananSukarela
          },
          {
            title: 'pencairan saldo',
            path: PATH_DASHBOARD.finance.disbursementRequest
          }
        ]
      },
      {
        title: 'keuangan',
        path: PATH_DASHBOARD.finance.home,
        icon: ICONS.banking,
        accessibleRoles: ['ADMIN'],
        children: [
          {
            title: 'pendaftaran depresiasi',
            path: PATH_DASHBOARD.finance.deprecationRegister
          },
          {
            title: 'pendaftaran perbaikan',
            path: PATH_DASHBOARD.finance.repairRegister
          },
          {
            title: 'pendaftaran peralatan',
            path: PATH_DASHBOARD.finance.equipmentRegister
          }
        ]
      },
      {
        title: 'aktivitas',
        path: PATH_DASHBOARD.general.activities,
        icon: ICONS.calendar,
        accessibleRoles: ['ADMIN', 'MEMBER']
      },

      { title: 'Forum', path: PATH_DASHBOARD.general.forum, icon: ICONS.chat },
      {
        title: 'blogs',
        path: PATH_DASHBOARD.general.blogs,
        icon: ICONS.blog
      },
      {
        title: 'course',
        accessibleRoles: ['ADMIN', 'MEMBER'],
        path: PATH_DASHBOARD.general.course,
        icon: ICONS.course
      },
      { title: 'FAQ', path: PATH_DASHBOARD.general.faq, icon: ICONS.faq },
      {
        title: 'Request Keanggotaan',
        accessibleRoles: ['CUSTOMER'],
        path: PATH_DASHBOARD.user.memberVerification.request,
        icon: ICONS.request
      }
    ]
  },
  // MANAGEMENT
  {
    subheader: 'manajemen',
    accessibleRoles: ['MEMBER', 'ADMIN'],
    items: [
      // MANAGEMENT : USER
      {
        title: 'pengguna',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        accessibleRoles: ['ADMIN'],
        children: [
          { title: 'daftar pengguna', path: PATH_DASHBOARD.user.list },
          {
            title: 'verifikasi calon anggota',
            path: PATH_DASHBOARD.user.memberVerification.verify
          }
        ]
      },
      // MANAGEMENT : FINANCE
      {
        title: 'keuangan',
        path: PATH_DASHBOARD.managementFinance.root,
        icon: ICONS.banking,
        accessibleRoles: ['ADMIN'],
        children: [
          {
            title: 'penyetujuan pencairan',
            path: PATH_DASHBOARD.managementFinance.disbursementApproval
          },
          {
            title: 'daftar pengajuan pencairan',
            path: PATH_DASHBOARD.managementFinance.disbursementRequestList
          }
        ]
      },
      // MANAGEMENT : E-COMMERCE
      {
        title: 'e-commerce',
        path: PATH_DASHBOARD.eCommerce.seller.root,
        icon: ICONS.cart,
        accessibleRoles: ['MEMBER'],
        children: [
          { title: 'seller', path: PATH_DASHBOARD.eCommerce.seller.center },
          { title: 'manage products', path: PATH_DASHBOARD.eCommerce.seller.list },
          { title: 'manage orders', path: PATH_DASHBOARD.eCommerce.seller.orderList }
        ]
      },
      // MANAGEMENT: KNOWLEDGE
      {
        title: 'blogs',
        path: PATH_DASHBOARD.general.blogVerification,
        icon: ICONS.blog,
        accessibleRoles: ['ADMIN'],
        children: [{ title: 'verification', path: PATH_DASHBOARD.general.blogVerification }]
      },
      // MANAGEMENT: COURSE
      {
        title: 'course',
        path: PATH_DASHBOARD.general.courseManagement,
        icon: ICONS.course,
        accessibleRoles: ['ADMIN'],
        children: [
          { title: 'list', path: PATH_DASHBOARD.general.courseList },
          { title: 'create', path: PATH_DASHBOARD.general.courseNewPost }
        ]
      }
    ]
  }
];

export default sidebarConfig;
