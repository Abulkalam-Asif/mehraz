export default function fileToFormData(name, file) {
  const formData = new FormData();
  formData.append(name, file);
  return formData;
}
