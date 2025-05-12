import { cache } from 'react';
import api from './api';

// Cache the menu items fetch
export const getMenuItems = cache(async () => {
  const homePage = await api.getPage('/', 'base.HomePage');
  const response = await api.getPages('wagtailcore.Page', {
    child_of: `${homePage.id}`,
    show_in_menus: 'true',
  });
  return response.items;
});
