import "./Explore.css";
import tejas2 from '../assets/tejas1.png'
import tejas3 from '../assets/tejas2.png'

export default function Hover3DCard({
  mainImage,
  extraImages = [tejas2, tejas3],
}) {
  if (!mainImage) return null;

  return (
    <div className="h3d-container">

      <div className="h3d-image-wrapper">
        <img src={mainImage} className="h3d-image main" alt="Main" />

        {extraImages[0] && (
          <img src={extraImages[0]} className="h3d-image img1" alt="Extra 1" />
        )}

        {extraImages[1] && (
          <img src={extraImages[1]} className="h3d-image img2" alt="Extra 2" />
        )}
      </div>
    </div>
  );
}
