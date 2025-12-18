import "./Hover3DCard.css";

export default function Hover3DCard({
  title = "3D Hover Effect",
  description = "Hover over the image to trigger a 3D transformation.",
  mainImage,
  extraImages = [],
}) {
  if (!mainImage) {
    throw new Error("Hover3DCard: mainImage is required");
  }

  if (extraImages.length !== 3) {
    throw new Error("Hover3DCard: extraImages must contain exactly 3 images");
  }

  return (
    <div className="h3d-container">
      {/* Left text */}
      <div className="h3d-text">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      {/* Right images */}
      <div className="h3d-image-wrapper">
        <img src={mainImage} className="h3d-image main" alt="Main" />

        <img src={extraImages[0]} className="h3d-image secondary img1" alt="Extra 1" />
        <img src={extraImages[1]} className="h3d-image secondary img2" alt="Extra 2" />
        {/* <img src={extraImages[2]} className="h3d-image secondary img3" alt="Extra 3" /> */}
      </div>
    </div>
  );
}
