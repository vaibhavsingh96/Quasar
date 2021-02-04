import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import { useMemo } from 'react';
import Header from './Header';
import ColGroup from '../ColGroup';
import TableContext from '../context/TableContext';

function useColumnWidth(colWidths, columCount) {
  return useMemo(function () {
    var cloneColumns = [];

    for (var i = 0; i < columCount; i += 1) {
      var val = colWidths[i];

      if (val !== undefined) {
        cloneColumns[i] = val;
      } else {
        return null;
      }
    }

    return cloneColumns;
  }, [colWidths.join('_'), columCount]);
}

function FixedHeader(_ref) {
  var noData = _ref.noData,
      columns = _ref.columns,
      flattenColumns = _ref.flattenColumns,
      colWidths = _ref.colWidths,
      columCount = _ref.columCount,
      stickyOffsets = _ref.stickyOffsets,
      direction = _ref.direction,
      fixHeader = _ref.fixHeader,
      props = _objectWithoutProperties(_ref, ["noData", "columns", "flattenColumns", "colWidths", "columCount", "stickyOffsets", "direction", "fixHeader"]);

  var _React$useContext = React.useContext(TableContext),
      prefixCls = _React$useContext.prefixCls,
      scrollbarSize = _React$useContext.scrollbarSize,
      isSticky = _React$useContext.isSticky;

  var combinationScrollBarSize = isSticky && !fixHeader ? 0 : scrollbarSize; // Add scrollbar column

  var lastColumn = flattenColumns[flattenColumns.length - 1];
  var ScrollBarColumn = {
    fixed: lastColumn ? lastColumn.fixed : null,
    onHeaderCell: function onHeaderCell() {
      return {
        className: "".concat(prefixCls, "-cell-scrollbar")
      };
    }
  };
  var columnsWithScrollbar = useMemo(function () {
    return combinationScrollBarSize ? [].concat(_toConsumableArray(columns), [ScrollBarColumn]) : columns;
  }, [combinationScrollBarSize, columns]);
  var flattenColumnsWithScrollbar = useMemo(function () {
    return combinationScrollBarSize ? [].concat(_toConsumableArray(flattenColumns), [ScrollBarColumn]) : flattenColumns;
  }, [combinationScrollBarSize, flattenColumns]); // Calculate the sticky offsets

  var headerStickyOffsets = useMemo(function () {
    var right = stickyOffsets.right,
        left = stickyOffsets.left;
    return _objectSpread(_objectSpread({}, stickyOffsets), {}, {
      left: direction === 'rtl' ? [].concat(_toConsumableArray(left.map(function (width) {
        return width + combinationScrollBarSize;
      })), [0]) : left,
      right: direction === 'rtl' ? right : [].concat(_toConsumableArray(right.map(function (width) {
        return width + combinationScrollBarSize;
      })), [0]),
      isSticky: isSticky
    });
  }, [combinationScrollBarSize, stickyOffsets, isSticky]);
  var mergedColumnWidth = useColumnWidth(colWidths, columCount);
  return React.createElement("table", {
    style: {
      tableLayout: 'fixed',
      visibility: noData || mergedColumnWidth ? null : 'hidden'
    }
  }, React.createElement(ColGroup, {
    colWidths: mergedColumnWidth ? [].concat(_toConsumableArray(mergedColumnWidth), [combinationScrollBarSize]) : [],
    columCount: columCount + 1,
    columns: flattenColumnsWithScrollbar
  }), React.createElement(Header, Object.assign({}, props, {
    stickyOffsets: headerStickyOffsets,
    columns: columnsWithScrollbar,
    flattenColumns: flattenColumnsWithScrollbar
  })));
}

export default FixedHeader;