export function UpperCase(text: string) {
  return text.replace(/\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toUpperCase();
    });
}
