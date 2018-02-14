
const _ = require('underscore');

const Data = function() {
  this._data = [];
  this._headers = [];

};

const Element = function() {
  this.value = null;
  this.head = null;
  this.row = null;
};

Data.prototype.addRow = function(row) {
  if(Array.isArray(row) && row.length === data.length) {
    this._data.push(row);
  }
};

Data.prototype.addCol = function(row, header, overwrite=true) {
  if(header) {
    let idx = this._headers.indexOf(header);
    if(overwrite && idx !== -1) {
      this.iterCol(idx, (item, i) => (item.value = row[i]));
    } else {
      this._headers.push(header);
      this.iterCol(this._headers.length, (item, i) => {
        item.value = row[i]
        return item;
      });
    }
    return true;
  } else {
    this.iterCol(this.headers.length, (item, i) => {
      if (i === 0) {
        this._headers.push(row[i]);
      } else {
        item.value = row[i];
        return item;
      }
    });
    return true;
  }
  return false;
}


Data.prototype.iterCol = function(colnum, callback) {
  if(colnum < this._headers.length) {
    _.each(this._data, (row, i) => {
      callback(row[colnum]);
    })
  } else {
    _.each(this._data, (row, i) => {
      let newItem = callBack(new Element(), i);
      if(newItem instanceof Element) {
        row[colnum] = newItem;
      }
    });
  }
};

Data.prototype.iterRow = function(rownum, callback) {
  if (row < this._data.length) {
    _.each(this._data[rownum], callback);
  }
}

Data.prototype.iterAll = function(callback, headers) {
  if (headers) {
    _.each(this._headers, callback);
  }
  _.each(this_.data, (row) => {
    _.each(row, callback);
  })
};

Data.prototype.iterColValues = function(colunm, callback) {
  this.itercol(colnum, (element) => {
    return callback(element.value);
  })
};

Data.prototype.iterRowValues = function(rownum, callback) {
  this.iterRow(rownum, (element) => {
    callback(element.value);
  })
};

Data.prototype.iterAllValues = function(callback, headers) {
  this.iterAll((item) => {
    callback(item.value);
  }, headers);
};

//method to insert header,row....
//method to get header,row...

Data.prototype.printData = function(rowSeperator, colSeperator) {
  let rows = [];
  for(var i = 0; i < this._data.length; i++) {
    let row = []
    this.iterRowValues(i, (val) => (rows[i].push(val)));
    rows.push(row.join(colSeperator));
  };

  page = rows.join(rowSeperator);
  return page;
};

Data.prototype.printCSV = function() {
  return this.printData('\n', ',');
};

Data.prototype.importJSON = function(obj) {

};


module.exports = Data;
