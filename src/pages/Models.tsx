import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { GET_MODELS, SEARCH_MODELS } from "../graphql/model";
import { useDebounce } from "../hooks/useDebounce";
import Footer from "../components/Footer";

// Types
interface Model {
  id: string;
  name?: string | null;
  type?: string | null;
  image?: string | null;
  price?: number | null;
}
interface GetModelsResponse {
  findBrandModels: Model[];
}
interface SearchModelsResponse {
  searchModels: Model[];
}

const PAGE_SIZE = 8;
const FALLBACK_IMG = "https://placehold.co/600x400?text=Guitar";

export default function Models() {
  const { id } = useParams<{ id: string }>();

  // Controls
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const debounced = useDebounce(query, 350);

  // Reset when brand changes
  useEffect(() => {
    setVisible(PAGE_SIZE);
    setTypeFilter("ALL");
    setQuery("");
  }, [id]);

  // Base list
  const { loading, error, data } = useQuery<GetModelsResponse>(GET_MODELS, {
    variables: { id: id ?? "", sortBy: { field: "name", order: "ASC" } },
    skip: !id,
  });

  // Server search 
  const [searchModels, searchState] = useLazyQuery<SearchModelsResponse>(SEARCH_MODELS);
  useEffect(() => {
    if (!id) return;
    if (debounced.length >= 2) {
      setVisible(PAGE_SIZE);
      searchModels({ variables: { brandId: id, name: debounced } });
    }
  }, [debounced, id, searchModels]);

  // Choose dataset
  const models: Model[] =
    debounced.length >= 2 && searchState.data
      ? searchState.data.searchModels
      : data?.findBrandModels ?? [];

  // Type filter
  const filtered = useMemo(
    () => (typeFilter === "ALL" ? models : models.filter((m) => m.type === typeFilter)),
    [models, typeFilter]
  );

  const items = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  // Infinite scroll sentinel
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && canLoadMore) {
          setVisible((v) => v + PAGE_SIZE);
        }
      },
      { rootMargin: "200px 0px" }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [canLoadMore, filtered.length]);

  // Loading / error / guards
  if (!id)
    return (
      <div className="modelsWrap">
        <p className="centerNote">No brand id provided.</p>
      </div>
    );
  if (loading)
    return (
      <div className="modelsWrap">
        <p className="centerNote">Loading models…</p>
      </div>
    );
  if (error)
    return (
      <div className="modelsWrap">
        <p className="centerNote error">Error: {error.message}</p>
      </div>
    );

  return (
    <div className="modelsWrap">
      {/* tiny top nav */}
      <div className="container modelsTop">
        <Link to="/" className="modelsBack">
          ← Back to Home
        </Link>
        <div className="brandMark">
          <span className="dot" />
          VibeStrings
        </div>
      </div>

      {/* hero */}
      <header className="container modelsHero">
        <div className="modelsHero__card">
          <h1 className="modelsTitle">
            Play like a <span className="accent">Rock star</span>
          </h1>
          <p className="modelsSub">
            With a legacy dating back to the 1950s, Ibanez blends expert craftsmanship with
            cutting-edge innovation to deliver guitars that inspire creativity and elevate your
            performance.
          </p>
        </div>
        <div className="modelsBlob" aria-hidden />
      </header>

      {/* heading */}
      <section className="container modelsHead">
        <h2>
          Check out the <span className="accent">Selection</span>
        </h2>
      </section>

      {/* controls */}
      <section className="container controls">
        <div className="controlsRow">
          <div className="select">
            <span className="select__icon" aria-hidden>
              ▾
            </span>
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              aria-label="Filter by type"
            >
              <option value="ALL">Filter by type</option>
              <option value="ELECTRIC">Electric</option>
              <option value="ACOUSTIC">Acoustic</option>
              <option value="BASS">Bass</option>
            </select>
          </div>

          <div className="input">
            <span className="input__icon" aria-hidden>
              🔎
            </span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              placeholder="Search by name"
              aria-label="Search by name"
            />
          </div>
        </div>

        <div className="controlsMeta">
          {searchState.loading ? "Searching…" : `Showing ${items.length} of ${filtered.length}`}
        </div>
      </section>

      {/* grid */}
      <main className="container modelGrid">
        {items.map((m) => (
          <Link key={m.id} to={`/brand/${id}/model/${m.id}`} className="card">
            <div className="card__imgWrap">
              <img
                src={m.image ?? FALLBACK_IMG}
                onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                alt={m.name || "Guitar"}
                loading="lazy"
                className="card__img"
              />
            </div>
            <div className="card__body">
              <div className="card__name">{m.name}</div>
              <div className="card__meta">
                <span className="badge">{m.type || "—"}</span>
                {typeof m.price === "number" && <span className="price">${m.price}</span>}
              </div>
            </div>
          </Link>
        ))}
      </main>

      {/* optional manual fallback */}
      {canLoadMore && (
        <div className="container loadMoreRow">
          <button className="btn btn--primary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load more
          </button>
        </div>
      )}

      {/* infinite sentinel */}
      {canLoadMore && <div ref={sentinelRef} className="sentinel" aria-hidden />}

      {}
      <Footer />
    </div>
  );
}
