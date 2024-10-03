export const dynamic = "force-dynamic";

import { AdminServerForm } from "./adminServer";
import { StreamerForm } from "./adminStreamer";
import AdminAdvertisement from "./advertisement";
import MainAdSag from "./MainAdSag";
import MainAdSol from "./MainAdSol";
import AdminServerSilme from "./serverSilme";
import StreamerDelete from "./streamerSil";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const mainAdvertisementSol = await prisma.mainAdvertisementTextSol.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  const mainAdvertisementSag = await prisma.mainAdvertisementTextSag.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <div className="space-y-16">
        <section>
          <h1 className="text-3xl font-bold text-center mb-8">
            Admin Server Ekleme
          </h1>
          <AdminServerForm />
        </section>

        <section>
          <h1 className="text-3xl font-bold text-center mb-8">Server Silme</h1>
          <AdminServerSilme />
        </section>

        <section>
          <h1 className="text-3xl font-bold text-center mb-8">
            Yayinci Ekleme
          </h1>
          <StreamerForm />
        </section>

        <section>
          <h1 className="text-3xl font-bold text-center mb-8">Yayinci Silme</h1>
          <StreamerDelete />
        </section>

        <section>
          <h1 className="text-3xl font-bold text-center mb-8">
            Reklam Alanlari
          </h1>
          <AdminAdvertisement />
        </section>

        <section>
          <h1 className="text-3xl font-bold text-center mb-8">
            Ana Sayfa Sol Reklam Yazisi Düzenleme
          </h1>
          <MainAdSol
            mainAdvertisementsSol={
              mainAdvertisementSol || {
                id: "",
                title: "",
                date: "",
                description: "",
                ctaText: "",
              }
            }
          />
        </section>

        <section>
          <h1 className="text-3xl font-bold text-center mb-8">
            Ana Sayfa Sag Reklam Yazisi Düzenleme
          </h1>
          <MainAdSag
            mainAdvertisementsSag={
              mainAdvertisementSag || {
                id: "",
                title: "",
                date: "",
                description: "",
                ctaText: "",
              }
            }
          />
        </section>
      </div>
    </div>
  );
}
