export function getBase64(file, func) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    func(reader.result);
  };
}
