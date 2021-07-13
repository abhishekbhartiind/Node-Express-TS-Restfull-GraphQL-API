export enum eAccessType {
  Admin = 1,
  other = 2,
}

export enum eApiErrorMessages {
  api400Error = "Bad Request",
  api401Error = "Unauthorized",
  api403Error = "Forbidden",
  api404Error = "Not Found",
  api405Error = "Method Not Allowed",
  api409Error = "Conflict",
  api422Error = "Unprocessable Entity",
  api500Error = "Internal Server Error",
  api501Error = "Service Unavailable",
  apiNoClueError_0 = "Somthing went worng please try again later!",
  apiNoClueError_1 = "System error occured please contact our support team!",
}

export enum eUserError {
  user404 = "User not find!",
  user401 = "Wrong credentials use!",
  user400 = "User already register",
}
