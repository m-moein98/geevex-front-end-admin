import { NbMenuItem } from '@nebular/theme';
let user

export const MENU_ITEMS: NbMenuItem[] = [];
function setMenuItems() {
  try {
    user = JSON.parse(localStorage.getItem('decodedToken'));
  } catch (error) {
    user = null
  }
  MENU_ITEMS.length = 0;
  if (!user) {
    MENU_ITEMS.push(
      {
        title: 'login',
        icon: 'unlock-outline',
        link: '/pages/admin/login',
        home: true,
      },
    )
  }
  if (user) {
    MENU_ITEMS.push(
      {
        title: 'vendors',
        link: '/pages/admin/vendors',
        icon: 'car-outline',
      },
      {
        title: 'coins',
        link: '/pages/admin/coins',
        icon: 'radio-button-on-outline',
      },
      {
        title: 'order playground',
        link: '/pages/admin/orders/playground',
        icon: 'code-outline',
      },
      // {
      //   title: 'accounting',
      //   link: '/pages/admin/accounting',
      //   icon: 'book-outline',
      // },
      // {
      //   title: 'kyc',
      //   link: '/pages/admin/kyc',
      //   icon: 'checkmark-square-outline',
      // },
      // {
      //   title: 'deposit',
      //   link: '/pages/admin/deposit',
      //   icon: 'download-outline',
      // },
      // {
      //   title: 'withdrawal',
      //   link: '/pages/admin/withdrawal',
      //   icon: 'upload-outline',
      // },
      // {
      //   title: 'exchange platform',
      //   link: '/pages/admin/exchangeplatform',
      //   icon: 'swap-outline',
      // },
      // {
      //   title: 'fees',
      //   link: '/pages/admin/fees',
      //   icon: 'percent-outline',
      // },
      // {
      //   title: 'notifications',
      //   link: '/pages/admin/notifications',
      //   icon: 'bell-outline',
      // },
      // {
      //   title: 'ticketing',
      //   link: '/pages/admin/ticketing',
      //   icon: 'message-circle-outline',
      // },
      // {
      //   title: 'users',
      //   link: '/pages/admin/users',
      //   icon: 'people-outline',
      // },
      // {
      //   title: 'wallet',
      //   link: '/pages/admin/wallet',
      //   icon: 'credit-card-outline',
      // },
      // {
      //   title: 'basket management',
      //   link: '/pages/admin/basketmanagement',
      //   icon: 'shopping-cart-outline',
      // },
      // {
      //   title: 'geevbot',
      //   link: '/pages/admin/geevbot',
      //   icon: 'settings-2-outline',
      // },
      // {
      //   title: 'geevfi',
      //   link: '/pages/admin/geevfi',
      //   icon: 'activity-outline',
      // },
    );
  }
}
setMenuItems()
window.addEventListener("storage", function () {
  setMenuItems()
}, false);

// if (true) {
//   MENU_ITEMS.push({
//     title: 'Developement Modules',
//     group: true,
//   }, {
//     title: 'Layout',
//     icon: 'layout-outline',
//     children: [
//       {
//         title: 'Stepper',
//         link: '/pages/layout/stepper',
//       },
//       {
//         title: 'List',
//         link: '/pages/layout/list',
//       },
//       {
//         title: 'Infinite List',
//         link: '/pages/layout/infinite-list',
//       },
//       {
//         title: 'Accordion',
//         link: '/pages/layout/accordion',
//       },
//       {
//         title: 'Tabs',
//         pathMatch: 'prefix',
//         link: '/pages/layout/tabs',
//       },
//     ],
//   },
//     {
//       title: 'Forms',
//       icon: 'edit-2-outline',
//       children: [
//         {
//           title: 'Form Inputs',
//           link: '/pages/forms/inputs',
//         },
//         {
//           title: 'Form Layouts',
//           link: '/pages/forms/layouts',
//         },
//         {
//           title: 'Buttons',
//           link: '/pages/forms/buttons',
//         },
//         {
//           title: 'Datepicker',
//           link: '/pages/forms/datepicker',
//         },
//       ],
//     },
//     {
//       title: 'UI Features',
//       icon: 'keypad-outline',
//       link: '/pages/ui-features',
//       children: [
//         {
//           title: 'Grid',
//           link: '/pages/ui-features/grid',
//         },
//         {
//           title: 'Icons',
//           link: '/pages/ui-features/icons',
//         },
//         {
//           title: 'Typography',
//           link: '/pages/ui-features/typography',
//         },
//         {
//           title: 'Animated Searches',
//           link: '/pages/ui-features/search-fields',
//         },
//       ],
//     },
//     {
//       title: 'Modal & Overlays',
//       icon: 'browser-outline',
//       children: [
//         {
//           title: 'Dialog',
//           link: '/pages/modal-overlays/dialog',
//         },
//         {
//           title: 'Window',
//           link: '/pages/modal-overlays/window',
//         },
//         {
//           title: 'Popover',
//           link: '/pages/modal-overlays/popover',
//         },
//         {
//           title: 'Toastr',
//           link: '/pages/modal-overlays/toastr',
//         },
//         {
//           title: 'Tooltip',
//           link: '/pages/modal-overlays/tooltip',
//         },
//       ],
//     },
//     {
//       title: 'Extra Components',
//       icon: 'message-circle-outline',
//       children: [
//         {
//           title: 'Progress Bar',
//           link: '/pages/extra-components/progress-bar',
//         },
//         {
//           title: 'Spinner',
//           link: '/pages/extra-components/spinner',
//         },
//         {
//           title: 'Alert',
//           link: '/pages/extra-components/alert',
//         },
//         {
//           title: 'Chat',
//           link: '/pages/extra-components/chat',
//         },
//       ],
//     },
//     {
//       title: 'Maps',
//       icon: 'map-outline',
//       children: [
//         {
//           title: 'Leaflet Maps',
//           link: '/pages/maps/leaflet',
//         },
//         {
//           title: 'Bubble Maps',
//           link: '/pages/maps/bubble',
//         },
//       ],
//     },
//     {
//       title: 'Charts',
//       icon: 'pie-chart-outline',
//       children: [
//         {
//           title: 'Echarts',
//           link: '/pages/charts/echarts',
//         },
//         {
//           title: 'Charts.js',
//           link: '/pages/charts/chartjs',
//         },
//         {
//           title: 'D3',
//           link: '/pages/charts/d3',
//         },
//       ],
//     },
//     {
//       title: 'Editors',
//       icon: 'text-outline',
//       children: [
//         {
//           title: 'TinyMCE',
//           link: '/pages/editors/tinymce',
//         },
//         {
//           title: 'CKEditor',
//           link: '/pages/editors/ckeditor',
//         },
//       ],
//     },
//     {
//       title: 'Tables & Data',
//       icon: 'grid-outline',
//       children: [
//         {
//           title: 'Smart Table',
//           link: '/pages/tables/smart-table',
//         },
//         {
//           title: 'Tree Grid',
//           link: '/pages/tables/tree-grid',
//         },
//       ],
//     },
//     {
//       title: 'Miscellaneous',
//       icon: 'shuffle-2-outline',
//       children: [
//         {
//           title: '404',
//           link: '/pages/miscellaneous/404',
//         },
//       ],
//     },
//   );
// }
