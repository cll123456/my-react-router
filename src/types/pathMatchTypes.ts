/**
 * 路径的接口
 */
export interface IPathOptions {
  /**
   * 是否大小写敏感
   */
  sensitive?: boolean;
  /**
   * 是否匹配字符串的最后一个 '/'
   */
  strict?: boolean;
  /**
   * 是否精确匹配路径
   */
  exact?: boolean
}

