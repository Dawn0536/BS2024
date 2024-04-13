import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: t('routes.demo.system.moduleName'),
  },
  children: [
    {
      path: 'user',
      name: 'UserManagement',
      meta: {
        title: t('routes.demo.system.account'),
        ignoreKeepAlive: false,
        // roles: RoleEnum.SUPER,
      },
      component: () => import('@/views/demo/system/user/index.vue'),
    },

    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: t('routes.demo.system.role'),
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/demo/system/role/index.vue'),
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: '修改密码',
        ignoreKeepAlive: true,
        hideMenu: true,
      },
      component: () => import('@/views/demo/system/password/index.vue'),
    },
    {
      path: 'dailyRecord',
      name: 'DailyRecord',
      meta: {
        title: '日志管理',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/sys/daily/index.vue'),
    },
    {
      path: 'menu',
      name: 'Menu',
      meta: {
        title: '菜单管理',
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/demo/system/menu/index.vue'),
    },
  ],
};

export default system;
