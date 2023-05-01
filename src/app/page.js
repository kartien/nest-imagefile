"use client";
import { useState } from "react";
import Image from "next/image";

function HomePage() {
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    try {
      const form = new FormData();
      form.set("file", file);
      // sending file
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });
      if (res.ok) {
        console.log("fle uploaded");
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-zinc-950 p-5">
        <h1 className="text-4xl text-center my-4">Upload File</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            className="bg-zinc-900 text-zinc-100 p-2 rounded block mb-2"
            onChange={handleFileChange}
          />
          <button
            className="bg-green-500 text-zinc-100 p-2 rounded block w-full disabled:opacity-50"
            disabled={!file}
          >
            Upload
          </button>
        </form>
        {
          file && (
            <Image src={URL.createObjectURL(file)} alt="upload file"
              className="w-64 h-65 object-cover mx-auto"
              width={256}
              height={256}
            />
          )
        }
      </div>
    </div>
  );
}

export default HomePage;
