(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["@jbmckeon/reactstrap-table"] = factory();
	else
		root["@jbmckeon/reactstrap-table"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return webpackJsonp_jbmckeon_reactstrap_table([1],{

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap_pager__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap_pager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap_pager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reactstrap__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Columns__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__TableCell__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
var _ReactstrapTable$prop;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var CenteredText = function CenteredText(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "div",
    { className: "text-center font-italic" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("hr", null),
    " ",
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "h5",
      null,
      props.text
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("hr", null)
  );
};

var ReactstrapTable = function (_React$Component) {
  _inherits(ReactstrapTable, _React$Component);

  function ReactstrapTable(props, context) {
    _classCallCheck(this, ReactstrapTable);

    var _this = _possibleConstructorReturn(this, (ReactstrapTable.__proto__ || Object.getPrototypeOf(ReactstrapTable)).call(this, props, context));

    _this.getBody = _this.getBody.bind(_this);
    _this.getHeaders = _this.getHeaders.bind(_this);
    _this.hasData = _this.hasData.bind(_this);
    _this.totalPages = _this.totalPages.bind(_this);
    _this.pageChanged = _this.pageChanged.bind(_this);
    _this.sortClicked = _this.sortClicked.bind(_this);
    _this.getColumnDef = _this.getColumnDef.bind(_this);

    _this.state = {
      HasData: _this.hasData(),
      TotalPages: _this.totalPages(),
      CurrentPage: 1,
      SortedData: _this.props.data,
      ColumnDefs: _this.getColumnDefs(_this.props.data)
    };
    return _this;
  }

  _createClass(ReactstrapTable, [{
    key: "totalPages",
    value: function totalPages() {
      if (this.props.data) {
        return this.props.data.length / this.props.pagesDisplayed;
      } else {
        return 0;
      }
    }
  }, {
    key: "pageChanged",
    value: function pageChanged(pageNum) {
      this.setState({ CurrentPage: pageNum });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      this.setState({ ColumnDefs: this.getColumnDefs(newProps.Data) });
    }
  }, {
    key: "sortClicked",
    value: function sortClicked(ordinal, sortAscending) {
      var data = this.state.SortedData;
      //get field
      var row = data[0];
      var key = Object.keys(row)[ordinal];
      var val = row[key];
      var isDate = __WEBPACK_IMPORTED_MODULE_7_moment___default()(val).isValid();

      //https://stackoverflow.com/a/9716488/1342632
      var isNumber = !isNaN(parseFloat(val)) && isFinite(val);

      var sortedData;

      console.log(isDate);
      console.log(isNumber);
      var comparer = void 0;

      if (isDate) {
        sortedData = data.sort(function (a, b) {
          return sortAscending ? new Date(a) - new Date(b) : new Date(b) - new Date(a);
        });
      } else if (isNumber) {
        comparer = function comparer(a, b) {
          return parseInt(a[key]) - parseInt(b[key]);
        };
      } else {
        comparer = function compare(a, b) {
          // Use toUpperCase() to ignore character casing
          var valA = a[key].toUpperCase();
          var valB = b[key].toUpperCase();

          var comparison = 0;
          if (valA > valB) {
            comparison = 1;
          } else if (valA < valB) {
            comparison = -1;
          }
          return comparison;
        };
      }

      sortedData = sortAscending ? data.sort(comparer) : data.reverse(comparer);

      console.log(sortedData.map(function (d) {
        return d[key];
      }));
      this.setState({
        SortedData: sortedData
      });
    }
  }, {
    key: "getColumnDef",
    value: function getColumnDef(fieldName) {
      return this.state.ColumnDefs.find(function (def) {
        return def.fieldName === fieldName;
      });
    }
    //builds column defs

  }, {
    key: "getColumnDefs",
    value: function getColumnDefs(data) {
      var _this2 = this;

      if (!data || data.length === 0) {
        return [];
      }
      //no columndefs provided, use first row in data
      var row = data[0];

      return Object.keys(row).map(function (r, i) {
        //find columnDef based on field name
        var def = _this2.props.columnDefs && _this2.props.columnDefs.find(function (d) {
          return d.fieldName === r;
        });

        //if a column def has been provided for this ordinal, use it
        if (def) {
          return def;
        } else {
          return new __WEBPACK_IMPORTED_MODULE_4__Columns__["b" /* ColumnDef */](r, r);
        }
      });
    }
  }, {
    key: "getHeaders",
    value: function getHeaders() {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "tr",
        null,
        this.state.ColumnDefs.map(function (c, i) {
          if (c.sortable) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_4__Columns__["d" /* SortableColumn */],
              {
                key: i,
                ordinal: i,
                columnDef: c,
                sortClicked: _this3.sortClicked
              },
              c.headerText
            );
          } else {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_4__Columns__["a" /* Column */],
              { key: i, ordinal: i, columnDef: c },
              c.headerText
            );
          }
        })
      );
    }
  }, {
    key: "getBody",
    value: function getBody() {
      var _this4 = this;

      if (!this.state.HasData) {
        return [];
      }
      var start = (this.state.CurrentPage - 1) * this.props.pagesDisplayed;
      var end = start + this.props.pagesDisplayed;
      return this.state.SortedData.slice(start, end).map(function (row, i) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "tr",
          { key: i },
          Object.keys(row).map(function (key, j) {
            var def = _this4.getColumnDef(key);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5__TableCell__["a" /* default */],
              {
                id: "r" + i + "c" + j,
                key: j,
                onClick: _this4.props.cellClicked,
                columnDef: def
              },
              row[key].toString()
            );
          })
        );
      });
    }
  }, {
    key: "hasData",
    value: function hasData() {
      return this.props.data ? this.props.data.length > 0 : false;
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.hidden) {
        return null;
      }
      return this.state.HasData ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_reactstrap__["c" /* Table */],
          {
            tag: this.props.tag,
            size: this.props.size,
            bordered: this.props.bordered,
            borderless: this.props.borderless,
            striped: this.props.striped,
            dark: this.props.dark,
            hover: this.props.hover,
            responsive: this.props.responsive
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "thead",
            null,
            this.getHeaders()
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "tbody",
            null,
            this.getBody()
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap_pager___default.a, _extends({}, this.props, {
          totalPages: this.state.TotalPages,
          pageChanged: this.pageChanged
        }))
      ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CenteredText, { text: "No records" });
    }
  }]);

  return ReactstrapTable;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (ReactstrapTable);


