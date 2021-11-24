class DesignPatternError extends Error {}


class InvalidParam extends DesignPatternError {
    constructor(fields) {
        super()
        this.fields = fields
        this.message = "Invalid Param"
        this.errorCode = 404
    }
}

class NoUser extends DesignPatternError {
    constructor(fields) {
        super()
        this.fields = fields
        this.message = "There is no user with that id"
        this.errorCode = 404
    }
}

module.exports = {
    InvalidParam,
    NoUser
}