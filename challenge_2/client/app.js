var post = function() {
  console.log('POST form submit');
};



var JSONHandler = function() {
  $('#JSON_entry').find('button').on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();

    var input_json = $('#JSON_entry').find('input').val();
    console.log('input: ', input_json);
    input_json = input_json.replace(/\"/g, "'");
    getCSV(input_json);
    $('#JSON_entry').find('input').val('');
  });
}

var getCSV = function(data) {
  $.ajax({
    type: 'POST',
    url: '/JSON',
    data: {input_json: data},
    dataType: 'json',
    success: function(data) {
      console.log(data);
    }
  })
}

$(document).ready(JSONHandler);