'use strict';

class Category {

  static instance() {

    return new this(...arguments);
  }

  static shareInstance() {

    if (!(this.__shareInstance instanceof this))
          this.__shareInstance = 
          this.instance(...arguments);

    return this.__shareInstance;
  }

  static extendsof(cA, cB) {

    if ( !cB ) {

      cB = cA;

      cA = this;
    }

    return cA.__proto__ === cB ? true : 
           cA.__proto__ === null ? false : 
           Category.extendsof(cA.__proto__, cB);
  }
}

module.exports = Category;