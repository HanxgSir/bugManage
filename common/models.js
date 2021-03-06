/**
 * Created by Administrator on 2017/2/27.
 */
module.exports = {
    user: {
        name: {type: String, required: true},
        password: {type: String, required: true},
        email: {type: String, default: true},
        phone: {type: String, default: true}
    },
    bug: {
        description: {type: String, required: true},
        browser: {type: String, required: true},
        level: {type: String, required: true},
        files: {type: Array, required: true},
        user: {type: String, required: true},
        date: {type: Date, required: true},
        date_text: {type: String, required: true},
        code: {type: String, required: true},
        handler: {type: String, default: ''},
        deleted: {type: String, required: true}
    }
};