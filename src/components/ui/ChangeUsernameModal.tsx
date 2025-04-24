import { useState } from "react";
import { FormModal } from "./FormModal";
import { changeUsername } from "@/lib/services/userService";
import { toast } from "react-toastify";
import { Input } from "./Input";
import { Button } from "./Button";

interface ChangeUsernameModalProps {
  username: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const ChangeUsernameModal = ({
  username,
  onClose,
  onSuccess,
}: ChangeUsernameModalProps) => {
  const [newUsername, setNewUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");

    // Check if the token is missing or invalid
    if (!token) {
      toast.error("You must be logged in to change your username");
      return;
    }

    try {
      setLoading(true);
      // Log to debug values
      console.log({ newUsername, username, token });

      // Call changeUsername service
      await changeUsername(newUsername, token, username);

      toast.success("Username changed successfully");
      onSuccess(); // Notify parent that the change was successful
      onClose();   // Close the modal
    } catch (error) {
      toast.error("Failed to change username");
      console.error(error); // Log any error for debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      title="Change Username"
      setOpen={onClose}
      modalClassName="max-w-md"
    >
      <div className="space-y-4">
        <Input
          label="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          variant="primary"
          className="w-full"
          disabled={loading || !newUsername} // Disable if loading or no username
        >
          {loading ? "Updating..." : "Change Username"}
        </Button>
      </div>
    </FormModal>
  );
};
