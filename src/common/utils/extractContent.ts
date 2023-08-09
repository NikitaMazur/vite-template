export default function extractContent(s: string) {
  const span = document.createElement('span')
  span.innerHTML = s
  return span.textContent || span.innerText
}
