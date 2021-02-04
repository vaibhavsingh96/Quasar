"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _Header = _interopRequireDefault(require("./Header"));

var _ColGroup = _interopRequireDefault(require("../ColGroup"));

var _TableContext = _interopRequireDefault(require("../context/TableContext"));

function useColumnWidth(colWidths, columCount) {
  return (0, React.useMemo)(function () {
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
      props = (0, _objectWithoutProperties2.default)(_ref, ["noData", "columns", "flattenColumns", "colWidths", "columCount", "stickyOffsets", "direction", "fixHeader"]);

  var _React$useContext = React.useContext(_TableContext.default),
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
  var columnsWithScrollbar = (0, React.useMemo)(function () {
    return combinationScrollBarSize ? [].concat((0, _toConsumableArray2.default)(columns), [ScrollBarColumn]) : columns;
  }, [combinationScrollBarSize, columns]);
  var flattenColumnsWithScrollbar = (0, React.useMemo)(function () {
    return combinationScrollBarSize ? [].concat((0, _toConsumableArray2.default)(flattenColumns), [ScrollBarColumn]) : flattenColumns;
  }, [combinationScrollBarSize, flattenColumns]); // Calculate the sticky offsets

  var headerStickyOffsets = (0, React.useMemo)(function () {
    var right = stickyOffsets.right,
        left = stickyOffsets.left;
    return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, stickyOffsets), {}, {
      left: direction === 'rtl' ? [].concat((0, _toConsumableArray2.default)(left.map(function (width) {
        return width + combinationScrollBarSize;
      })), [0]) : left,
      right: direction === 'rtl' ? right : [].concat((0, _toConsumableArray2.default)(right.map(function (width) {
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
  }, React.createElement(_ColGroup.default, {
    colWidths: mergedColumnWidth ? [].concat((0, _toConsumableArray2.default)(mergedColumnWidth), [combinationScrollBarSize]) : [],
    columCount: columCount + 1,
    columns: flattenColumnsWithScrollbar
  }), React.createElement(_Header.default, Object.assign({}, props, {
    stickyOffsets: headerStickyOffsets,
    columns: columnsWithScrollbar,
    flattenColumns: flattenColumnsWithScrollbar
  })));
}

var _default = FixedHeader;
exports.default = _default;