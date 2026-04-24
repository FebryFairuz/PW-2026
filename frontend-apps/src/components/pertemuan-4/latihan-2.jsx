import React from "react";
import { Heading, Text } from "@/components/_ui/atoms/texts";
import TempLayout from "@/components/_ui/temp";

export default function Latihan2() {
  const dataMahasiswa = [
    {
      nama: "Fajar",
      npm: "242310006",
      jurusan: "Teknologi Informasi",
      umur: 21,
    },
    {
      nama: "Martin",
      npm: "242310007",
      jurusan: "Teknologi Informasi",
      umur: 27,
    },
    {
      nama: "Dea",
      npm: "242310008",
      jurusan: "Teknologi Informasi",
      umur: 25,
    },
  ];

  return (
    <TempLayout>
      <Heading level={1} className="text-center">
        Belajar RWD & Multi Object
      </Heading>
      <Heading level={1}>Mahasiswa ({dataMahasiswa.length})</Heading>
      <div className="row">
        {dataMahasiswa.map((mahasiswa, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-3">
            <div className="border border-success rounded-3 p-1">
              <div className="row">
                <div className="col-6 col-lg-12 ">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/032/176/197/non_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg"
                    className="w-100"
                    alt="Profile"
                  />
                </div>
                <div className="col-6 col-lg-12">
                  <div className="text-center">
                    <Text className="fw-bold mb-0">
                      Nama: {mahasiswa?.nama}
                    </Text>
                    <Text>NPM: {mahasiswa?.npm}</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </TempLayout>
  );
}
