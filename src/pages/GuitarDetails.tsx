import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_MODEL_DETAILS } from "../graphql/model";
import Footer from "../components/Footer";

type Tab = "specs" | "musicians";

interface Specs {
  bodyWood?: string | null;
  neckWood?: string | null;
  fingerboardWood?: string | null;
  pickups?: string | null;
  tuners?: string | null;
  scaleLength?: string | null;
  bridge?: string | null;
}
interface Musician {
  name?: string | null;
  musicianImage?: string | null;
  bands?: string[] | null;
}
interface ModelDetails {
  id: string;
  name?: string | null;
  type?: string | null;
  image?: string | null;
  description?: string | null;
  price?: number | null;
  specs: Specs;
  musicians?: Musician[] | null;
}
interface DetailsResponse {
  findUniqueModel: ModelDetails | null;
}

const FALLBACK_IMG = "https://placehold.co/1200x400?text=Guitar";
const FALLBACK_AVATAR = "https://placehold.co/76x76?text=%F0%9F%8E%B8";

export default function GuitarDetails() {
  const { id: brandId, modelId } = useParams<{ id: string; modelId: string }>();
  const missingParams = !brandId || !modelId;

  const { loading, error, data } = useQuery<DetailsResponse>(GET_MODEL_DETAILS, {
    variables: { brandId: brandId ?? "", modelId: modelId ?? "" },
    skip: missingParams,
  });

  const [tab, setTab] = useState<Tab>("specs");
  const [visibleMusicians, setVisibleMusicians] = useState(2);

  const model = data?.findUniqueModel ?? null;

  const musicians: Musician[] = useMemo(
    () => (model?.musicians ?? []) as Musician[],
    [model]
  );

  const specsEntries = useMemo(() => {
    const specs = model?.specs;
    return specs ? Object.entries(specs).filter(([, v]) => v) : [];
  }, [model]);

  // Pager dots for musicians (2 per page)
  const groups = Math.max(1, Math.ceil(musicians.length / 2));
  const currentGroup = Math.ceil(visibleMusicians / 2);

  if (missingParams)
    return (
      <div className="detailsWrap">
        <p className="centerNote">Missing route params.</p>
      </div>
    );
  if (loading)
    return (
      <div className="detailsWrap">
        <p className="centerNote">Loading…</p>
      </div>
    );
  if (error)
    return (
      <div className="detailsWrap">
        <p className="centerNote error">Error: {error.message}</p>
      </div>
    );
  if (!model)
    return (
      <div className="detailsWrap">
        <p className="centerNote">Model not found.</p>
      </div>
    );

  return (
    <>
      <div className="detailsWrap">
        {/* top line */}
        <div className="container detailsTop">
          <Link to={`/brand/${brandId}`} className="modelsBack">
            ← Back to Models
          </Link>
          <div className="brandMark">
            <span className="dot" />
            VibeStrings
          </div>
        </div>

        {/* hero: media + meta */}
        <header className="container detailsHero">
          <div className="detailsMedia">
            <img
              src={model.image ?? FALLBACK_IMG}
              onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
              alt={model.name || "Guitar"}
              loading="lazy"
            />
          </div>

          <div className="detailsMeta">
            <h1 className="detailsTitle">{model.name}</h1>
            <div className="detailsBadges">
              {model.type && <span className="badge">{model.type}</span>}
              {typeof model.price === "number" && (
                <span className="price">${model.price}</span>
              )}
            </div>
            {model.description && (
              <p className="detailsDesc">{model.description}</p>
            )}
          </div>
        </header>

        {/* tabs */}
        <div className="container tabs">
          <button
            className={`tab ${tab === "specs" ? "is-active" : ""}`}
            onClick={() => setTab("specs")}
          >
            Specs
          </button>
          <button
            className={`tab ${tab === "musicians" ? "is-active" : ""}`}
            onClick={() => setTab("musicians")}
          >
            Musicians
          </button>
        </div>

        {/* content */}
        <main className="container">
          {tab === "specs" ? (
            specsEntries.length ? (
              <div className="specGrid">
                {specsEntries.map(([k, v]) => (
                  <div key={k} className="specCard">
                    <div className="specKey">{labelize(k)}</div>
                    <div className="specVal">{String(v)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="centerNote">No specs available.</p>
            )
          ) : (
            <section>
              {!musicians.length ? (
                <p className="centerNote">No known musicians for this model.</p>
              ) : (
                <>
                  <div className="musGrid">
                    {musicians.slice(0, visibleMusicians).map((m, i) => (
                      <article key={`${m.name}-${i}`} className="musCard">
                        <img
                          src={m.musicianImage ?? FALLBACK_AVATAR}
                          onError={(e) => (e.currentTarget.src = FALLBACK_AVATAR)}
                          alt={m.name || "Musician"}
                          className="musAvatar"
                          loading="lazy"
                        />
                        <div className="musBody">
                          <div className="musName">{m.name}</div>
                          <div className="musBands">
                            {(m.bands ?? []).join(", ")}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="dots">
                    <button
                      className="dotBtn"
                      onClick={() =>
                        setVisibleMusicians((n) => Math.max(2, n - 2))
                      }
                      aria-label="Previous"
                      disabled={currentGroup <= 1}
                    >
                      ‹
                    </button>

                    {Array.from({ length: groups }).map((_, idx) => {
                      const g = idx + 1;
                      return (
                        <button
                          key={g}
                          className={`dot ${
                            currentGroup === g ? "is-active" : ""
                          }`}
                          onClick={() => setVisibleMusicians(g * 2)}
                          aria-label={`Group ${g}`}
                          aria-current={currentGroup === g ? "page" : undefined}
                        />
                      );
                    })}

                    <button
                      className="dotBtn"
                      onClick={() =>
                        setVisibleMusicians((n) =>
                          Math.min(n + 2, musicians.length)
                        )
                      }
                      aria-label="Next"
                      disabled={currentGroup >= groups}
                    >
                      ›
                    </button>
                  </div>

                  <div className="ctaRow">
                    <button
                      className="btn btn--primary"
                      onClick={() =>
                        setVisibleMusicians((n) =>
                          Math.min(n + 2, musicians.length)
                        )
                      }
                      disabled={visibleMusicians >= musicians.length}
                    >
                      {visibleMusicians < musicians.length
                        ? "Show 2 more"
                        : "No more"}
                    </button>
                  </div>
                </>
              )}
            </section>
          )}
        </main>
      </div>

      {}
      <Footer />
    </>
  );
}

function labelize(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}
