/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/_ui/atoms/buttons";
import { openModal, ModalResponse } from "@/components/_ui/modals";
import { Alert } from "@/components/_ui/alerts";
import { FormField, InputCheckbox, InputImage } from "@/components/_ui/molecules/formFields";
import { FormTAreaField } from "../../_ui/molecules/formFields";

export default function Form({ book_id, onSubmit }) {
  const obj_book = {
    title: "",
    author: "",
    sinopsis: "",
    story: "",
    is_free: false,
    image: null,
  };
  const [formData, setFormData] = useState(obj_book);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setError("Please select a valid image file (JPEG, or PNG)");
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const newBook = {
      ...formData,
      id: Date.now(),
      rating: 0,
      views: 0,
      img: formData.images,
    };

    if (onSubmit) {
      onSubmit(newBook);
      openModal({open:false})
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="d-flex align-items-start flex-column">
        <span className="">Add New Book</span>
        <span className="text-secondary fs-6">
          Fill in the details for the new book.
        </span>
      </h3>

      <div className="row">
        <div className="col-lg-6">
          <FormField
            label="Book Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            required
          />

          <FormTAreaField
            label="Sinopsis"
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleInputChange}
            rows={2}
            required
          />

          <FormTAreaField
            label="Story"
            name="story"
            value={formData.story}
            onChange={handleInputChange}
            rows={3}
            required
          />
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-8">
              <FormField
                label="Author Name"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-4">
              <InputCheckbox
                label="Type Book"
                value="Is Free"
                name="is_free"
                is_switch={true}
                required={true}
                checked={formData.is_free}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <InputImage
            label="Cover Image"
            onChange={handleImageChange}
            required
            imagePreview={imagePreview}
          />
        </div>
      </div>

      {error && (
        <div className="mt-4">
          <Alert message={error} variant="danger" />
        </div>
      )}

      <div className="mt-4 text-center">
        <Button
          type="submit"
          className="me-2 btn-lg btn-light"
          onClick={() => openModal({ open: false })}
        >
          Cancel
        </Button>
        <Button type="submit" className="btn-lg btn-primary">
          Submit
        </Button>
      </div>
    </form>
  );
}
