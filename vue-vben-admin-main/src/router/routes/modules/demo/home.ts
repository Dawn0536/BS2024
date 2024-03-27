import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
// import { t } from '@/hooks/web/useI18n';

const home: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/index',
  meta: {
    orderNo: 2000,
    icon: 'ion:home',
    title: '首页',
  },
  children: [
    {
      path: 'index',
      name: 'homePage',
      component: () => import('@/views/sys/home/index.vue'),
      meta: {
        title: '个人中心',
        icon: 'simple-icons:aboutdotme',
        hideMenu: true,
      },
    },
  ],
};

export default home;
