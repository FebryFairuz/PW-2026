"use client"

import React, { useState, useMemo } from "react";

const INFLUENCER_DATA = [
  { id: "INF-001", nama: "Budi Gadget", kategori: "Tech & Gaming", usiaAudiens: 21, persenPerempuan: 15, engagementRate: 4.2, followers: 150 },
  { id: "INF-002", nama: "Clara Beauty", kategori: "Beauty & Fashion", usiaAudiens: 19, persenPerempuan: 88, engagementRate: 6.8, followers: 85 },
  { id: "INF-003", nama: "Dapur Mama", kategori: "Food & Cooking", usiaAudiens: 34, persenPerempuan: 75, engagementRate: 3.1, followers: 210 },
  { id: "INF-004", nama: "Reza Gamer", kategori: "Tech & Gaming", usiaAudiens: 18, persenPerempuan: 12, engagementRate: 7.5, followers: 500 },
  { id: "INF-005", nama: "Susi Fit", kategori: "Health & Sports", usiaAudiens: 28, persenPerempuan: 45, engagementRate: 5.0, followers: 95 },
  { id: "INF-006", nama: "Andi Travel", kategori: "Travel & Lifestyle", usiaAudiens: 26, persenPerempuan: 52, engagementRate: 3.8, followers: 120 },
  { id: "INF-007", nama: "Glow Up Amanda", kategori: "Beauty & Fashion", usiaAudiens: 22, persenPerempuan: 92, engagementRate: 8.1, followers: 45 },
  { id: "INF-008", nama: "Kuliner Hits", kategori: "Food & Cooking", usiaAudiens: 25, persenPerempuan: 60, engagementRate: 4.9, followers: 310 },
  { id: "INF-009", nama: "Tekno Review", kategori: "Tech & Gaming", usiaAudiens: 24, persenPerempuan: 18, engagementRate: 3.5, followers: 180 },
  { id: "INF-010", nama: "Hijab Style Kayla", kategori: "Beauty & Fashion", usiaAudiens: 20, persenPerempuan: 95, engagementRate: 7.2, followers: 110 },
  { id: "INF-011", nama: "Resep Maknyus", kategori: "Food & Cooking", usiaAudiens: 32, persenPerempuan: 80, engagementRate: 2.8, followers: 410 },
  { id: "INF-012", nama: "Ryan Overclock", kategori: "Tech & Gaming", usiaAudiens: 19, persenPerempuan: 10, engagementRate: 6.9, followers: 250 },
  { id: "INF-013", nama: "Gym Bro Doni", kategori: "Health & Sports", usiaAudiens: 25, persenPerempuan: 30, engagementRate: 5.5, followers: 75 },
  { id: "INF-014", nama: "Koper Traveler", kategori: "Travel & Lifestyle", usiaAudiens: 29, persenPerempuan: 55, engagementRate: 4.1, followers: 135 },
  { id: "INF-015", nama: "Salon Cantik", kategori: "Beauty & Fashion", usiaAudiens: 23, persenPerempuan: 89, engagementRate: 5.9, followers: 65 },
  { id: "INF-016", nama: "Makan Kuy", kategori: "Food & Cooking", usiaAudiens: 22, persenPerempuan: 58, engagementRate: 6.2, followers: 520 },
  { id: "INF-017", nama: "PC Builder Indo", kategori: "Tech & Gaming", usiaAudiens: 23, persenPerempuan: 8, engagementRate: 4.8, followers: 140 },
  { id: "INF-018", nama: "OOTD Rania", kategori: "Beauty & Fashion", usiaAudiens: 21, persenPerempuan: 91, engagementRate: 7.8, followers: 95 },
  { id: "INF-019", nama: "Baking Seru", kategori: "Food & Cooking", usiaAudiens: 35, persenPerempuan: 85, engagementRate: 3.4, followers: 125 },
  { id: "INF-020", nama: "Gadget Logika", kategori: "Tech & Gaming", usiaAudiens: 27, persenPerempuan: 22, engagementRate: 3.9, followers: 300 },
  { id: "INF-021", nama: "Yoga Balance", kategori: "Health & Sports", usiaAudiens: 30, persenPerempuan: 70, engagementRate: 4.6, followers: 55 },
  { id: "INF-022", nama: "Backpacker Roni", kategori: "Travel & Lifestyle", usiaAudiens: 24, persenPerempuan: 48, engagementRate: 5.2, followers: 88 },
  { id: "INF-023", nama: "Skincare Routine", kategori: "Beauty & Fashion", usiaAudiens: 18, persenPerempuan: 94, engagementRate: 8.5, followers: 150 },
  { id: "INF-024", nama: "Mukbang Asik", kategori: "Food & Cooking", usiaAudiens: 21, persenPerempuan: 62, engagementRate: 7.0, followers: 680 },
  { id: "INF-025", nama: "Coding ID", kategori: "Tech & Gaming", usiaAudiens: 22, persenPerempuan: 25, engagementRate: 5.1, followers: 90 },
  { id: "INF-026", nama: "Modest Wear Ita", kategori: "Beauty & Fashion", usiaAudiens: 25, persenPerempuan: 96, engagementRate: 6.1, followers: 130 },
  { id: "INF-027", nama: "Masak Simpel", kategori: "Food & Cooking", usiaAudiens: 31, persenPerempuan: 78, engagementRate: 3.9, followers: 240 },
  { id: "INF-028", nama: "Android Corner", kategori: "Tech & Gaming", usiaAudiens: 25, persenPerempuan: 14, engagementRate: 4.0, followers: 165 },
  { id: "INF-029", nama: "Runner Riko", kategori: "Health & Sports", usiaAudiens: 27, persenPerempuan: 40, engagementRate: 4.9, followers: 42 },
  { id: "INF-030", nama: "Jelajah Kuliner", kategori: "Food & Cooking", usiaAudiens: 26, persenPerempuan: 55, engagementRate: 5.3, followers: 290 },
];

