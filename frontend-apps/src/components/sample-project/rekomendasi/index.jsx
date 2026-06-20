"use client"
import React, { useState, useMemo } from 'react';

// Data graf anime
const GRAPH_DATA = {
  nodes: [
    { id: "A1", label: "Attack on Titan", type: "anime" },
    { id: "A2", label: "Fullmetal Alchemist", type: "anime" },
    { id: "A3", label: "Death Note", type: "anime" },
    { id: "A4", label: "My Hero Academia", type: "anime" },
    { id: "A5", label: "Demon Slayer", type: "anime" },
    { id: "A6", label: "One Punch Man", type: "anime" },
    { id: "A7", label: "Steins;Gate", type: "anime" },
    { id: "A8", label: "Code Geass", type: "anime" },
    { id: "A9", label: "Naruto", type: "anime" },
    { id: "A10", label: "Sword Art Online", type: "anime" },
    
    { id: "G1", label: "Action", type: "genre" },
    { id: "G2", label: "Drama", type: "genre" },
    { id: "G3", label: "Thriller", type: "genre" },
    { id: "G4", label: "Sci-Fi", type: "genre" },
    { id: "G5", label: "Fantasy", type: "genre" },
    { id: "G6", label: "Adventure", type: "genre" },
    
    { id: "S1", label: "WIT Studio", type: "studio" },
    { id: "S2", label: "Bones", type: "studio" },
    { id: "S3", label: "Madhouse", type: "studio" },
    { id: "S4", label: "ufotable", type: "studio" },
    { id: "S5", label: "Sunrise", type: "studio" },
    { id: "S6", label: "A-1 Pictures", type: "studio" },
  ],
  edges: [
    // Attack on Titan
    { source: "A1", target: "G1", weight: 1.0 },
    { source: "A1", target: "G2", weight: 0.8 },
    { source: "A1", target: "S1", weight: 1.0 },
    
    // Fullmetal Alchemist
    { source: "A2", target: "G1", weight: 0.9 },
    { source: "A2", target: "G2", weight: 1.0 },
    { source: "A2", target: "G5", weight: 0.8 },
    { source: "A2", target: "S2", weight: 1.0 },
    
    // Death Note
    { source: "A3", target: "G3", weight: 1.0 },
    { source: "A3", target: "G2", weight: 0.7 },
    { source: "A3", target: "S3", weight: 1.0 },
    
    // My Hero Academia
    { source: "A4", target: "G1", weight: 1.0 },
    { source: "A4", target: "G6", weight: 0.8 },
    { source: "A4", target: "S2", weight: 1.0 },
    
    // Demon Slayer
    { source: "A5", target: "G1", weight: 1.0 },
    { source: "A5", target: "G2", weight: 0.7 },
    { source: "A5", target: "G5", weight: 0.9 },
    { source: "A5", target: "S4", weight: 1.0 },
    
    // One Punch Man
    { source: "A6", target: "G1", weight: 1.0 },
    { source: "A6", target: "G3", weight: 0.6 },
    { source: "A6", target: "S3", weight: 1.0 },
    
    // Steins;Gate
    { source: "A7", target: "G4", weight: 1.0 },
    { source: "A7", target: "G3", weight: 0.8 },
    { source: "A7", target: "G2", weight: 0.9 },
    { source: "A7", target: "S1", weight: 1.0 },
    
    // Code Geass
    { source: "A8", target: "G4", weight: 0.9 },
    { source: "A8", target: "G2", weight: 1.0 },
    { source: "A8", target: "G1", weight: 0.8 },
    { source: "A8", target: "S5", weight: 1.0 },
    
    // Naruto
    { source: "A9", target: "G1", weight: 1.0 },
    { source: "A9", target: "G6", weight: 0.9 },
    { source: "A9", target: "G5", weight: 0.7 },
    { source: "A9", target: "S6", weight: 1.0 },
    
    // Sword Art Online
    { source: "A10", target: "G5", weight: 1.0 },
    { source: "A10", target: "G1", weight: 0.8 },
    { source: "A10", target: "G6", weight: 0.7 },
    { source: "A10", target: "S6", weight: 1.0 },
  ]
};

// Fungsi untuk membangun adjacency list
function buildAdjacencyList(graphData) {
  const adjList = {};
  
  graphData.nodes.forEach(node => {
    adjList[node.id] = [];
  });
  
  graphData.edges.forEach(edge => {
    adjList[edge.source].push({ node: edge.target, weight: edge.weight });
    adjList[edge.target].push({ node: edge.source, weight: edge.weight });
  });
  
  return adjList;
}

