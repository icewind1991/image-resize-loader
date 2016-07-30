const jimp = require('jimp');
const loaderUtils = require('loader-utils');

var MIMES = {
	'jpg': 'image/jpeg',
	'jpeg': 'image/jpeg',
	'png': 'image/png'
};

module.exports = function (source) {
	this.cacheable && this.cacheable();

	const sourcePath = this.resourcePath;

	var ext = sourcePath.substr(sourcePath.length - 3);
	const query = loaderUtils.parseQuery(this.resourceQuery);
	var mime = MIMES[ext];

	if (!query.width) {
		return source;
	}

	var callback = this.async();

	if (!mime) {
		return callback(new Error('No mime type for file with extension ' + ext + 'supported'));
	}

	jimp.read(sourcePath, function (err, img) {
		if (err) {
			callback(err);
			return;
		}

		function resizeImage (width) {
			img
				.resize(width, jimp.AUTO)
				.getBuffer(mime, function (err, buf) {
					if (err) {
						return callback(err);
					}

					callback(null, buf);
				});
		}

		resizeImage(parseInt(query.width, 10));
	});

};
