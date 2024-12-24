import { visit } from 'unist-util-visit';
import type { Image } from 'mdast';
import type { Plugin } from 'unified';

interface ImageNode extends Image {
  type: 'image';
  url: string;
  alt?: string;
  title?: string;
}

const remarkNextImage: Plugin = () => {
  return (tree) => {
    visit(tree, 'image', (node: ImageNode) => {
      // Convert markdown image to Next.js Image component
      const alt = node.alt || '';
      const src = node.url;

      // Replace the node's type and data
      Object.assign(node, {
        type: 'html',
        value: `<div class="my-6">
          <img
            src="${src}"
            alt="${alt}"
            className="rounded-lg"
            width={1600}
            height={800}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>`
      });
    });
  };
};

export default remarkNextImage;
