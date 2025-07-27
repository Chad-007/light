-- CreateTable
CREATE TABLE "OutBox" (
    "id" TEXT NOT NULL,
    "zaprunid" TEXT NOT NULL,

    CONSTRAINT "OutBox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OutBox_zaprunid_key" ON "OutBox"("zaprunid");

-- AddForeignKey
ALTER TABLE "OutBox" ADD CONSTRAINT "OutBox_zaprunid_fkey" FOREIGN KEY ("zaprunid") REFERENCES "ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