const CATEGORIES = Array.from(new Set(INFLUENCER_DATA.map((d) => d.kategori)));

// Fitur numerik yang dipakai untuk clustering
const FEATURES = [
  "usiaAudiens",
  "persenPerempuan",
  "engagementRate",
  "followers",
];

// ============================================================
// 2. UTIL: NORMALISASI (MIN-MAX SCALING)
// ============================================================
function getFeatureRanges(data) {
  const ranges = {};
  FEATURES.forEach((f) => {
    const values = data.map((d) => d[f]);
    ranges[f] = { min: Math.min(...values), max: Math.max(...values) };
  });
  return ranges;
}

function normalizeVector(vector, ranges) {
  return vector.map((v, i) => {
    const f = FEATURES[i];
    const { min, max } = ranges[f];
    if (max === min) return 0;
    return (v - min) / (max - min);
  });
}

function toVector(item) {
  return FEATURES.map((f) => item[f]);
}

// ============================================================
// 3. ALGORITMA K-MEANS (sederhana, jalan di client)
// ============================================================
function euclideanDistance(a, b) {
  return Math.sqrt(a.reduce((sum, val, i) => sum + (val - b[i]) ** 2, 0));
}

function kMeans(points, k, maxIter = 100, seed = 42) {
  // seeded random sederhana agar hasil konsisten (deterministic)
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const n = points.length;
  const dim = points[0].length;

  // init centroid: pilih k titik unik secara acak (deterministik via seed)
  const indices = new Set();
  while (indices.size < k) {
    indices.add(Math.floor(rand() * n));
  }
  let centroids = Array.from(indices).map((i) => [...points[i]]);

  let assignments = new Array(n).fill(0);

  for (let iter = 0; iter < maxIter; iter++) {
    let changed = false;

    // assignment step
    for (let i = 0; i < n; i++) {
      let bestDist = Infinity;
      let bestCluster = 0;
      for (let c = 0; c < k; c++) {
        const dist = euclideanDistance(points[i], centroids[c]);
        if (dist < bestDist) {
          bestDist = dist;
          bestCluster = c;
        }
      }
      if (assignments[i] !== bestCluster) changed = true;
      assignments[i] = bestCluster;
    }

    // update step
    const newCentroids = Array.from({ length: k }, () =>
      new Array(dim).fill(0)
    );
    const counts = new Array(k).fill(0);

    for (let i = 0; i < n; i++) {
      const c = assignments[i];
      counts[c]++;
      for (let d = 0; d < dim; d++) {
        newCentroids[c][d] += points[i][d];
      }
    }

    for (let c = 0; c < k; c++) {
      if (counts[c] === 0) {
        newCentroids[c] = [...centroids[c]]; // pertahankan centroid lama jika cluster kosong
      } else {
        for (let d = 0; d < dim; d++) {
          newCentroids[c][d] /= counts[c];
        }
      }
    }

    centroids = newCentroids;
    if (!changed) break;
  }

  return { assignments, centroids };
}

