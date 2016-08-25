
var _ = require('lodash');

module.exports = function (key, val) {
    var obj = {};

    val = val.replace(/\'/g, '');
    
    // fix `background` to `backgroundColor`
    if (key === 'background') {
        obj[key + 'Color'] = val;
        return obj;
    }

    if ('fontVariant' === key) {
        obj['fontVariant'] = val.split(/\s+/g);
        return obj;
    }

    // fix val width unit -- `px`
    if (!/^backgroundSize|margin|padding$/i.test(key)) {

        // string: a-Z or slash or sharp
        var r_str = /^[a-zA-Z\-]+$|^\#[a-zA-Z\d]{3}$|^\#[a-zA-Z\d]{6}$|^(rgb|hsl)a?\((\s*\d+\%?\s*,)(\s*\d+\%?\s*,)(\s*\d+\%?\s*(,\s*(\d?\.?\d+)\%?\s*)?)\)$/;

        if (r_str.test(val)) {
            obj[key] = val;
        } else {
            obj[key] = parseFloat(val, 10);    
        }
        return obj;
    }
    
    // fix margin padding
    if (/^margin|padding$/.test(key)) {
        val = _.map(_.compact(val.split(/\s+/)), function (val) {
            return parseFloat(val, 10);
        }).slice(0, 4);

        switch (val.length) {
            case 1:
                obj[key] = val[0];
                break;
            case 2:
                obj[key + 'Vertical'] = val[0];
                obj[key + 'Horizontal'] = val[1];
                break;
            case 3:
                obj[key + 'Top'] = val[0];
                obj[key + 'Horizontal'] = val[1];
                obj[key + 'Bottom'] = val[2];
                break;
            case 4:
                obj[key + 'Top'] = val[0];
                obj[key + 'Right'] = val[1];
                obj[key + 'Bottom'] = val[2];
                obj[key + 'Left'] = val[3];
                break;

        }

        return obj;
    }

    // TODO
    // fix border
    // do we really need this?
    
    // fix backgroundSize ==> resizeMode
    if ('backgroundSize' === key) {
        obj['resizeMode'] = val;
        return obj;
    }

    return null;
};
