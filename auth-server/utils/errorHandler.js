class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith('4')?'fails':'error';
        this.isOperational=true; 
        
        Error.captureStackTrace(this,this.constructor)
    }
}
module.exports=ErrorHandler;

//isOperational--->Helps you differentiate between expected errors (like wrong input) vs unexpected ones (like bugs in code).