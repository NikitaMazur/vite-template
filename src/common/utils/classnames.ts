export default function cx(...classNames: unknown[]) {
  return classNames.filter(Boolean).join(' ')
}
