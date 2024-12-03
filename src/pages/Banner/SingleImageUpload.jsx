// src/components/SingleImageUpload.jsx
import { CloudUpload } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useAddBannerMutation } from "../../redux/features/bannerApi,";

const SingleImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false); // Track the uploading state
  const [error, setError] = useState(null); // Track upload errors
  const [addBanner] = useAddBannerMutation();

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET_NAME;

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return setError("Please select an image to upload.");

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
      );

      const { public_id, secure_url } = response.data;

      const newBanner = {
        url: secure_url,
        public_id,
      };

      const bannerRes = await addBanner(newBanner).unwrap();
      if (bannerRes?.success) {
        toast.success("Banner uploaded successfully.");
      } else {
        toast.error(bannerRes?.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to upload the image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ textAlign: "center", py: 3 }}>
        <Button
          variant="contained"
          component="label"
          startIcon={
            isUploading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <CloudUpload />
            )
          }
          disabled={isUploading}
          sx={{ mt: 2 }}
        >
          {isUploading ? "Uploading..." : "Upload Banner"}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SingleImageUpload;
