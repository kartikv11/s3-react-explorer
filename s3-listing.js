if (typeof BUCKET_URL == 'undefined') {
  var BUCKET_URL = location.protocol + '//' + location.hostname;
}
jQuery(function($) {
  getS3Data();
});

function getS3Data(marker, info) {
  var s3_rest_url = createS3QueryUrl(marker);

  $.get(s3_rest_url)
    .done(function(data) {

      var xml = $(data);

      var info = info + getInfoFromS3Data(xml);

      // buildNavigation(info)

      // html = typeof html !== 'undefined' ? html + prepareTable(info) : prepareTable(info);
      if (info.nextMarker != "null") {
        getS3Data(info.nextMarker, info);
      } else {

        console.log(info);
      }
    })
    .fail(function(error) {
      console.error(error);
    });
}


function createS3QueryUrl(prefix) {
  var s3_rest_url = BUCKET_URL;
  s3_rest_url += '?delimiter=/';


  if (prefix) {
    // make sure we end in /
    var prefix = prefix.replace(/\/$/, '') + '/';
    s3_rest_url += '&prefix=' + prefix;
  }

  return s3_rest_url;
}

function getInfoFromS3Data(xml) {
  var files = $.map(xml.find('Contents'), function(item) {
    item = $(item);
    return {
      Key: item.find('Key').text(),
      Type: 'file'
    }
  });
  var directories = $.map(xml.find('CommonPrefixes'), function(item) {
    item = $(item);
    return {
      Key: item.find('Prefix').text(),
      Size: '0',
      Type: 'directory'
    }
  });
  return {
    files: files,
    directories: directories,
    prefix: $(xml.find('Prefix')[0]).text(),
    nextMarker: encodeURIComponent(nextMarker)
  }
}
