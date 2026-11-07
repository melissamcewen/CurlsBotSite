import { visit } from 'unist-util-visit'

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function textOf(node) {
  if (node.type === 'text') return node.value || ''
  if (!node.children) return ''
  return node.children.map(textOf).join('')
}

/**
 * Add ids to markdown headings using the same slug rules as TableOfContents.
 * Skips headings that already have an id. Repeats get a -2, -3, … suffix.
 */
export default function rehypeHeadingIds() {
  return (tree) => {
    const seen = new Map()

    visit(tree, 'element', (node) => {
      if (!/^h[1-6]$/.test(node.tagName || '') || node.properties?.id) return

      const base = slugify(textOf(node))
      if (!base) return

      const count = (seen.get(base) || 0) + 1
      seen.set(base, count)
      node.properties ||= {}
      node.properties.id = count === 1 ? base : `${base}-${count}`
    })
  }
}
