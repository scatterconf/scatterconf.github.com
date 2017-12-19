
// boilerplate form handler
var formHandler = function (url) {
  return function () {
    var data = {};
    var parent = $(this).parent();
    var inputs = parent.find('.form-input');
    for (var i=0; i<inputs.length; i++) {
      data[inputs[i].name] = inputs[i].value;
    }
    $.post(url, data, function() {
      $($.find('.agenda p, form')).css('display', 'none')
      $($.find('.agenda p#form-success')).css('display', 'block')
      $('.alert-danger').alert('close');
      $($.find('.agenda h4')).after(
        '<div class="alert alert-success" role="alert">Thanks for your submission! Please check your inbox for a confirmation email.</div>'
      );
    }).fail(function() {
      $('.alert-danger').alert('close');
      $($.find('.agenda h4')).after(
        '<div class="alert alert-danger" role="alert">All fields are required. Please try again.</div>'
      );
    });
    return false;
  }
}

// Cards 
var speakerTemplate = $("#speaker").html();
Mustache.parse(speakerTemplate);
var rendered = Mustache.render(speakerTemplate, SPEAKERS);
$("#speakers").html(rendered);

// Modal
var speakerModalTemplate = $("#speaker-info").html();
Mustache.parse(speakerModalTemplate);

$('.card').on('click', function (e) {
  e.preventDefault();
  var $el = $(e.currentTarget);
  var id = $el.data('id');
  if (id) {
    var speaker = SPEAKERS['speakers'].find(function (s) {
      return s.id == id;
    }) || {};

    // Populate the template
    var rendered = Mustache.render(speakerModalTemplate, speaker);
    $("#speaker-modal").html(rendered);

    // Show the modal
    $('#speaker-modal').modal();
  }
});
