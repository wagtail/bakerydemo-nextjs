import Link from 'next/link';
import { getMenuItems } from '@/lib/menu';
import HeaderClient from './header/HeaderClient';
import Breadcrumb from './breadcrum/Breadcrumb';

export default async function Navigation() {
  const menuItems = await getMenuItems();

  return (
    <>
    <HeaderClient menuItems={menuItems} />
    <Breadcrumb />
    </>
  );
}
