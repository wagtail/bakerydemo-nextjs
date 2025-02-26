import { cache } from 'react';
import api from './api';

// Cache the home page fetch
export const getHomePage = cache(async () => {
  return api.getPage('/', 'base.HomePage');
});

// Cache the menu items fetch
export const getMenuItems = cache(async () => {
  const homePage = await getHomePage();
  const response = await api.getPages('wagtailcore.Page', {
    child_of: `${homePage.id}`,
    show_in_menus: 'true',
  });
  return response.items;
});
