var post = function() {
  console.log('POST form submit');
};



var JSONHandler = function() {
  $('#JSON_entry').find('button').on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();

    var input_json = $('#JSON_entry').find('textarea').val();
    console.log('input: ', input_json);
    input_json = input_json.replace(/\"/g, "'");
    postJSON(input_json);
    $('#JSON_entry').find('input').val('');
  });
};

var displayCSV = function(csv) {
  //$('.csv').innerHtml('');
  $('#csv').empty();
  $('#csv').append('<h4>CSV:</h4>');
  csv = csv.replace(/\\n/g, '<br />');
  csv = csv.replace(/,/g, ', ');
  $('#csv').append(csv);
};

var displayMessage = function(message) {
  $('#csv').empty();
  $('#csv').append(message);
}

var postJSON = function(data) {
  $.ajax({
    type: 'POST',
    url: '/JSON',
    data: {input_json: data},
    dataType: 'json',
    success: function(data) {
      console.log('POST SUCCESS:', data);
      getCSV(data);
    },
    error: function(jqXHR, error, errorText) {
      displayMessage(errorText);
    }
  });
};

var getCSV = function(processId, attempts) {
 attempts = attempts !== undefined ? attempts : 19;
 console.log('getCSV', attempts);
 $.ajax({
    type: 'GET',
    url: '/CSV',
    data: {csv_id: processId},
    dataType: 'text',
    success: function(data) {
      console.log('GET SUCCESS:', data);

      if (attempts < 0) {
        console.log('TIMEOUT');
        displayMessage('Server is busy, please try again');
        return;
      } else if(data === 'processing') {
        //if processing, ping again
        setTimeout(getCSV(processId, attempts - 1), 200);
        console.log('ping');
        return;
      } else if (data === 'error') {
        //if failed, display message
        console.log('ERROR!');
        displayMessage('Server error: please check your syntax and try again.  Input must be a JSON string with key: value pairs.');
        return;
      } 
      displayCSV(data);
    },
    error: function(jqXHR, textStatus, error) {
      console.log('error function', error);
    }
  });
};

$(document).ready(JSONHandler);