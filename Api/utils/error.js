export const errorHandler=(statusCode,message)=>{
  const error= new Error();

  error.message=message||"internal server error";
  error.statusCode=statusCode||500;
  return error
}