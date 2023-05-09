export class CustomErr extends Error {
  code: number = 0;
}

module.exports.customError = (status: number, msg: string) => {
  const err: CustomErr = new CustomErr();
  err.code = status ? status : 502;
  err.message = msg ? msg : "Server Having Issues";
  return err;
};
