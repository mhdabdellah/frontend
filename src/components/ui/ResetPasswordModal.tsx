import { useState } from "react";
import { FormModal } from "./FormModal";
import { changePassword } from "@/lib/services/userService";
import { toast } from "react-toastify";
import { Input } from "./Input";
import { Button } from "./Button";

interface ResetPasswordModalProps {
  username: string;
  onClose: () => void;
  onSuccess: () => void;
}


export const ResetPasswordModal = ({
  username,
  onClose,
  onSuccess,
}: ResetPasswordModalProps) => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await changePassword({
        newPassword: newPassword,
        token: localStorage.getItem("authToken"),
        username: username,
      });
      toast.success("Password changed successfully");
      onSuccess();
      onClose();
    } catch (error) {
      console.log(error)
      toast.error("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      title="Reset Password"
      setOpen={onClose}
      modalClassName="max-w-md"
    >
      <div className="space-y-4">
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
          {loading ? "Updating..." : "Reset Password"}
        </Button>
      </div>
    </FormModal>
  );
};