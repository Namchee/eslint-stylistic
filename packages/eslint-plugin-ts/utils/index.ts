import { ESLintUtils } from '@typescript-eslint/utils'

export * from './astUtils'
export * from './createRule'
export * from './getStringLength'
export * from './isNodeEqual'
export * from './isNullLiteral'
export * from './isUndefinedIdentifier'

const {
  applyDefault,
  deepMerge,
  isObjectNotArray,
  getParserServices,
  nullThrows,
  NullThrowsReasons,
} = ESLintUtils

export type InferMessageIdsTypeFromRule<T> = ESLintUtils.InferMessageIdsTypeFromRule<T>
export type InferOptionsTypeFromRule<T> = ESLintUtils.InferOptionsTypeFromRule<T>

export {
  applyDefault,
  deepMerge,
  isObjectNotArray,
  getParserServices,
  nullThrows,
  NullThrowsReasons,
}
