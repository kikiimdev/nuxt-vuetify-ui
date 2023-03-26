export function useUniqueId() {
  return Math.floor(Math.random() * Date.now())
}
