import { NodeType } from "../../types";

export const deleteEmptyChildren = (
  nodes: NodeType[],
  nodeKey: string
): NodeType[] => {
  return nodes
    .map((node) => {
      if (node.key === nodeKey && node.children && node.children.length > 0) {
        const updatedChildren = deleteEmptyChildren(node.children, nodeKey);
        return { ...node, children: updatedChildren };
      } else if (node.children && node.children.length > 0) {
        const updatedChildren = deleteEmptyChildren(node.children, nodeKey);
        return { ...node, children: updatedChildren };
      } else {
        return node;
      }
    })
    .filter(
      (node) =>
        !(
          node.key === nodeKey &&
          (!node.children || node.children.length === 0)
        )
    );
};