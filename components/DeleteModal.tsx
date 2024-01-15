"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db, storage } from "@/firbase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";
//import { Input } from "@/components/ui/input"
//import { Label } from "@/components/ui/label"

export function DeleteModal() {
  const { user } = useUser();
  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] =
    useAppStore((state) => [
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
      state.fileId,
      state.setFileId,
    ]);
  async function deleteFile() {
    if (!user || !fileId) return;

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
    const toastId = toast.loading("Deleting...");
    try {
      deleteObject(fileRef)
        .then(async () => {
          console.log("Deleted File");
          deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
            console.log("Delected Success");
            toast.success("Deleted Successfully", {
              id: toastId,
            });
          });
        })
        .finally(() => {
          setIsDeleteModalOpen(false);
        });
    } catch (error) {
      console.error(error);
      setIsDeleteModalOpen(false);
      toast.error("Error deleting document", {
        id: toastId,
      });
    }
  }
  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            file!
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"destructive"}
            type="submit"
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
