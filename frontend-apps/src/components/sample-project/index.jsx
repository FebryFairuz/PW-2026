import React from "react";
import { Heading } from "@/components/_ui/atoms/texts";
import TempLayout from "@/components/_ui/temp";
import InfluencerRecommender from "./clustering";
import RekomendasiGraph from "./rekomendasi";

export default function SampleProject() {
  return (
    <div className="container">
      <TempLayout>
        <Heading level={3} className="text-start my-4">
          Clustering
        </Heading>
        <RekomendasiGraph />
      </TempLayout>
    </div>
  );
}
