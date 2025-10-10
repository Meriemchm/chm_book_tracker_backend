import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const statuses = [
    { name: "Not Started" },
    { name: "In Progress" },
    { name: "Completed" },
    { name: "To Re-read" },
    { name: "Abandoned" },
  ];

  for (const status of statuses) {
    await prisma.readingStatus.upsert({
      where: { name: status.name },
      update: {},
      create: { name: status.name },
    });
  }

  console.log("✅ ReadingStatus table seeded successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error("❌ Seeding error:", err);
    prisma.$disconnect();
  });