// Algoritma rekomendasi berbasis graf (collaborative filtering)
function getRecommendations(selectedAnimeId, graphData, topN = 5) {
  const adjList = buildAdjacencyList(graphData);
  const scores = {};
  const visited = new Set([selectedAnimeId]);
  
  // Dapatkan tetangga langsung (genre & studio)
  const neighbors = adjList[selectedAnimeId] || [];
  
  // Untuk setiap tetangga (genre/studio)
  neighbors.forEach(({ node: neighborId, weight: weight1 }) => {
    const secondLevelNeighbors = adjList[neighborId] || [];
    
    // Untuk setiap anime yang terhubung ke genre/studio yang sama
    secondLevelNeighbors.forEach(({ node: animeId, weight: weight2 }) => {
      if (animeId.startsWith('A') && !visited.has(animeId)) {
        // Hitung skor berdasarkan weight path
        const score = weight1 * weight2;
        scores[animeId] = (scores[animeId] || 0) + score;
      }
    });
  });
  
  // Urutkan berdasarkan skor
  const recommendations = Object.entries(scores)
    .map(([animeId, score]) => {
      const animeNode = graphData.nodes.find(n => n.id === animeId);
      return {
        id: animeId,
        label: animeNode.label,
        score: score,
        sharedFeatures: getSharedFeatures(selectedAnimeId, animeId, graphData)
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
  
  return recommendations;
}

// Fungsi untuk mendapatkan fitur yang sama
function getSharedFeatures(anime1Id, anime2Id, graphData) {
  const adjList = buildAdjacencyList(graphData);
  const neighbors1 = new Set(adjList[anime1Id].map(n => n.node));
  const neighbors2 = new Set(adjList[anime2Id].map(n => n.node));
  
  const shared = [];
  neighbors1.forEach(nodeId => {
    if (neighbors2.has(nodeId)) {
      const node = graphData.nodes.find(n => n.id === nodeId);
      if (node) {
        shared.push({ id: nodeId, label: node.label, type: node.type });
      }
    }
  });
  
  return shared;
}

// Komponen utama
export default function RekomendasiGraph() {
  const animeList = useMemo(() => 
    GRAPH_DATA.nodes.filter(n => n.type === "anime"),
    []
  );
  
  const [selectedAnime, setSelectedAnime] = useState(animeList[0].id);
  const [showGraph, setShowGraph] = useState(false);
  
  const recommendations = useMemo(() => 
    getRecommendations(selectedAnime, GRAPH_DATA, 5),
    [selectedAnime]
  );
  
  const selectedAnimeData = animeList.find(a => a.id === selectedAnime);
  const selectedAnimeFeatures = useMemo(() => {
    const adjList = buildAdjacencyList(GRAPH_DATA);
    const neighbors = adjList[selectedAnime] || [];
    return neighbors
      .map(({ node }) => GRAPH_DATA.nodes.find(n => n.id === node))
      .filter(n => n && n.type !== "anime");
  }, [selectedAnime]);

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      maxWidth: "900px",
      margin: "0 auto",
      padding: "24px",
      color: "#1a1a1a",
    }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 600, margin: "0 0 8px" }}>
          🎬 Sistem Rekomendasi Anime (Graph-Based)
        </h1>
        <p style={{ fontSize: "14px", color: "#6b6b6b", margin: 0, lineHeight: 1.6 }}>
          Pilih anime favorit kamu, sistem akan merekomendasikan anime lain berdasarkan 
          kesamaan genre dan studio menggunakan algoritma graph traversal.
        </p>
      </div>

      {/* Selection Box */}
      <div style={{
        background: "#f8f9fa",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "24px",
      }}>
        <label style={{
          display: "block",
          fontSize: "13px",
          fontWeight: 500,
          color: "#374151",
          marginBottom: "8px",
        }}>
          Pilih Anime Favorit
        </label>
        <select
          value={selectedAnime}
          onChange={(e) => setSelectedAnime(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            fontSize: "14px",
            fontSize: "14px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          {animeList.map(anime => (
            <option key={anime.id} value={anime.id}>
              {anime.label}
            </option>
          ))}
        </select>

        {/* Selected Anime Info */}
        <div style={{
          marginTop: "16px",
          padding: "12px",
          background: "#fff",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
        }}>
          <div style={{ fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>
            {selectedAnimeData?.label}
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {selectedAnimeFeatures.map(feature => (
              <span
                key={feature.id}
                style={{
                  fontSize: "12px",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: feature.type === "genre" ? "#dbeafe" : "#fce7f3",
                  color: feature.type === "genre" ? "#1e40af" : "#9f1239",
                }}
              >
                {feature.type === "genre" ? "🎭" : "🎬"} {feature.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>
            Rekomendasi untuk Kamu
          </h2>
          <button
            onClick={() => setShowGraph(!showGraph)}
            style={{
              padding: "6px 12px",
              fontSize: "12px",
              background: "#f3f4f6",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {showGraph ? "Sembunyikan" : "Lihat"} Graf
          </button>
        </div>

        {recommendations.length === 0 ? (
          <div style={{
            padding: "40px",
            textAlign: "center",
            color: "#9ca3af",
            background: "#f9fafb",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
          }}>
            Tidak ada rekomendasi tersedia
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {recommendations.map((rec, idx) => (
              <div
                key={rec.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  padding: "16px",
                  background: idx === 0 ? "#f0f9ff" : "#fff",
                  border: `1px solid ${idx === 0 ? "#bae6fd" : "#e5e7eb"}`,
                  borderRadius: "10px",
                  transition: "all 0.2s",
                }}
              >
                {/* Rank Badge */}
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: idx === 0 ? "#0ea5e9" : "#e5e7eb",
                  color: idx === 0 ? "#fff" : "#6b7280",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  fontSize: "14px",
                  flexShrink: 0,
                }}>
                  {idx + 1}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{ fontSize: "15px", fontWeight: 600 }}>
                      {rec.label}
                    </span>
                    {idx === 0 && (
                      <span style={{
                        fontSize: "11px",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        background: "#dbeafe",
                        color: "#1e40af",
                        fontWeight: 500,
                      }}>
                        Top Pick
                      </span>
                    )}
                  </div>

                  {/* Shared Features */}
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{ fontSize: "12px", color: "#6b7280", marginRight: "8px" }}>
                      Kesamaan:
                    </span>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "4px" }}>
                      {rec.sharedFeatures.map(feature => (
                        <span
                          key={feature.id}
                          style={{
                            fontSize: "11px",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            background: feature.type === "genre" ? "#dbeafe" : "#fce7f3",
                            color: feature.type === "genre" ? "#1e40af" : "#9f1239",
                          }}
                        >
                          {feature.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Score */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      flex: 1,
                      height: "6px",
                      background: "#e5e7eb",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}>
                      <div style={{
                        width: `${(rec.score / recommendations[0].score) * 100}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #0ea5e9, #06b6d4)",
                        borderRadius: "3px",
                      }} />
                    </div>
                    <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: 500, minWidth: "60px", textAlign: "right" }}>
                      {(rec.score * 100).toFixed(0)}% match
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Graph Visualization */}
      {showGraph && (
        <div style={{
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "24px",
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>
            Visualisasi Graf Koneksi
          </h3>
          <GraphVisualization 
            selectedAnime={selectedAnime}
            recommendations={recommendations}
            graphData={GRAPH_DATA}
          />
        </div>
      )}

      {/* Info Section */}
      <details style={{
        fontSize: "13px",
        color: "#6b7280",
        background: "#f9fafb",
        padding: "16px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
      }}>
        <summary style={{ cursor: "pointer", fontWeight: 500, marginBottom: "8px" }}>
          ℹ️ Cara Kerja Sistem Rekomendasi
        </summary>
        <div style={{ lineHeight: 1.6, marginTop: "12px" }}>
          <p style={{ margin: "0 0 8px" }}>
            Sistem ini menggunakan <strong>Graph-Based Collaborative Filtering</strong>:
          </p>
          <ol style={{ margin: "8px 0", paddingLeft: "20px" }}>
            <li>Membangun graf dengan nodes (anime, genre, studio) dan edges (koneksi dengan bobot)</li>
            <li>Mencari tetangga langsung dari anime yang dipilih (genre & studio)</li>
            <li>Mencari anime lain yang terhubung ke tetangga yang sama</li>
            <li>Menghitung skor berdasarkan bobot path (weight1 × weight2)</li>
            <li>Mengurutkan berdasarkan skor tertinggi</li>
          </ol>
          <p style={{ margin: "8px 0 0" }}>
            <strong>Contoh:</strong> Jika kamu suka &quot;Attack on Titan&quot; (Action + WIT Studio), 
            sistem akan merekomendasikan anime lain dengan genre Action atau dari WIT Studio.
          </p>
        </div>
      </details>

      {/* Statistics */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "12px",
        marginTop: "24px",
      }}>
        <StatCard 
          label="Total Anime"
          value={GRAPH_DATA.nodes.filter(n => n.type === "anime").length}
          icon="🎬"
        />
        <StatCard 
          label="Total Genre"
          value={GRAPH_DATA.nodes.filter(n => n.type === "genre").length}
          icon="🎭"
        />
        <StatCard 
          label="Total Studio"
          value={GRAPH_DATA.nodes.filter(n => n.type === "studio").length}
          icon="🏢"
        />
      </div>
    </div>
  );
}

// Komponen StatCard
function StatCard({ label, value, icon }) {
  return (
    <div style={{
      padding: "16px",
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      textAlign: "center",
    }}>
      <div style={{ fontSize: "24px", marginBottom: "4px" }}>{icon}</div>
      <div style={{ fontSize: "20px", fontWeight: 600, color: "#1a1a1a" }}>{value}</div>
      <div style={{ fontSize: "12px", color: "#6b7280" }}>{label}</div>
    </div>
  );
}

// Komponen Graph Visualization (Simple)
function GraphVisualization({ selectedAnime, recommendations, graphData }) {
  const adjList = buildAdjacencyList(graphData);
  const selectedNode = graphData.nodes.find(n => n.id === selectedAnime);
  const neighbors = adjList[selectedAnime] || [];
  
  const connectedNodes = neighbors.map(({ node }) => 
    graphData.nodes.find(n => n.id === node)
  ).filter(Boolean);

  const recommendedIds = new Set(recommendations.map(r => r.id));

  return (
    <div style={{
      background: "#fff",
      borderRadius: "8px",
      padding: "20px",
      border: "1px solid #e5e7eb",
    }}>
        {/* Center Node (Selected Anime) */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "24px",
      }}>
        <div style={{
          padding: "12px 20px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          borderRadius: "12px",
          fontWeight: 600,
          fontSize: "14px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}>
          {selectedNode?.label}
        </div>
        <div style={{
          fontSize: "11px",
          color: "#9ca3af",
          marginTop: "4px",
        }}>
          Anime yang dipilih
        </div>
      </div>

      {/* Connected Features */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#374151",
          marginBottom: "12px",
          textAlign: "center",
        }}>
          Terhubung dengan:
        </div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}>
          {connectedNodes.map(node => (
            <div
              key={node.id}
              style={{
                padding: "8px 14px",
                background: node.type === "genre" ? "#dbeafe" : "#fce7f3",
                color: node.type === "genre" ? "#1e40af" : "#9f1239",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 500,
                border: `2px solid ${node.type === "genre" ? "#93c5fd" : "#fbcfe8"}`,
              }}
            >
              {node.type === "genre" ? "🎭" : "🎬"} {node.label}
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Anime */}
      <div>
        <div style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#374151",
          marginBottom: "12px",
          textAlign: "center",
        }}>
          Anime yang direkomendasikan:
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "10px",
        }}>
          {recommendations.map((rec, idx) => (
            <div
              key={rec.id}
              style={{
                padding: "10px 12px",
                background: idx === 0 ? "#f0f9ff" : "#f9fafb",
                border: `2px solid ${idx === 0 ? "#0ea5e9" : "#e5e7eb"}`,
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 500,
                color: "#1a1a1a",
                position: "relative",
              }}
            >
              <div style={{
                position: "absolute",
                top: "-8px",
                left: "8px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: idx === 0 ? "#0ea5e9" : "#9ca3af",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 600,
              }}>
                {idx + 1}
              </div>
              <div style={{ marginTop: "4px" }}>{rec.label}</div>
              <div style={{
                fontSize: "10px",
                color: "#6b7280",
                marginTop: "4px",
              }}>
                {(rec.score * 100).toFixed(0)}% match
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connection Lines Explanation */}
      <div style={{
        marginTop: "20px",
        padding: "12px",
        background: "#fef3c7",
        borderRadius: "8px",
        fontSize: "11px",
        color: "#92400e",
        textAlign: "center",
      }}>
        💡 Anime direkomendasikan berdasarkan kesamaan genre dan studio produksi
      </div>
    </div>
  );
}