ReactstrapTable.propTypes = (_ReactstrapTable$prop = {
  hidden: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  pagesDisplayed: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  columnDefs: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_4__Columns__["c" /* ColumnDefType */]),
  cellClicked: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  tag: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string]),
  size: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  bordered: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  borderless: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  striped: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  dark: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  hover: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  responsive: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
}, _defineProperty(_ReactstrapTable$prop, "columnDefs", __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_4__Columns__["c" /* ColumnDefType */])), _defineProperty(_ReactstrapTable$prop, "data", __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array), _defineProperty(_ReactstrapTable$prop, "cellClicked", __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func), _ReactstrapTable$prop);

ReactstrapTable.defaultProps = {
  pagesDisplayed: 5
};

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fortawesome_react_fontawesome__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fortawesome_fontawesome_free_solid_faAngleUp__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fortawesome_fontawesome_free_solid_faAngleUp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__fortawesome_fontawesome_free_solid_faAngleUp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fortawesome_fontawesome_free_solid_faAngleDown__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fortawesome_fontawesome_free_solid_faAngleDown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__fortawesome_fontawesome_free_solid_faAngleDown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__index_css__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__index_css__);
var _this = this;









var iconSize = "shrink-3";

var SortButton = function SortButton(props) {
  _this.upClicked = function () {
    props.sortClicked(true);
  };
  _this.downClicked = function () {
    props.sortClicked(false);
  };
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "div",
    { className: "d-inline" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__fortawesome_react_fontawesome__["a" /* default */], {
      icon: __WEBPACK_IMPORTED_MODULE_4__fortawesome_fontawesome_free_solid_faAngleUp___default.a,
      onClick: _this.upClicked,
      transform: iconSize,
      className: "sort-icon"
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__fortawesome_react_fontawesome__["a" /* default */], {
      icon: __WEBPACK_IMPORTED_MODULE_5__fortawesome_fontawesome_free_solid_faAngleDown___default.a,
      onClick: _this.downClicked,
      transform: iconSize,
      className: "sort-icon"
    })
  );
};

SortButton.props = {
  sortClicked: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

/* unused harmony default export */ var _unused_webpack_default_export = (SortButton);

/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(177)(false);
// imports


// module
exports.push([module.i, ".sort-icon:hover {\n    color: #c2c8d1\n}\n\n.btn-group-sm>.btn {\n    padding: .125em .25em .125em .25em !important;\n    line-height: 1 !important;\n}", ""]);

// exports


/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ColumnDefType; });
/* harmony export (immutable) */ __webpack_exports__["b"] = ColumnDef;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Column; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SortableColumn; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SortButton__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SortButtonGroup__ = __webpack_require__(180);
var _this = this;








