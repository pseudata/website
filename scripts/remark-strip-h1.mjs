import { visit } from "unist-util-visit";

export function remarkStripH1() {
  return (tree) => {
    let titleFound = false;

    visit(tree, (node, index, parent) => {
      // Find the first H1 (# Title) and remove it
      if (!titleFound && node.type === "heading" && node.depth === 1) {
        parent.children.splice(index, 1);
        titleFound = true;
        return index; // Re-index to ensure we don't skip nodes
      }
    });
  };
}
