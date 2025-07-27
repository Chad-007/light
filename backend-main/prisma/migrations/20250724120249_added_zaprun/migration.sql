-- CreateTable
CREATE TABLE "ZapRun" (
    "id" TEXT NOT NULL,
    "zapid" TEXT NOT NULL,

    CONSTRAINT "ZapRun_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ZapRun" ADD CONSTRAINT "ZapRun_zapid_fkey" FOREIGN KEY ("zapid") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
