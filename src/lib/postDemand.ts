export const POST_DEMAND_EVENT = 'paikari:post-demand';

/** Opens the global "post your demand" modal from anywhere in the app. */
export function openPostDemand(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(POST_DEMAND_EVENT));
  }
}
