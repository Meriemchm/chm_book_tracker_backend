import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const toggleLike = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_bookId: { userId, bookId },
      },
    });

    if (existingLike) {
      // Toggle the "liked" state
      const updated = await prisma.like.update({
        where: { id: existingLike.id },
        data: { liked: !existingLike.liked },
      });
      return res.json({
        message: updated.liked ? "Book liked again." : "Book unliked.",
      });
    } else {
      // Create a new like
      await prisma.like.create({
        data: { userId, bookId, liked: true },
      });
      return res.json({ message: "Book liked." });
    }
  } catch (error) {
    console.error("Toggle like error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
