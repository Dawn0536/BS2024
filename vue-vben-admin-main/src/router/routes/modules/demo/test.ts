import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
// import { t } from '@/hooks/web/useI18n';

const home: AppRouteModule = {
  path: '/chemistry',
  name: 'Chemistry',
  component: LAYOUT,
  redirect: '/Chemistry/index',
  meta: {
    orderNo: 2000,
    icon: 'covid:virus-lab-research-microscope',
    title: '化学实验',
  },
  children: [
    {
      path: 'index',
      name: 'ChemistryPage',
      component: () => import('@/views/sys/Chemistry/index.vue'),
      meta: {
        title: '个人中心',
        icon: 'simple-icons:aboutdotme',
        hideMenu: true,
      },
    },
  ],
};

export default home;
