"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { type Database } from "@/lib/schema";
import { Citrus } from "lucide-react";
import type { ProfileData } from "./page"

type Species = Database["public"]["Tables"]["species"]["Row"];

interface props{
  species: Species;
  profileData: ProfileData;
}

export default function LearnMoreDialog({species, profileData}: props){

  const [open, setOpen] = useState<boolean>(false);
  const [openAuthorDialog, setOpenAuthorDialog] = useState<boolean>(false);

  function Population(){return <>{(species.total_population != null)? <>{species.total_population} {species.common_name}</>: <>Unknown</>}</>}
  function Biography(){return <>{(profileData.biography != null) ? <>{profileData.biography}</>: <></>}</>}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full" onClick={() => setOpen(true)}>
          Learn More
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle style={{ fontSize: '28px', margin: '0', padding: '0', display: 'flex', justifyContent: 'space-between' }}>
            {species.common_name}
            <Button style={{ alignSelf: 'flex-end' }} aria-label="Close alert" variant="outline" size="sm" onClick={() => setOpen(false)}>
                <Citrus color="#ff0000" className="h-4 w-4"/>
            </Button>
          </DialogTitle>
          <DialogDescription style={{ margin: '0', padding: '0' }}>
            {species.scientific_name}
          </DialogDescription>
        </DialogHeader>
        <div>
        <p>Population: <Population/></p>
        <p>Kingdom: {species.kingdom}</p>
        <p>Description: {species.description}</p>
        </div>
        <DialogFooter>
          <Dialog open={openAuthorDialog} onOpenChange={setOpenAuthorDialog}>
            <DialogTrigger asChild>
              <Button className="mt-3 w-full" variant="secondary" onClick={() => setOpenAuthorDialog(true)}>
                About the Author
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle style={{ margin: '0', padding: '0', display: 'flex', justifyContent: 'space-between' }}>
                  {profileData.display_name}
                  <Button style={{ alignSelf: 'flex-end' }} aria-label="Close alert" variant="outline" size="sm" onClick={() => setOpenAuthorDialog(false)}>
                    <Citrus color="#ff0000" className="h-4 w-4"/>
                  </Button>
                </DialogTitle>
                <DialogDescription style={{ margin: '0', padding: '0' }}>
                  {profileData.email}
                </DialogDescription>
              </DialogHeader>
              <Biography/>
            </DialogContent>
          </Dialog>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
