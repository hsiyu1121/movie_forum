"use strict";

module.exports = {
  ifCond: function ifCond(a, b, options) {
    if (a === b) {
      return options.fn(this);
    }

    return options.inverse(this);
  }
};