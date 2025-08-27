import { Link } from "react-router-dom";
import type { Brand } from "../types";

const FALLBACK_LOGO = "https://placehold.co/200x80?text=Brand";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link to={`/brand/${brand.id}`} className="brandCard">
      <div className="brandCard__logo">
        <img
          src={brand.image ?? FALLBACK_LOGO}
          alt={brand.name || "Brand"}
          loading="lazy"
          onError={(e) => (e.currentTarget.src = FALLBACK_LOGO)}
        />
      </div>
      <div className="brandCard__meta">
        <span className="brandCard__name">{brand.name}</span>
        {brand.origin && <span className="brandCard__origin">{brand.origin}</span>}
      </div>
    </Link>
  );
}
