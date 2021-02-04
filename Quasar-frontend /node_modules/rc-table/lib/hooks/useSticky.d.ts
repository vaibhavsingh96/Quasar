import { TableSticky } from '../interface';
export default function useSticky(sticky: boolean | TableSticky, prefixCls: string): {
    isSticky: boolean;
    offsetHeader: number;
    offsetScroll: number;
    stickyClassName: string;
};
