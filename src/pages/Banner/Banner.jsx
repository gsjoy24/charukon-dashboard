import { CircularProgress } from "@mui/material";
import PageTitle from "../../components/Shared/PageTitle";
import { useGetBannersQuery } from "../../redux/features/bannerApi,";
import BannerActionButtons from "./BannerActionButtons";
import SingleImageUpload from "./SingleImageUpload";

const BannerManagement = () => {
  const { data: banners, isLoading, error } = useGetBannersQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center">Error loading banners!</div>
    );

  return (
    <div className="mx-auto p-6 space-y-8 mt-12">
      <div className="flex justify-between items-center">
        <PageTitle title="Banner Management" />
        <SingleImageUpload />
      </div>

      {/* Display existing banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners &&
          banners?.data?.map((banner) => (
            <div
              key={banner._id}
              className="border rounded-lg shadow-lg p-4 text-center space-y-2 relative"
            >
              <img
                src={banner.url}
                alt="Banner"
                className="rounded-lg object-cover w-full h-full"
              />

              {/* Controls for pause/play and delete */}
              <BannerActionButtons banner={banner} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BannerManagement;
