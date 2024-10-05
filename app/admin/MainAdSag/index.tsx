"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";

interface MainAdvertisement {
  id: string;
  title: string;
  date: string;
  description: string;
}

type FormValues = {
  title: string;
  date: string;
  description: string;
};

export default function MainAdSag({
  mainAdvertisementsSag,
}: {
  mainAdvertisementsSag: MainAdvertisement;
}) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      title: mainAdvertisementsSag?.title ?? "",
      date: mainAdvertisementsSag?.date ?? "",
      description: mainAdvertisementsSag?.description ?? "",
    },
  });

  const handleFormSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/mainAdSag`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Advertisement update failed");
      }

      const result = await response.json();
      console.log(result);
      alert("Reklam başarıyla güncellendi!");
      reset(data);
    } catch (error) {
      console.error("Advertisement update failed", error);
      alert("Reklam güncellenirken bir hata oluştu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Giris Sayfasi Reklam Yönetimi Sol Reklam Yazilari
      </h1>
      <div className="grid gap-6">
        <Card className="p-6">
          <CardContent>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="grid gap-4">
                <div>
                  <label className="block mb-2">Başlık</label>
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2">Tarih</label>
                  <input
                    type="text"
                    {...register("date", { required: true })}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2">Açıklama</label>
                  <textarea
                    {...register("description", { required: true })}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {loading ? "Güncelleniyor..." : "Güncelle"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
