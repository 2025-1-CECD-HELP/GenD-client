import {atom} from 'jotai';
import {BreadcrumbItem} from './types';

export const breadcrumbStackState = atom<BreadcrumbItem[]>([]);
