class ApiError extends Error{
    constructor(
        statusCode,
        message="Somethings went Wrong",
        error = [],
        stack = ""
    )
    {
        super(message)
        this.statusCode = statusCode,
        this.message = message,
        this.error = error,
        this.success = false

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this , this.Constructure)
        }
    }
}
export default ApiError;