import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import AddSpeciesDialog from "./add-species-dialog";
import SpeciesCard from "./species-card";
import { type Database } from "@/lib/schema";
type Species = Database["public"]["Tables"]["species"]["Row"];

export interface ProfileData {
  id : string;
  email: string;
  display_name: string;
  biography: string | null;
};

export default async function SpeciesList() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  const { data: species } = await supabase.from("species").select("*");

  const { data: profileData} = await supabase
  .from("profiles")
  .select("*");

  function CheckProfile(species: Species){
    if(!profileData)
      return null;
    const match = profileData.find((profile) => profile.id === species.author);
    if(match)
      return match;

    return {
      id: "",
      email: "",
      display_name: "",
      biography: "",
    };
  }


  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Species List</TypographyH2>
        <AddSpeciesDialog key={new Date().getTime()} userId={session.user.id} />
      </div>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center">
        {species?.sort((a, b) => {
          const nameA = a.common_name ?? '';
          const nameB = b.common_name ?? '';
          return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
        }).map((species) => <SpeciesCard
        key={`${species.id}-${session.user.id}`}
        species={species}
        userId={session.user.id}
        profileData={CheckProfile(species)}/>)}
      </div>
    </>
  );
}