// ============================================================
// 4. KOMPONEN UTAMA
// ============================================================
const K_CLUSTERS = 4;

const CATEGORY_ICONS = {
  "Tech & Gaming": "ti-device-gamepad-2",
  "Beauty & Fashion": "ti-sparkles",
  "Food & Cooking": "ti-soup",
  "Health & Sports": "ti-yoga",
  "Travel & Lifestyle": "ti-plane",
};

export default function InfluencerRecommender() {
  const [kategori, setKategori] = useState(CATEGORIES[0]);
  const [usiaTarget, setUsiaTarget] = useState(25);
  const [persenPerempuanTarget, setPersenPerempuanTarget] = useState(50);
  const [engagementTarget, setEngagementTarget] = useState(5);
  const [followersTarget, setFollowersTarget] = useState(150);
  const [submitted, setSubmitted] = useState(false);

  // Jalankan K-Means sekali saja terhadap seluruh dataset (memoized)
  const ranges = useMemo(() => getFeatureRanges(INFLUENCER_DATA), []);

  const normalizedPoints = useMemo(
    () => INFLUENCER_DATA.map((d) => normalizeVector(toVector(d), ranges)),
    [ranges]
  );

  const { assignments, centroids } = useMemo(
    () => kMeans(normalizedPoints, K_CLUSTERS),
    [normalizedPoints]
  );

  const clustered = useMemo(
    () =>
      INFLUENCER_DATA.map((d, i) => ({
        ...d,
        cluster: assignments[i],
      })),
    [assignments]
  );

  // Hitung rekomendasi berdasarkan input user
  const recommendations = useMemo(() => {
    if (!submitted) return [];

    const userVectorRaw = [
      usiaTarget,
      persenPerempuanTarget,
      engagementTarget,
      followersTarget,
    ];
    const userVectorNorm = normalizeVector(userVectorRaw, ranges);

    // cari cluster terdekat dengan preferensi user
    let bestCluster = 0;
    let bestDist = Infinity;
    centroids.forEach((c, idx) => {
      const dist = euclideanDistance(userVectorNorm, c);
      if (dist < bestDist) {
        bestDist = dist;
        bestCluster = idx;
      }
    });

    // ambil kandidat: utamakan kategori yg sama + cluster yg sama
    let candidates = clustered.filter(
      (item) => item.cluster === bestCluster && item.kategori === kategori
    );

    // fallback: jika tidak ada di kategori yg sama, ambil dari cluster terdekat saja
    if (candidates.length === 0) {
      candidates = clustered.filter((item) => item.cluster === bestCluster);
    }

    // fallback kedua: jika cluster tetap kosong (jarang terjadi), pakai kategori saja
    if (candidates.length === 0) {
      candidates = clustered.filter((item) => item.kategori === kategori);
    }

    // urutkan berdasarkan jarak ke vektor preferensi user (raw, biar mudah dipahami)
    const withDistance = candidates.map((item) => {
      const itemVectorNorm = normalizeVector(toVector(item), ranges);
      const dist = euclideanDistance(userVectorNorm, itemVectorNorm);
      return { ...item, distance: dist };
    });

    withDistance.sort((a, b) => a.distance - b.distance);
    return {
      list: withDistance.slice(0, 5),
      clusterId: bestCluster,
      clusterSize: clustered.filter((c) => c.cluster === bestCluster).length,
    };
  }, [submitted, kategori, usiaTarget, persenPerempuanTarget, engagementTarget, followersTarget, ranges, centroids, clustered]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const formatFollowers = (val) => {
    if (val >= 1000) return `${(val / 1000).toFixed(1)}M`;
    return `${val}K`;
  };

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        maxWidth: "720px",
        margin: "0 auto",
        padding: "24px",
        color: "#1a1a1a",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 500, margin: "0 0 4px" }}>
          Rekomendasi Influencer (K-Means)
        </h1>
        <p style={{ fontSize: "14px", color: "#6b6b6b", margin: 0, lineHeight: 1.6 }}>
          Isi kriteria kampanye kamu di bawah. Sistem akan mengelompokkan{" "}
          {INFLUENCER_DATA.length} influencer ke dalam {K_CLUSTERS} cluster
          menggunakan K-Means, lalu mencocokkan kebutuhanmu dengan cluster yang
          paling sesuai.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fafafa",
          border: "1px solid #e5e5e5",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {/* Kategori */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Kategori konten yang diinginkan</label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              style={inputStyle}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Usia audiens */}
          <div>
            <label style={labelStyle}>
              Target usia audiens: <strong>{usiaTarget} tahun</strong>
            </label>
            <input
              type="range"
              min={15}
              max={40}
              step={1}
              value={usiaTarget}
              onChange={(e) => setUsiaTarget(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          {/* Persen perempuan */}
          <div>
            <label style={labelStyle}>
              Target audiens perempuan: <strong>{persenPerempuanTarget}%</strong>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={persenPerempuanTarget}
              onChange={(e) => setPersenPerempuanTarget(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          {/* Engagement rate */}
          <div>
            <label style={labelStyle}>
              Engagement rate minimal: <strong>{engagementTarget.toFixed(1)}%</strong>
            </label>
            <input
              type="range"
              min={1}
              max={10}
              step={0.1}
              value={engagementTarget}
              onChange={(e) => setEngagementTarget(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          {/* Followers */}
          <div>
            <label style={labelStyle}>
              Target jumlah followers: <strong>{formatFollowers(followersTarget)}</strong>
            </label>
            <input
              type="range"
              min={40}
              max={700}
              step={10}
              value={followersTarget}
              onChange={(e) => setFollowersTarget(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            background: "#1a1a1a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Cari Rekomendasi
        </button>
      </form>

      {submitted && Array.isArray(recommendations.list) && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <h2 style={{ fontSize: "16px", fontWeight: 500, margin: 0 }}>
              Top {recommendations.list.length} rekomendasi untuk kamu
            </h2>
            <span style={{ fontSize: "12px", color: "#9b9b9b" }}>
              Cluster #{recommendations.clusterId} ·{" "}
              {recommendations.clusterSize} influencer
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {recommendations.list.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  border: "1px solid #e5e5e5",
                  borderRadius: "10px",
                  padding: "14px 16px",
                  background: idx === 0 ? "#f5f8ff" : "#fff",
                  borderColor: idx === 0 ? "#bcd4ff" : "#e5e5e5",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#eef0f3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "#444",
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: 500, fontSize: "14px" }}>{item.nama}</span>
                    {idx === 0 && (
                      <span
                        style={{
                          fontSize: "11px",
                          background: "#e6f1fb",
                          color: "#0c447c",
                          padding: "2px 8px",
                          borderRadius: "6px",
                        }}
                      >
                        Best match
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "12px", color: "#8a8a8a", marginTop: "2px" }}>
                    {item.kategori} · {item.id}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px", fontSize: "12px", flexShrink: 0 }}>
                  <Stat label="Usia" value={`${item.usiaAudiens}th`} />
                  <Stat label="Wanita" value={`${item.persenPerempuan}%`} />
                  <Stat label="ER" value={`${item.engagementRate}%`} />
                  <Stat label="Followers" value={formatFollowers(item.followers)} />
                </div>
              </div>
            ))}
          </div>

          {recommendations.list.some(
            (item) => item.kategori !== kategori
          ) && (
            <p style={{ fontSize: "12px", color: "#9b9b9b", marginTop: "12px" }}>
              * Tidak semua hasil sesuai kategori &quot;{kategori}&quot; — sistem
              menampilkan influencer dari cluster paling relevan secara
              keseluruhan.
            </p>
          )}
        </div>
      )}

      <details style={{ marginTop: "32px", fontSize: "12px", color: "#8a8a8a" }}>
        <summary style={{ cursor: "pointer", marginBottom: "8px" }}>
          Lihat hasil clustering seluruh data ({K_CLUSTERS} cluster)
        </summary>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "12px" }}>
          {Array.from({ length: K_CLUSTERS }, (_, c) => (
            <div
              key={c}
              style={{
                border: "1px solid #eee",
                borderRadius: "8px",
                padding: "10px 12px",
              }}
            >
              <div style={{ fontWeight: 500, marginBottom: "6px" }}>Cluster #{c}</div>
              {clustered
                .filter((item) => item.cluster === c)
                .map((item) => (
                  <div key={item.id} style={{ padding: "2px 0" }}>
                    {item.nama}{" "}
                    <span style={{ color: "#bbb" }}>({item.kategori})</span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ textAlign: "center", minWidth: "48px" }}>
      <div style={{ color: "#bbb", fontSize: "10px" }}>{label}</div>
      <div style={{ fontWeight: 500 }}>{value}</div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "13px",
  color: "#555",
  marginBottom: "8px",
};

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
  background: "#fff",
};