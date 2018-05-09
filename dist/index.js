(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["reactstrap-table"] = factory();
	else
		root["reactstrap-table"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return webpackJsonpreactstrap_table([1],{

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactstrapTable", function() { return ReactstrapTable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap_pager__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap_pager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap_pager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reactstrap__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Columns__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash__);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ColumnDefType", function() { return __WEBPACK_IMPORTED_MODULE_4__Columns__["c"]; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    _this.getColumns = _this.getColumns.bind(_this);
    _this.getBody = _this.getBody.bind(_this);
    _this.getHeaders = _this.getHeaders.bind(_this);
    _this.hasData = _this.hasData.bind(_this);
    _this.totalPages = _this.totalPages.bind(_this);
    _this.pageChanged = _this.pageChanged.bind(_this);
    _this.sortClicked = _this.sortClicked.bind(_this);
    _this.state = {
      HasData: _this.hasData(),
      TotalPages: _this.totalPages(),
      CurrentPage: 1,
      SortedData: _this.props.data
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
    key: "sortClicked",
    value: function sortClicked(ordinal, sortAscending) {
      var data = this.state.SortedData;
      //get field
      var row = data[0];
      var key = Object.keys(row)[ordinal];

      Object(__WEBPACK_IMPORTED_MODULE_5_lodash__["orderBy"])(data, [key], [sortAscending ? "asc" : "desc"]);

      this.setState({
        SortedData: Object(__WEBPACK_IMPORTED_MODULE_5_lodash__["orderBy"])(data, [key], [sortAscending ? "asc" : "desc"])
      });
    }
    //builds column defs

  }, {
    key: "getColumns",
    value: function getColumns() {
      var _this2 = this;

      if (!this.state.HasData) {
        return [];
      }
      //no columndefs provided, use first row in data
      var row = this.props.data[0];

      return Object.keys(row).map(function (r, i) {
        //if a column def has been provided for this ordinal, use it
        if (_this2.props.columnDefs && _this2.props.columnDefs[i]) {
          return _this2.props.columnDefs[i];
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
        this.getColumns().map(function (c, i) {
          if (c.sortable) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_4__Columns__["d" /* SortableColumn */],
              {
                ordinal: i,
                columnDef: c,
                sortToggled: _this3.sortClicked
              },
              c.headerText
            );
          } else {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_4__Columns__["a" /* Column */],
              { ordinal: i, columnDef: c },
              c.headerText
            );
          }
        })
      );
    }
  }, {
    key: "getBody",
    value: function getBody() {
      if (!this.state.HasData) {
        return [];
      }
      var start = (this.state.CurrentPage - 1) * this.props.pagesDisplayed;
      var end = start + this.props.pagesDisplayed;
      return this.state.SortedData.slice(start, end).map(function (row, i) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "tr",
          { key: i },
          Object.keys(row).map(function (key) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "td",
              null,
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
          __WEBPACK_IMPORTED_MODULE_3_reactstrap__["a" /* Table */],
          this.props,
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

ReactstrapTable.propTypes = {
  hidden: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  pagesDisplayed: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  columnDefs: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_4__Columns__["c" /* ColumnDefType */])
};

ReactstrapTable.defaultProps = {
  pagesDisplayed: 5
};

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ColumnDefType; });
/* harmony export (immutable) */ __webpack_exports__["b"] = ColumnDef;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Column; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SortableColumn; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fortawesome_react_fontawesome__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fortawesome_fontawesome_free_solid_faChevronUp__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fortawesome_fontawesome_free_solid_faChevronUp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__fortawesome_fontawesome_free_solid_faChevronUp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fortawesome_fontawesome_free_solid_faChevronDown__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fortawesome_fontawesome_free_solid_faChevronDown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__fortawesome_fontawesome_free_solid_faChevronDown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var ColumnDefType = Object(__WEBPACK_IMPORTED_MODULE_5_prop_types__["shape"])({
  fieldName: __WEBPACK_IMPORTED_MODULE_5_prop_types__["string"].isRequired,
  headerText: __WEBPACK_IMPORTED_MODULE_5_prop_types__["number"],
  sortable: __WEBPACK_IMPORTED_MODULE_5_prop_types__["bool"],
  headerStyle: __WEBPACK_IMPORTED_MODULE_5_prop_types__["object"]
});

function ColumnDef(fieldName, headerText, sortable, headerStyle) {
  if (!fieldName) {
    throw new Error("fieldName is required");
  }
  this.sortable = sortable || false;
  this.headerText = headerText || "";
  this.headerStyle = headerStyle || {};
}

var Column = function Column(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "th",
    {
      key: props.ordinal,
      style: props.columnDef.headerStyle,
      onClick: props.onClick
    },
    props.children
  );
};

var SortableColumn = function (_React$Component) {
  _inherits(SortableColumn, _React$Component);

  function SortableColumn(props, context) {
    _classCallCheck(this, SortableColumn);

    var _this = _possibleConstructorReturn(this, (SortableColumn.__proto__ || Object.getPrototypeOf(SortableColumn)).call(this, props, context));

    _this.state = { Asc: true };
    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  _createClass(SortableColumn, [{
    key: "onClick",
    value: function onClick(e) {
      this.props.sortToggled(this.props.ordinal, this.state.Asc);
      this.setState({ Asc: !this.state.Asc });
    }
  }, {
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        Column,
        {
          key: this.props.ordinal,
          columnDef: this.props.columnDef,
          onClick: this.onClick
        },
        this.props.children,
        " ",
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__fortawesome_react_fontawesome__["a" /* default */], { icon: this.state.Asc ? __WEBPACK_IMPORTED_MODULE_3__fortawesome_fontawesome_free_solid_faChevronUp___default.a : __WEBPACK_IMPORTED_MODULE_4__fortawesome_fontawesome_free_solid_faChevronDown___default.a })
      );
    }
  }]);

  return SortableColumn;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

SortableColumn.propTypes = {
  sortToggled: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func.isRequired,
  ordinal: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.number.isRequired,
  columnDef: ColumnDefType.isRequired
};

Column.propTypes = {
  ordinal: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.number.isRequired,
  columnDef: ColumnDefType.isRequired,
  onClick: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func
};

/***/ })

},[16]);
});