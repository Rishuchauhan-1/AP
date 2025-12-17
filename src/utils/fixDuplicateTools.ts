/**
 * Utility to remove duplicate tool entries from the tools data
 * This filters out tools with duplicate IDs, keeping only the first occurrence
 */

import { AITool } from '../types';

/**
 * Removes duplicate tools based on their ID (silently)
 * @param tools - Array of AI tools
 * @returns Deduplicated array of tools
 */
export function removeDuplicateTools(tools: AITool[]): AITool[] {
  const seenIds = new Set<string>();
  const uniqueTools: AITool[] = [];
  
  for (const tool of tools) {
    if (!seenIds.has(tool.id)) {
      seenIds.add(tool.id);
      uniqueTools.push(tool);
    }
  }
  
  return uniqueTools;
}

/**
 * Get unique tool count
 * @param tools - Array of AI tools
 * @returns Number of unique tools
 */
export function getUniqueToolCount(tools: AITool[]): number {
  const uniqueIds = new Set(tools.map(t => t.id));
  return uniqueIds.size;
}