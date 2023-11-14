import type { AST } from 'eslint'
import type { TSESTree } from '@typescript-eslint/utils'
import type * as ESTree from 'estree'

export type ASTNode = TSESTree.Node
export type Token = TSESTree.Token
export { TSESTree as Tree }

export type ESToken = AST.Token
export type ESNode = ESTree.Node
export { ESTree }
