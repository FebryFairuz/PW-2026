import React from "react";
import { Heading, Text } from "@/components/_ui/atoms/texts";
import TempLayout from "@/components/_ui/temp";

export default function Latihan1() {
  const dataMahasiswa = {
    nama: "Kyanka Wisnu Wardhana",
    jurusan: "Teknologi Informasi",
    npm:242310005,
    umur: 17,
  };

  return (
    <TempLayout>
      <Heading level={1} className="text-center">
        Belajar RWD & Single Object 
      </Heading>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-3">
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
                  <Text className="fw-bold mb-0">Nama: {dataMahasiswa?.nama}</Text>
                  <Text>NPM: {dataMahasiswa?.npm}</Text>
                  <Text>Jurusan: {dataMahasiswa?.jurusan}</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TempLayout>
  );
}
