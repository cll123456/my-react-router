import { Key, pathToRegexp } from 'path-to-regexp'
import { IAnyObj } from '../types/commonType';
import { IPathOptions } from '../types/pathMatchTypes';


/**
 * 获取param 匹配的所有内容
 * @param pathRules 匹配的路径规则
 * @param pathname  路径名称
 * @param options 参数
 * @returns 
 */
export function pathMatch(pathRules: string | RegExp | Array<string | RegExp>, pathname: string, options?: IPathOptions) {
  // 获取路径匹配的结果
  const { resObj, keys } = _getPathToRegexpRes(pathRules, pathname, options)
  // 获取参数
  const params = getMathParams(pathRules, pathname, options)
  return {
    isExact: !resObj ? false : resObj.input === resObj[0],
    params,
    path: pathRules,
    url: !resObj ? null : resObj[0]
  }
}
/**
 * 获取路径params匹配的对象
 * @param pathRules 匹配的路径规则
 * @param pathname  路径名称
 * @param options 参数
 * @returns 路径映射的结果
 */
export function getMathParams(pathRules: string | RegExp | Array<string | RegExp>, pathname: string, options?: IPathOptions) {
  const { resObj, keys } = _getPathToRegexpRes(pathRules, pathname, options)
  if (!resObj) return null;
  const resArr = Array.from(resObj)
  return _MapParams(resArr.slice(1), keys)
}
/**
 * 获取pathToRegexp库匹配的结果
 * @param pathRules 匹配的路径规则
 * @param pathname  路径名称
 * @param options 参数
 * @returns 匹配的结果
 */
function _getPathToRegexpRes(pathRules: string | RegExp | Array<string | RegExp>, pathname: string, options?: IPathOptions) {
  // 默认配置
  const defaultOptions: IPathOptions = {
    sensitive: false,
    strict: false,
    exact: false
  }
  // 混合配置
  const { sensitive, strict, exact } = Object.assign({}, defaultOptions, options);

  const keys: Key[] = [];
  const reg = pathToRegexp(pathRules, keys, { sensitive, strict, end: exact });
  const resObj = reg.exec(pathname);
  return {
    resObj,
    keys
  }
}


/**
 * 映射param的参数
 * @param arr 结果
 * @param keysArr 结果匹配的key
 * @returns 
 */
function _MapParams(arr: string[], keysArr: Key[]) {
  let params: IAnyObj = {};
  if (arr.length !== keysArr.length) return params;
  for (let i = 0, l = arr.length; i < l; i++) {
    const prop = keysArr[i].name;
    params[prop] = arr[i]
  }
  return params;
}


export default pathMatch