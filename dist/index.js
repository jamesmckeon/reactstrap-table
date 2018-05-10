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

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap_pager__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap_pager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap_pager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reactstrap__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Columns__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash__);
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

    _this.getBody = _this.getBody.bind(_this);
    _this.getHeaders = _this.getHeaders.bind(_this);
    _this.hasData = _this.hasData.bind(_this);
    _this.totalPages = _this.totalPages.bind(_this);
    _this.pageChanged = _this.pageChanged.bind(_this);
    _this.sortClicked = _this.sortClicked.bind(_this);
    _this.getColumnDef = _this.getColumnDef.bind(_this);
    _this.cellClicked = _this.cellClicked.bind(_this);
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

      Object(__WEBPACK_IMPORTED_MODULE_5_lodash__["orderBy"])(data, [key], [sortAscending ? "asc" : "desc"]);

      this.setState({
        SortedData: Object(__WEBPACK_IMPORTED_MODULE_5_lodash__["orderBy"])(data, [key], [sortAscending ? "asc" : "desc"])
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
    key: "cellClicked",
    value: function cellClicked(e) {
      e.preventDefault();
      if (this.props.cellClicked) {
        this.props.cellClicked(e.currentTarget.attributes["data-fieldname"].value, e.target.text);
      }
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

            return def.clickable ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "td",
              { key: j },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "a",
                {
                  "data-fieldname": def.fieldName,
                  href: "",
                  onClick: _this4.cellClicked
                },
                row[key].toString()
              )
            ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "td",
              { key: j },
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


ReactstrapTable.propTypes = {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SortButton__ = __webpack_require__(45);
var _this = this;







var ColumnDefType = Object(__WEBPACK_IMPORTED_MODULE_2_prop_types__["shape"])({
  fieldName: __WEBPACK_IMPORTED_MODULE_2_prop_types__["string"].isRequired,
  headerText: __WEBPACK_IMPORTED_MODULE_2_prop_types__["string"],
  sortable: __WEBPACK_IMPORTED_MODULE_2_prop_types__["bool"],
  headerStyle: __WEBPACK_IMPORTED_MODULE_2_prop_types__["object"],
  clickable: __WEBPACK_IMPORTED_MODULE_2_prop_types__["bool"]
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

var Column = function Column(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "th",
    { style: props.columnDef.headerStyle },
    props.children
  );
};

var SortableColumn = function SortableColumn(props) {
  _this.sortClicked = function (ascending) {
    _this.props.sortClicked(props.ordinal, ascending);
  };

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "th",
    { style: props.columnDef.headerStyle },
    props.children,
    " ",
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__SortButton__["a" /* default */], { sortClicked: _this.sortClicked })
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

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fortawesome_react_fontawesome__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fortawesome_fontawesome_free_solid_faAngleUp__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fortawesome_fontawesome_free_solid_faAngleUp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__fortawesome_fontawesome_free_solid_faAngleUp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fortawesome_fontawesome_free_solid_faAngleDown__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fortawesome_fontawesome_free_solid_faAngleDown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__fortawesome_fontawesome_free_solid_faAngleDown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__index_css__ = __webpack_require__(50);
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

/* harmony default export */ __webpack_exports__["a"] = (SortButton);

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(51);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(53)(content, options);
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

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(52)(false);
// imports


// module
exports.push([module.i, ".sort-icon:hover {\n    color: #c2c8d1\n}", ""]);

// exports


/***/ })

},[17]);
});