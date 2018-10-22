import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'Dashboard',
        type: 'link',
        icon: 'feather icon-home'
      },
      {
        state: 'manageusers',
        short_label: 'D',
        name: 'Manage Users',
        type: 'link',
        icon: 'feather icon-home'
      },
      {
        state: 'navigation',
        short_label: 'N',
        name: 'Navigation',
        type: 'link',
        icon: 'feather icon-menu'
      },
      {
        state: 'widget',
        short_label: 'W',
        name: 'Widget',
        type: 'link',
        icon: 'feather icon-layers'
      }
    ],
  }
];


@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
