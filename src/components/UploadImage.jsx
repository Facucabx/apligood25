import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function UploadImage({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Seleccioná una imagen primero.");
    setUploading(true);

    const storage = getStorage();
    const storageRef = ref(storage, `profesionales/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      onUploadComplete(downloadURL); // esto lo envías al padre
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Error al subir imagen.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded-md" />}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {uploading ? "Subiendo..." : "Subir Imagen"}
      </button>
    </div>
  );
}
