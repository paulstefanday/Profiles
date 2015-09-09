var config = require(__base+'/api/config/config'),
    nodemailer = require("nodemailer"),
    Promise = require("bluebird"),
    smtpTransport = require('nodemailer-smtp-transport');


module.exports.send = function *(mailOptions) {

    var transporter = nodemailer.createTransport(smtpTransport({
      service: "Mandrill",
      auth: config.mandrill
    }));

    var template = yield render(mailOptions)

    var options = {
        from: ( mailOptions.fromName || 'Advocacy Tracker' ) + '<' + ( mailOptions.from || config.email ) + '>',
        to: mailOptions.to,
        subject: mailOptions.subject || 'Advocacy Tracker notification',
        html: template
    }

    if(config.env === 'development') options.to = config.email;

    var smtp = new Promise(function(resolve, reject) {
        transporter.sendMail(options, function(err, info) {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });

    return smtp;

}





function* render(data) {
    var path = './templates/',
        template = data.template + '.jade' || 'test.jade';

    var render = new Promise(function* (resolve, reject) {

        jade.renderFile(path + template, data, function* (err, file) {
            if(err) reject(err);
            resolve(file)
        });

    });

    return render;
}