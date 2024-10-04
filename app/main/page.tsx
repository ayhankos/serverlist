import { PrismaClient } from "@prisma/client";
import HomePage from "./components";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function Page() {
  const adLeft = await prisma.advertisement.findUnique({
    where: { location: "Giris sayfasi sol" },
  });

  const adRight = await prisma.advertisement.findUnique({
    where: { location: "Giris sayfasi sag" },
  });

  const mainAdLeft = await prisma.mainAdvertisementTextSol.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  const mainAdRight = await prisma.mainAdvertisementTextSag.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <HomePage
      adLeft={adLeft}
      adRight={adRight}
      mainAdLeft={mainAdLeft}
      mainAdRight={mainAdRight}
    />
  );
}
