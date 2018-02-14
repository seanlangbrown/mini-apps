
const _ = require('underscore');

const Data  = class {
  constructor() {
    this._data = [];
    this._headers = [];
  }

  writeHeaders (headers) {
    if (Array.isArray(headers) && (headers.length === this._headers.length || this._headers.length === 0)) {
      this._headers = headers;
    }
  }

  addRow (row) {
    if(Array.isArray(row) && row.length === this._headers.length) {
      this._data.push(row);
    }
  }

  addCol (row, header, overwrite=true) {
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


  iterCol (colnum, callback) {
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
  }

  iterRow (rownum, callback) {
    if (row < this._data.length) {
      _.each(this._data[rownum], callback);
    }
  }

  iterAll (callback, headers) {
    if (headers) {
      _.each(this._headers, callback);
    }
    _.each(this_.data, (row) => {
      _.each(row, callback);
    })
  }
 
  iterColValues (colunm, callback) {
    this.itercol(colnum, (element) => {
      return callback(element.value);
    })
  }

  iterRowValues (rownum, callback) {
    this.iterRow(rownum, (element) => {
      callback(element.value);
    })
  }

  iterAllValues (callback, headers) {
    this.iterAll((item) => {
      callback(item.value);
    }, headers);
  }

//method to insert header,row....
//method to get header,row...

  printData (rowSeperator, colSeperator) {
    let rows = [];
    for(var i = 0; i < this._data.length; i++) {
      let row = []
      this.iterRowValues(i, (val) => (rows[i].push(val)));
      rows.push(row.join(colSeperator));
    }

    page = rows.join(rowSeperator);
    return page;
  }

  printCSV () {
    return this.printData('\n', ',');
  }

  importJSON (obj) {
    let headers = [];
    let row = [];
    for (var key in obj) {
      if(key !== 'children') {
        headers.push(key);
      }
    }
    this._headers = headers;

    const rowWorker = (child) => {
      let row = [];
      for(var j = 0; j < headers.length; j++) {
        row.push(child[header[j]]);
      }
      this.addRow(row);
      for(var i = 0; i < child.children.length; i++) {
        rowWorker(child.children[i]);
      }
    };
    rowWorker(obj);
  }

};

class Element {
  constructor() {
    this.value = null;
    this.head = null;
    this.row = null;
  }
};


module.exports = Data;
