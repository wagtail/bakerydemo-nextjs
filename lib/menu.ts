import { cache } from 'react';
import api from './api';
import type { wagtailcore } from '@/models';

// Cache the menu items fetch
export const getMenuItems = cache(async () => {
  const homePage = await api.getPage('/', 'base.HomePage');
  const response = await api.getPages('wagtailcore.Page', {
    child_of: `${homePage.id}`,
    show_in_menus: 'true',
  });
  return response.items;
});

export type NavigationLinksProps = {
  menuItems: wagtailcore.Page[];
};
