import axios from "axios";


// con esta lo convierto a base64
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}


// esta funcion es para madnar el archivo y que me devuelva la url de descarga
async function uploadFileToExternalSystem(file: File, userId: string, token: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const base64Content = await fileToBase64(file);

    const body = {
      token: token,
      userId: userId,
      systemId: 4,
      isFolder: false,
      filePath: "/documents/",
      fileExt: file.name.split('.').pop(),
      fileName: file.name,
      mimeType: file.type,
      content: base64Content,
      isPublic: true,
      folderId: "",
    };

    const response = await axios.post(
      "https://poo-dev.unsada.edu.ar:8082/draiv/files",
      body,
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("File uploaded to external system:", response.data);
    return response.data.fileURL;
  } catch (error) {
    console.error("Error uploading file to external system:", error);
    throw error;
  }
}

export default { fileToBase64, uploadFileToExternalSystem };
