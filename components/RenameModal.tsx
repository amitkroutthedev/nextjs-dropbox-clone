"use client";

import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firbase";
import toast from "react-hot-toast";

function RenameModal() {
  const { user } = useUser();
  const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] =
    useAppStore((state) => [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.fileId,
      state.filename,
    ]);
  console.log(isRenameModalOpen);
  const [input, setInput] = useState("");
  async function renameFile() {
    if (!user || !fileId) return;
    const toastId = toast.loading("Renaming.....");
    await updateDoc(doc(db, "users", user.id, "files", fileId), {
      filename: input,
    });
    toast.success("Renamed Successfully", {
      id: toastId,
    });
    setInput("");
    setIsRenameModalOpen(false);
  }
  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(false);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the file</DialogTitle>
        </DialogHeader>
        <Input
          id="Link"
          defaultValue={filename}
          onChange={(e) => setInput(e.target.value)}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter") renameFile();
          }}
        />
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsRenameModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            size="sm"
            className="px-3 flex-1"
            type="submit"
            onClick={() => renameFile()}
          >
            <span className="sr-only">Rename</span>
            <span>Rename</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RenameModal;
