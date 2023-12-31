import { NextFunction, Request, Response } from "express";

function isClass(target: any) {
  return typeof target === "function" && /^\s*class\s+/.test(target.toString());
}

function isAsyncFunction(target: any) {
  return (
    typeof target === "function" && target.constructor.name === "AsyncFunction"
  );
}

function TryCatchClass(target: any) {
  const methodNames = Object.getOwnPropertyNames(target.prototype);
  methodNames.forEach((methodName) => {
    const originalMethod = target.prototype[methodName];
    if (!(typeof target.prototype[methodName] === "function")) return;
    const isAsync =
      target.prototype[methodName].constructor.name === "AsyncFunction";

    isAsync &&
      (target.prototype[methodName] = async function (
        req: Request,
        res: Response,
        next: NextFunction
      ) {
        try {
          const responseBody = await originalMethod.call(this, req, res, next);
          if (responseBody) return res.send(responseBody);
        } catch (error) {
          next(error);
        }
      });
  });

  return target;
}

function TryCatchFunction(target: any) {
  if (
    !(
      typeof target === "function" &&
      target.constructor.name === "AsyncFunction"
    )
  )
    return;
  const originalTarget = target;
  target = async function (req: Request, res: Response, next: NextFunction) {
    try {
      const responseBody = await originalTarget(req, res, next);
      if (responseBody) return res.send(responseBody);
    } catch (error) {
      next(error);
    }
  };

  return target;
}

export default function TryCatch(target: any) {
  if (isClass(target)) return TryCatchClass(target);
  if (isAsyncFunction(target)) return TryCatchFunction(target);
}
