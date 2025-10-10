import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createReadingStatus = async (req, res) => {
  try {
    const { name } = req.body;
    const readingStatus = await prisma.readingStatus.create({
      data: { name },
    });
    res.status(201).json(readingStatus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getReadingStatuses = async (req, res) => {
  try {
    const readingStatuses = await prisma.readingStatus.findMany({
      orderBy: { name: "asc" },
    });
    res.json(readingStatuses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateReadingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const readingStatus = await prisma.readingStatus.findUnique({ where: { id } });
    if (!readingStatus)
      return res.status(404).json({ message: "Reading status not found" }); 
    const updatedStatus = await prisma.readingStatus.update({
      where: { id },
      data: { name },
    });
    res.json(updatedStatus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteReadingStatus = async (req, res) => {    
    const { id } = req.params;
    try {
        const readingStatus = await prisma.readingStatus.findUnique({ where: { id } });
        if (!readingStatus) return res.status(404).json({ message: "Reading status not found" });   
        await prisma.readingStatus.delete({ where: { id } });
        res.json({ message: "Reading status deleted" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
