import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ------------------ create sub category
export const createSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    // Vérifie que la catégorie principale existe
    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) return res.status(404).json({ message: "Category not found" });

    // Vérifie que la sous-catégorie n'existe pas déjà dans cette catégorie
    const existing = await prisma.subCategory.findFirst({ where: { name, categoryId } });
    if (existing) return res.status(400).json({ message: "SubCategory already exists in this category" });

    const subCategory = await prisma.subCategory.create({ data: { name, categoryId } });
    res.status(201).json(subCategory);
  } catch (err) {
    console.error("Create subcategory error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ get all sub 
export const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await prisma.subCategory.findMany({
      include: { category: true } // include
    });
    res.json(subCategories);
  } catch (err) {
    console.error("Get all subcategories error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ get sub category by id
export const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await prisma.subCategory.findUnique({
      where: { id },
      include: { category: true } 
    });

    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    res.json(subCategory);
  } catch (err) {
    console.error("Get subcategory by id error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ------------------ modify 
export const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId } = req.body;

    // Vérifie que la sous-catégorie existe
    const subCategory = await prisma.subCategory.findUnique({ where: { id } });
    if (!subCategory) return res.status(404).json({ message: "SubCategory not found" });

    // Vérifie que la catégorie principale existe si on veut la changer
    if (categoryId) {
      const category = await prisma.category.findUnique({ where: { id: categoryId } });
      if (!category) return res.status(404).json({ message: "Category not found" });
    }

    const updated = await prisma.subCategory.update({
      where: { id },
      data: { name, categoryId }
    });

    res.json(updated);
  } catch (err) {
    console.error("Update subcategory error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ Supprimer une sous-catégorie
export const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await prisma.subCategory.findUnique({
      where: { id },
      include: { books: true } // vérifie s'il y a des livres liés
    });
    if (!subCategory) return res.status(404).json({ message: "SubCategory not found" });

    if (subCategory.books.length > 0)
      return res.status(400).json({ message: "Cannot delete subcategory with books" });

    await prisma.subCategory.delete({ where: { id } });
    res.json({ message: "SubCategory deleted" });
  } catch (err) {
    console.error("Delete subcategory error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
