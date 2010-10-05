var SortableTable = {
  initialize: function() {
    $$('table th.sortable').each(function(e) { e.observe('click', SortableTable.sortTable.bind(SortableTable)); });
  },
  
  sortTable: function(event) {
    if (!event) return;
    event.stop();
    
    var heading = $(event.element());
    if (!heading) return;
    
    var table = heading.up('table');
    var cellindex = heading.cellIndex;
    
    var direction = 'ascending';
    if (heading.hasClassName('sort-ascending')) direction = 'descending';
    if (heading.hasClassName('sort-descending')) direction = false;
    
    var new_rows = new Array();
    
    for (var i = 1; i < table.rows.length; i++) {
      var row = table.rows[i];
      
      if (!row.getAttribute('original-index')) {
        row.setAttribute('original-index', i);
      }
      
      new_rows[new_rows.length] = row;
    }
    
    new_rows = new_rows.sortBy(this.sortFunction.bind(this, direction, cellindex));
    
    if (direction == 'descending') new_rows.reverse();
    
    for (var i = 0; i < new_rows.length; i++) {
      table.tBodies[0].appendChild(new_rows[i]);
    }
    
    heading.removeClassName('sort-ascending');
    heading.removeClassName('sort-descending');
    if (direction) heading.addClassName('sort-' + direction);
  },
  
  sortFunction: function(direction, cellindex, row) {
    if (direction) {
      return row.cells[cellindex].innerHTML;
    } else {
      return row.getAttribute('original-index');
    }
  }
}

document.observe('dom:loaded', SortableTable.initialize);