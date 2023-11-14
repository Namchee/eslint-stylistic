import type { TSESTree } from '@typescript-eslint/utils'
import { createRule } from '../../utils/createRule'
import { docsUrl } from '../../utils/docsUrl'
import type { ASTNode } from '../../utils/types'

// This list is taken from https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements

// Note: 'br' is not included because whitespace around br tags is inconsequential to the rendered output
const INLINE_ELEMENTS = new Set([
  'a',
  'abbr',
  'acronym',
  'b',
  'bdo',
  'big',
  'button',
  'cite',
  'code',
  'dfn',
  'em',
  'i',
  'img',
  'input',
  'kbd',
  'label',
  'map',
  'object',
  'q',
  'samp',
  'script',
  'select',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'textarea',
  'tt',
  'var',
])

const messages = {
  spacingAfterPrev: 'Ambiguous spacing after previous element {{element}}',
  spacingBeforeNext: 'Ambiguous spacing before next element {{element}}',
}

export default createRule({
  meta: {
    type: 'layout',
    docs: {
      description: 'Enforce or disallow spaces inside of curly braces in JSX attributes and expressions',
      url: docsUrl('jsx-child-element-spacing'),
    },
    messages,
    schema: [],
  },
  create(context) {
    const TEXT_FOLLOWING_ELEMENT_PATTERN = /^\s*\n\s*\S/
    const TEXT_PRECEDING_ELEMENT_PATTERN = /\S\s*\n\s*$/

    const elementName = (node: TSESTree.JSXElement) => (
      node.openingElement
      && node.openingElement.name
      && node.openingElement.name.type === 'JSXIdentifier'
      && node.openingElement.name.name
    ) || ''

    const isInlineElement = (node: ASTNode) => (
      node.type === 'JSXElement'
      && INLINE_ELEMENTS.has(elementName(node))
    )

    const handleJSX = (node: TSESTree.JSXElement | TSESTree.JSXFragment) => {
      let lastChild: ASTNode | null = null
      let child: ASTNode | null = null

      ;[...node.children, null].forEach((nextChild) => {
        if (
          (lastChild || nextChild)
          && (!lastChild || isInlineElement(lastChild))
          && (child && (child.type === 'Literal' || child.type === 'JSXText'))
          && (!nextChild || isInlineElement(nextChild))
          && true
        ) {
          if (lastChild && String(child.value).match(TEXT_FOLLOWING_ELEMENT_PATTERN)) {
            context.report({
              messageId: 'spacingAfterPrev',
              node: lastChild,
              loc: lastChild.loc.end,
              data: {
                element: elementName(lastChild as TSESTree.JSXElement),
              },
            })
          }
          else if (nextChild && String(child.value).match(TEXT_PRECEDING_ELEMENT_PATTERN)) {
            context.report({
              messageId: 'spacingBeforeNext',
              node: nextChild,
              loc: nextChild.loc.start,
              data: {
                element: elementName(nextChild as TSESTree.JSXElement),
              },
            })
          }
        }
        lastChild = child
        child = nextChild
      })
    }

    return {
      JSXElement: handleJSX,
      JSXFragment: handleJSX,
    }
  },
})
