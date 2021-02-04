/// <reference types="react" />
import { HeaderProps } from './Header';
export interface FixedHeaderProps<RecordType> extends HeaderProps<RecordType> {
    noData: boolean;
    colWidths: number[];
    columCount: number;
    direction: 'ltr' | 'rtl';
    fixHeader: boolean;
}
declare function FixedHeader<RecordType>({ noData, columns, flattenColumns, colWidths, columCount, stickyOffsets, direction, fixHeader, ...props }: FixedHeaderProps<RecordType>): JSX.Element;
export default FixedHeader;
