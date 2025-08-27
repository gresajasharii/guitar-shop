import { useQuery } from "@apollo/client/react";
import { GET_BRANDS } from "../graphql/brand";
import type { Brand } from "../types";
import { Link } from "react-router-dom";
import Footer from "../components/Footer"; 

interface GetBrandsResponse {
  findAllBrands: Brand[];
}

const HERO_IMG =
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop";
const FALLBACK_LOGO = "https://placehold.co/200x80?text=Brand";

export default function Brands() {
  const { loading, error, data } = useQuery<GetBrandsResponse>(GET_BRANDS);
  const brands = data?.findAllBrands ?? [];
  const firstBrandId = brands[0]?.id;

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <span className="hero__eyebrow">VibeStrings</span>
            <h1 className="hero__title">
              Browse top quality <span className="accent">Guitars</span> online
            </h1>
            <p className="hero__sub">
              Explore 50+ latest collections of branded guitars online with
              VibeStrings.
            </p>
          </div>
          <div style={{ justifySelf: "center" }}>
            <div className="hero__imageWrap">
              <img src={HERO_IMG} alt="Guitar" loading="lazy" />
            </div>
          </div>
        </div>

        {/* Section heading */}
        <div className="container sectionHead">
          <p className="sectionHead__title">
            Featuring the <span className="accent">Best Brands</span>
          </p>
          <p className="sectionHead__sub">
            Select your preferred brand and explore our exquisite collection.
          </p>
        </div>
      </section>

      {/* BRANDS GRID */}
      <section id="brands" className="container">
        {error && (
          <p style={{ color: "#ef4444", textAlign: "center" }}>
            Error: {error.message}
          </p>
        )}

        {loading ? (
          <div className="brandsGrid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skel" />
            ))}
          </div>
        ) : (
          <div className="brandsGrid">
            {brands.map((b) => (
              <Link key={b.id} to={`/brand/${b.id}`} className="brandCard">
                <div className="brandCard__logo">
                  <img
                    src={b.image ?? FALLBACK_LOGO}
                    alt={b.name || "Brand"}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = FALLBACK_LOGO)}
                  />
                </div>
                <div className="brandCard__meta">
                  <span className="brandCard__name">{b.name}</span>
                  {b.origin && (
                    <span className="brandCard__origin">{b.origin}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* DARK FEATURES BAND */}
      <section className="band">
        <div className="container">
          <h2 className="band__title">
            Why try <span className="accent">VibeStrings?</span>
          </h2>
          <div className="featuresGrid">
            <div className="feature">
              <div className="feature__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 5h18v4H3V5zm0 6h18v8H3v-8zm2 2v4h14v-4H5z" />
                </svg>
              </div>
              <h3>SMOOTH BROWSING</h3>
              <p>Lean, fast UX. No clutter. Convenient shopping.</p>
            </div>
            <div className="feature">
              <div className="feature__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 7h13v10H3zM16 10h3l2 3v4h-5zM5 19a2 2 0 110-4 2 2 0 010 4zm10 0a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </div>
              <h3>EASY DELIVERY</h3>
              <p>Doorstep delivery with clear tracking. Hassle-free.</p>
            </div>
            <div className="feature">
              <div className="feature__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 6h18v12H3zM5 10h8v2H5z" />
                </svg>
              </div>
              <h3>SWIFT PAYMENTS</h3>
              <p>Secure checkout with multiple payment methods.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta">
        <div className="container cta__grid">
          <div>
            <h3 className="cta__title">
              Browse and buy your <span className="accent">favorite guitars</span> with
              VibeStrings.
            </h3>
            <p className="cta__sub">
              Start exploring the collection and find your next tone machine.
            </p>
            <div className="cta__actions">
              {firstBrandId ? (
                <Link to={`/brand/${firstBrandId}`} className="btn btn--primary">
                  Explore Models
                </Link>
              ) : (
                <span className="btn btn--primary" aria-disabled>
                  Explore Models
                </span>
              )}
              <a href="#brands" className="btn btn--ghost">
                View Brands
              </a>
            </div>
          </div>

          <div className="cta__art">
            <div className="mock">
              <div className="mock__blob" />
              <img
                className="mock__img"
                src={HERO_IMG}
                alt="App preview"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {}
      <Footer />
    </>
  );
}
