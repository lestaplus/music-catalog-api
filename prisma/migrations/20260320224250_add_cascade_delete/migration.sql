-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_artist_id_fkey";

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("artist_id") ON DELETE CASCADE ON UPDATE CASCADE;