var ColumnDefType = Object(__WEBPACK_IMPORTED_MODULE_2_prop_types__["shape"])({
  fieldName: __WEBPACK_IMPORTED_MODULE_2_prop_types__["string"].isRequired,
  headerText: __WEBPACK_IMPORTED_MODULE_2_prop_types__["string"],
  sortable: __WEBPACK_IMPORTED_MODULE_2_prop_types__["bool"],
  headerStyle: __WEBPACK_IMPORTED_MODULE_2_prop_types__["object"],
  clickable: __WEBPACK_IMPORTED_MODULE_2_prop_types__["bool"],
  hiddenDown: Object(__WEBPACK_IMPORTED_MODULE_2_prop_types__["oneOf"])(["xs", "sm", "md", "lg", "xl"]),
  tooltipText: __WEBPACK_IMPORTED_MODULE_2_prop_types__["string"]
});

function ColumnDef(fieldName, headerText, sortable, headerStyle) {
  if (!fieldName) {
    throw new Error("fieldName is required");
  }
  this.sortable = sortable || false;
  this.headerText = headerText || "";
  this.headerStyle = headerStyle || {};
  this.fieldName = fieldName;
}

var headerClass = function headerClass(hideDown) {
  if (hideDown) {
    return "d-none d-" + hideDown + "-table-cell align-middle";
  } else {
    return "align-middle";
  }
};
var Column = function Column(props) {
  _this.className = headerClass(props.columnDef.hiddenDown);
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "th",
    { style: props.columnDef.headerStyle, className: _this.className },
    props.children
  );
};

var SortableColumn = function SortableColumn(props) {
  _this.sortClicked = function (ascending) {
    props.sortClicked(props.ordinal, ascending);
  };

  _this.className = headerClass(props.columnDef.hiddenDown);
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "th",
    { style: props.columnDef.headerStyle, className: _this.className },
    props.children,
    " ",
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__SortButtonGroup__["a" /* default */], { sortClicked: _this.sortClicked })
  );
};

SortableColumn.propTypes = {
  sortClicked: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func.isRequired,
  ordinal: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number.isRequired,
  columnDef: ColumnDefType.isRequired
};

Column.propTypes = {
  ordinal: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number.isRequired,
  columnDef: ColumnDefType.isRequired,
  onClick: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func
};

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fortawesome_react_fontawesome__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fortawesome_fontawesome_free_solid_faAngleUp__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fortawesome_fontawesome_free_solid_faAngleUp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__fortawesome_fontawesome_free_solid_faAngleUp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fortawesome_fontawesome_free_solid_faAngleDown__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fortawesome_fontawesome_free_solid_faAngleDown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__fortawesome_fontawesome_free_solid_faAngleDown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__index_css__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__index_css__);
var _this = this;









var iconSize = "shrink-3";

var SortButton = function SortButton(props) {
  _this.upClicked = function () {
    props.sortClicked(true);
  };
  _this.downClicked = function () {
    props.sortClicked(false);
  };
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_reactstrap__["b" /* ButtonGroup */],
    {
      vertical: true,
      size: "sm",
      style: { marginLeft: ".5em" },
      className: "float-right"
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_reactstrap__["a" /* Button */],
      { outline: true, onClick: _this.upClicked },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__fortawesome_react_fontawesome__["a" /* default */], {
        icon: __WEBPACK_IMPORTED_MODULE_4__fortawesome_fontawesome_free_solid_faAngleUp___default.a,
        transform: iconSize
        //className="sort-icon"
      })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_reactstrap__["a" /* Button */],
      { outline: true, onClick: _this.downClicked },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__fortawesome_react_fontawesome__["a" /* default */], {
        icon: __WEBPACK_IMPORTED_MODULE_5__fortawesome_fontawesome_free_solid_faAngleDown___default.a,
        transform: iconSize
        //className="sort-icon"
      })
    )
  );
};

SortButton.props = {
  sortClicked: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (SortButton);

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Columns__ = __webpack_require__(18);
var _this = this;






var TableCell = function TableCell(props) {
  _this.cellClicked = function (e) {
    e.preventDefault();
    if (props.onClick) {
      props.onClick(e.currentTarget.attributes["data-fieldname"].value, e.target.text);
    }
  };

  return props.columnDef.clickable ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "td",
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "a",
      {
        "data-fieldname": props.columnDef.fieldName,
        href: "",
        onClick: _this.cellClicked,
        id: props.id
      },
      props.children
    ),
    props.columnDef.tooltipText && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_reactstrap__["d" /* UncontrolledTooltip */],
      { target: props.id, placement: "top" },
      props.columnDef.tooltipText
    )
  ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "td",
    { id: props.id },
    props.children
  );
};

TableCell.propTypes = {
  columnDef: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape(__WEBPACK_IMPORTED_MODULE_3__Columns__["default"]).isRequired,
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (TableCell);

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(176);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(178)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

},[147]);
});