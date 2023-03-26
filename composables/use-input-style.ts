export const useInputStyle = (opts = {}) => {
  const defaultStyle = {
    density: "compact",
  }

  return {
    ...defaultStyle,
    ...opts,
  } as any
}
