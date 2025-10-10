import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ------------------ create a book
export const createBook = async (req, res) => {
  try {
    const {
      title,
      rating,
      description,
      image,
      isPublic,
      readingStatusId,
      subCategoryId,
    } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        rating,
        description,
        image,
        isPublic: isPublic || false,
        userId: req.user.id, // user connected
        subCategoryId,
        readingStatusId,
      },
      include: { subCategory: true, user: true, readingStatus: true },
    });

    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ Tous les livres publics + filtrage par catégorie
export const getBooks = async (req, res) => {
  try {
    const { subCategory } = req.query;
    const filter = {};

    if (subCategory) {
      const cat = await prisma.subCategory.findUnique({
        where: { name: subCategory },
      });
      if (cat) filter.subCategoryId = cat.id;
      else return res.json([]);
    }

    const books = await prisma.book.findMany({
      where: { ...filter, isPublic: true },
      include: {
        subCategory: true,
        user: true,
        readingStatus: true,
        _count: { select: { likes: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ Les livres de l'utilisateur connecté (privés + publics)
export const getMyBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: { userId: req.user.id },
      include: { subCategory: true, readingStatus: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ Modifier un livre (seulement propriétaire)
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      rating,
      description,
      image,
      isPublic,
      readingStatusId,
      subCategoryId,
    } = req.body;

    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.userId !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });

    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title,
        rating,
        description,
        image,
        isPublic,
        readingStatusId,
        subCategoryId,
      },
      include: { subCategory: true, readingStatus: true },
    });

    res.json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ delete a book (seulement propriétaire)
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.userId !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });

    await prisma.book.delete({ where: { id } });
    res.json({ message: "Book deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
