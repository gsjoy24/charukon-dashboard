import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress, IconButton, Switch } from "@mui/material";
import { toast } from "sonner";
import {
  useDeleteBannerMutation,
  useToggleBannerPauseMutation,
} from "../../redux/features/bannerApi,";

const BannerActionButtons = ({ banner }) => {
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();
  const [toggleBannerPause, { isLoading: isToggling }] =
    useToggleBannerPauseMutation();

  const handleDeleteBanner = async (id) => {
    try {
      const response = await deleteBanner(id).unwrap();
      if (response?.success) {
        toast.success("Banner deleted successfully.");
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      const message = error?.data?.errorSources
        ?.map((source) => source.message)
        .join(", ");
      toast.error(message || "Something went wrong");
    }
  };

  const handleTogglePause = async (id) => {
    try {
      const response = await toggleBannerPause(id).unwrap();

      if (response?.success) {
        toast.success(
          response?.message || "Banner status updated successfully.",
        );
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      const message = error?.data?.errorSources
        ?.map((source) => source.message)
        .join(", ");
      toast.error(message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-between items-center absolute top-0 right-2 bg-white bg-opacity-75 px-2 py-1 rounded-lg shadow-md">
      {/* Switch for pausing/unpausing */}
      <Switch
        checked={!banner.isPaused}
        onChange={() => handleTogglePause(banner?._id)}
        color="primary"
        inputProps={{ "aria-label": "Pause/Play banner" }}
        disabled={isToggling}
      />

      {/* Delete icon */}
      <IconButton
        color="error"
        aria-label="delete"
        onClick={() => handleDeleteBanner(banner._id)}
      >
        {isDeleting ? (
          <CircularProgress size={16} color="inherit" />
        ) : (
          <DeleteIcon />
        )}
      </IconButton>
    </div>
  );
};

export default BannerActionButtons;
