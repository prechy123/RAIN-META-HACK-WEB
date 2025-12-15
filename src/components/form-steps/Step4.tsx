import { memo} from "react";
import { InputBlock, Input } from "@/components/shared/TextInput";
// import { Upload, X, Edit2 } from "lucide-react";

interface Step4Props {
  businessOpenHours: string;
  businessOpenDays: string;
  businessPicture: string;
  extra_information: string;
  onBusinessOpenHoursChange: (value: string) => void;
  onBusinessOpenDaysChange: (value: string) => void;
  onBusinessPictureChange: (value: string) => void;
  onExtraInformationChange: (value: string) => void;
}

const Step4 = memo(
  ({
    businessOpenHours,
    businessOpenDays,
    // businessPicture,
    extra_information,
    onBusinessOpenHoursChange,
    onBusinessOpenDaysChange,
    // onBusinessPictureChange,
    onExtraInformationChange,
  }: Step4Props) => {
    // const fileInputRef = useRef<HTMLInputElement>(null);

    // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //   const file = e.target.files?.[0];
    //   if (file) {
    //     // Validate file type
    //     if (!file.type.startsWith("image/")) {
    //       alert("Please select a valid image file");
    //       return;
    //     }

    //     // Validate file size (max 5MB)
    //     if (file.size > 5 * 1024 * 1024) {
    //       alert("Image size should be less than 5MB");
    //       return;
    //     }

    //     // Convert to base64
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       const base64String = reader.result as string;
    //       onBusinessPictureChange(base64String);
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // };

    // const handleUploadClick = () => {
    //   fileInputRef.current?.click();
    // };

    // const handleRemoveImage = () => {
    //   onBusinessPictureChange("");
    //   if (fileInputRef.current) {
    //     fileInputRef.current.value = "";
    //   }
    // };

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Business Hours & Details</h3>
        <div>
          <p className="mb-2">Open Hours</p>
          <InputBlock variant="neubrutalism" size="lg">
            <Input
              placeholder="8:00 AM - 10:00 PM"
              value={businessOpenHours}
              onChange={(e) => onBusinessOpenHoursChange(e.target.value)}
              className="outline-none border-none focus:outline-none focus:ring-0"
            />
          </InputBlock>
        </div>
        <div>
          <p className="mb-2">Open Days</p>
          <InputBlock variant="neubrutalism" size="lg">
            <Input
              placeholder="Monday - Sunday"
              value={businessOpenDays}
              onChange={(e) => onBusinessOpenDaysChange(e.target.value)}
              className="outline-none border-none focus:outline-none focus:ring-0"
            />
          </InputBlock>
        </div>
        {/* <div>
          <p className="mb-2">Business Picture</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {businessPicture ? (
            <div className="space-y-3">
              <div className="relative w-full max-w-md mx-auto">
          <img
            src={businessPicture}
            alt="Business preview"
            className="w-full h-64 object-cover rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={handleUploadClick}
              className="bg-white p-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              title="Change image"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="bg-red-500 text-white p-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
              </div>
            </div>
          ) : (
            <div onClick={handleUploadClick} className="w-full cursor-pointer">
              <div className="border-4 border-dashed border-black rounded-lg p-8 text-center transition-colors">
          <Upload className="w-12 h-12 mx-auto mb-4" />
          <p className="text-lg font-semibold mb-2">
            Upload Business Picture
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          )}
        </div> */}
        <div>
          <p className="mb-2">Extra Information</p>
          <InputBlock variant="neubrutalism" size="lg">
            <Input
              placeholder="We use locally sourced ingredients and offer traditional Nigerian hospitality..."
              value={extra_information}
              onChange={(e) => onExtraInformationChange(e.target.value)}
              className="w-full p-2 outline-none border-none focus:outline-none focus:ring-0 bg-transparent"
            />
          </InputBlock>
        </div>
      </div>
    );
  }
);

Step4.displayName = "Step4";

export default Step4;
