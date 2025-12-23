export function stripAccents(input) {
  if (typeof input !== "string") return input
  return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
