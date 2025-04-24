import { useState } from "react";
import { FormModal } from "./FormModal";
import { changePassword } from "@/lib/services/userService";
import { toast } from "react-toastify";
import { Input } from "./Input";
import { Button } from "./Button";

interface ChangePasswordModalProps {
  username: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const ChangePasswordModal = ({
  username,
  onClose,
  onSuccess,
}: ChangePasswordModalProps) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await changePassword(
        oldPassword,
        newPassword,
        localStorage.getItem("authToken"),
        username
      );
      toast.success("Password changed successfully");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      title="Change Password"
      setOpen={onClose}
      modalClassName="max-w-md"
    >
      <div className="space-y-4">
        <Input
          label="Old Password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          variant="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Change Password"}
        </Button>
      </div>
    </FormModal>
  );
};