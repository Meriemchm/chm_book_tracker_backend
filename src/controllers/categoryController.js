import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ------------------ Créer une catégorie
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await prisma.category.findUnique({ where: { name } });
    if (existing)
      return res.status(400).json({ message: "Category already exists" });

    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (err) {
    console.error("Create category error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ------------------ Lister toutes les catégories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { subCategories: true } 
    });
    res.json(categories);
  } catch (err) {
    console.error("Get all categories error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ------------------ modify category

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: "Category not found" });

    const category = await prisma.category.update({
      where: { id },
      data: { name },
    });

    res.json(category);
  } catch (err) {
    console.error("Update category error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ------------------ Supprimer une catégorie
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: { subCategories: true }
    });

    if (!category) return res.status(404).json({ message: "Category not found" });

    if (category.subCategories.length > 0)
      return res.status(400).json({ message: "Cannot delete category with subcategories" });

    await prisma.category.delete({ where: { id } });
    res.json({ message: "Category deleted" });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
