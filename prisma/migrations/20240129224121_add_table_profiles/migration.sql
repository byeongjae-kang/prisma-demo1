-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "about" VARCHAR(500),

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "profiles_first_name_last_name_idx" ON "profiles"("first_name", "last_name");
