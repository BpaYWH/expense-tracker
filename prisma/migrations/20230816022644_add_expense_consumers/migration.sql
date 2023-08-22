-- CreateTable
CREATE TABLE "_consumedExpenses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_consumedExpenses_AB_unique" ON "_consumedExpenses"("A", "B");

-- CreateIndex
CREATE INDEX "_consumedExpenses_B_index" ON "_consumedExpenses"("B");

-- AddForeignKey
ALTER TABLE "_consumedExpenses" ADD CONSTRAINT "_consumedExpenses_A_fkey" FOREIGN KEY ("A") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_consumedExpenses" ADD CONSTRAINT "_consumedExpenses_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
