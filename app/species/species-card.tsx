import type { Database } from "@/lib/schema";
import Image from "next/image";
import LearnMoreDialog from "./learn-more-dialog";
import EditSpecies from "./edit-species";
import type { ProfileData } from "./page"
type Species = Database["public"]["Tables"]["species"]["Row"];

interface SpeciesCardProps {
  species: Species;
  userId: string;
  profileData: ProfileData;
}

export default function SpeciesCard({species, userId, profileData}: SpeciesCardProps) {

  function CheckUser(){return <>{(species.author == userId) ? <EditSpecies key={`${species.id}-${userId}`} species={species} userId={userId}/>:<></>}</>}

  return (
    <div className="min-w-72 m-4 w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <h3 className="mt-3 text-2xl font-semibold">{species.common_name}</h3>
      <h4 className="text-lg font-light italic">{species.scientific_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
      {/* Replace with detailed view */}
      <CheckUser/>
      <LearnMoreDialog key={`${species.id}`} species={species} profileData={profileData} />
    </div>
  );
}
