class DesignPatternError extends Error {}


class InvalidParam extends DesignPatternError {
    constructor() {
        super()
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

class NoProduct extends DesignPatternError {
    constructor(fields) {
        super()
        this.fields = fields
        this.message = "There is no product with that id"
        this.statusCode = 404
    }
}

class AlreadyExists extends DesignPatternError {
    constructor(name) {
        super()
        this.message = name + " already exists"
        this.statusCode = 404
    }
}
class DoesntExist extends DesignPatternError {
    constructor(name) {
        super()
        this.message = name + " doesn't exists"
        this.statusCode = 404
    }
}

class InvalidBody extends DesignPatternError {
    constructor() {
        super()
        this.message = "Invalid body"
        this.statusCode = 404
    }
}


module.exports = {
    InvalidParam,
    NoUser,
    NoProduct,
    AlreadyExists,
    InvalidBody,
    DoesntExist
}