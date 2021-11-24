class DesignPatternError extends Error {}


class InvalidParam extends DesignPatternError {
    constructor(fields) {
        super()
        this.fields = fields
        this.message = "Invalid Param"
        this.statusCode = 404
    }
}

class NoUser extends DesignPatternError {
    constructor(fields) {
        super()
        this.fields = fields
        this.message = "There is no user with that id"
        this.statusCode = 404
    }
}

module.exports = {
    InvalidParam,
    NoUser
}